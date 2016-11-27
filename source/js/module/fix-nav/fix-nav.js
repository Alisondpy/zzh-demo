define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var build = require('lib/core/1.0.0/dom/build');

    /**
     * 浮动导航
     * @params options {mix} 菜单配置
     */
    function FixNav(options) {
        var _this = this;
        var defaults = {
            items: [{
                href: '/',
                title: '首页',
                iconClass: 'isema isema-home'
            }, {
                href: '',
                title: '发布需求',
                iconClass: 'isema isema-publish'
            }, {
                href: '',
                title: '个人中心',
                iconClass: 'isema isema-admin'
            }]
        }
        _this.options = $.extend({}, defaults, options, true);
        _this._init();
        _this._initEvent();
    }

    FixNav.prototype._init = function() {
        var _this = this,
            items = _this.options.items;
        var strFrame = '';
        strFrame += '<div class="ui-fix-nav">';
        strFrame += '     <div class="mask" node-type="mask"></div>';
        strFrame += '     <div class="cnt" node-type="cnt">';
        strFrame += '         <ul class="list clearfix" node-type="list">';
        for (var i = 0, len = items.length; i < len; i++) {
            strFrame += '<li class="item">';
            strFrame += '    <a href="' + items[i].href + '">';
            strFrame += '        <i class="' + items[i].iconClass + '"></i>';
            strFrame += '        <span>' + items[i].title + '</span>';
            strFrame += '    </a>';
            strFrame += '</li>';
        }
        strFrame += '         </ul>';
        strFrame += '     </div>';
        strFrame += '     <div class="more" node-type="more">';
        strFrame += '         <i class="isema isema-arrow-right"></i>';
        strFrame += '     </div>';
        strFrame += ' </div>';
        _this.el = $(strFrame);
        $(document.body).append(_this.el);
        var builder = build.build(_this.el[0], false);
        _this.mask = builder.get('mask');
        _this.cnt = builder.get('cnt');
        _this.list = builder.get('list');
        _this.more = builder.get('more');
        _this.itemsWidth = _this.list.find('.item').width() * items.length;
        _this.list.width(_this.itemsWidth);
    }

    FixNav.prototype._initEvent = function() {
        var _this = this;
        _this.more.on('click', function() {
            if (_this.el.hasClass('ui-fix-nav-show')) {
                _this.hide();
            } else {
                _this.show();
            }
        });
    }

    //收起
    FixNav.prototype.hide = function() {
        var _this = this;
        _this.cnt.width(0);
        _this.el.removeClass('ui-fix-nav-show');
    }

    //展开
    FixNav.prototype.show = function() {
        var _this = this;
        _this.cnt.width(_this.itemsWidth);
        _this.el.addClass('ui-fix-nav-show');
    }

    module.exports = FixNav;
});
