define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var IO = require('lib/core/1.0.0/io/request');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var SearchBox = require('../module/search/search-box');
    var RadioChoice = require('../module/search/radio-choice');
    var Util = require('lib/core/1.0.0/utils/util');
    var PullToRefresh = require('plugins/pull-to-refresh/1.0.0/pull-to-refresh');
    var build = require('lib/core/1.0.0/dom/build');
    var Box = require('lib/ui/box/1.0.1/box');
    var currentPage = 1;

    //首屏图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        container: $('#jIscrollList'),
        mouseWheel: true,
        effect: 'fadeIn'
    });


    //搜索框
    var searchBox = new SearchBox('#jSearchBox');
    //搜索框改版搜索类型
    searchBox.on('changType', function(data) {
        searchUrl.jsonUrl.TypeName = data.typeId;
        searchUrl.go();
    });
    //搜索框回车或者按钮
    searchBox.on('enter', function(data) {
        searchUrl.jsonUrl.KeyWords = data.word;
        searchUrl.go();
    });

    //刷选条件 选择分类
    var chooseType = new RadioChoice('#jChooseType');
    chooseType.on('change', function(data) {
        searchUrl.jsonUrl.Type = data.id;
        searchUrl.go();
    });

    //刷选条件 选择地区
    var chooseRegion = new RadioChoice('#jChooseRegion');
    chooseRegion.on('change', function(data) {
        searchUrl.jsonUrl.ServiceScope = data.id;
        searchUrl.go();
    });

    /**
     * url跳转类型
     */
    function SearchUrl(options) {
        var _this = this;
        var defaults = {
            typeName: '', //服务商、服务产品
            serviceScope: '', //地区
            type: '', //刷选分类
            page: 1, //当前页
            keyWords: '' //关键词
        };
        _this.jsonUrl = $.extend({}, defaults, options);
    }

    //直接跳转
    SearchUrl.prototype.go = function() {
        var _this = this;
        window.location.href = window.location.pathname + '?' + _this.getUrlString();
    }

    //生成url字符串
    SearchUrl.prototype.getUrlString = function() {
        var _this = this,
            str = '',
            len = 0;
        for (var i in _this.jsonUrl) {
            if (len == 0) {
                str += i + '=' + encodeURIComponent(_this.jsonUrl[i]);
            } else {
                str += '&' + i + '=' + encodeURIComponent(_this.jsonUrl[i]);
            }
            len++;
        }
        return str;
    }

    //生成url字符串
    SearchUrl.prototype.getJsonUrl = function() {
        var _this = this
        return _this.jsonUrl;
    }

    var searchUrl = new SearchUrl({
        typeName: searchBox.get().typeId,
        serviceScope: chooseRegion.get().id, //地区
        type: chooseType.get().id, //刷选分类
        keyWords: searchBox.get().word //关键词
    });

    function PullUp(selector) {
        var _this = this;
        _this.el = $(selector);
        if (_this.el.length == 0) {
            return;
        }
        _this.type = _this.el.attr('data-id');
        var builder = build.build(selector, false);
        _this.scrollList = builder.get('scrollList');
        _this.iscroll = new PullToRefresh(_this.el[0], {
            pullDown: {
                enable: false
            }
        });
        _this._initEvent();
    }

    PullUp.prototype._initEvent = function() {
        var _this = this;
        _this.iscroll.on('pullScroll', function() {
            lazy.update();
        })
        _this.iscroll.on('pullUp', function(callback) {
            var params = searchUrl.getJsonUrl();
            params.page = currentPage + 1;
            IO.get($PAGE_DATA['getSearchList'], params, function(data) {
                if (data.error > 0) {
                    Box.warn('加载数据失败，再试下看看！');
                } else {
                    currentPage++;
                    if (data.data && data.data.list) {
                        var str = getListItem(data.data.list, _this.type);
                        if (str == '') {
                            Box.info('别拉了，没有更多数据了！');
                        } else {
                            _this.scrollList.append(str);
                        }
                    } else {
                        Box.info('别拉了，没有更多数据了！');
                    }
                }
                callback && callback();
            });
        });
    }

    var pullUp = new PullUp('#jIscrollList');

    function getListItem(list, type) {
        var str = '';
        for (var i = 0, len = list.length; i < len; i++) {
            if (type == 'provider') {
                str += _getProviderItem(list[i]);
            } else if (type == 'product') {
                str += _getProductItem(list[i]);
            }
        }
        return str;
    }

    function _getProviderItem(data) {
        var str = '';
        str += '<a class="ui-service-providers" href="' + data.url + '">';
        str += '    <div class="cnt">';
        str += '        <div class="img">';
        str += '            <img class="error-img" src="' + data.logUrl + '">';
        str += '        </div>';
        str += '        <div class="title">';
        str += '            <h3 class="name txt-overflow">' + data.name + '</h3>';
        str += '            <ul class="mod-tags clearfix">';
        for (var i = 0, len = data.serviceTypes.length; i < len; i++) {
            str += '<li class="ui-tag">' + data.serviceTypes[i]['codeName'] + '</li>';
        }
        str += '            </ul>';
        str += '        </div>';
        str += '    </div>';
        str += '    <div class="desc">' + data.description + '</div>';
        str += '</a>';
        return str;
    }

    function _getProductItem(data) {
        var str = '';
        str += '<a class="ui-product" href="' + data.url + '">';
        str += '    <div class="img">';
        str += '        <img class="error-img" src="' + data.logUrl + '">';
        str += '    </div>';
        str += '    <div class="cnt">';
        str += '        <div class="title clearfix">';
        str += '            <h3 class="name txt-overflow">' + data.name + '</h3>';
        str += '            <ul class="mod-tags clearfix">';
        for (var i = 0, len = data.categoryItems.length; i < len; i++) {
            str += '<li class="ui-tag">' + data.categoryItems[i]['name'] + '</li>';
        }
        str += '            </ul>';
        str += '        </div>';
        str += '    <div class="desc">' + data.description + '</div>';
        str += '    </div>';
        str += '</a>';
        return str;
    }

});
