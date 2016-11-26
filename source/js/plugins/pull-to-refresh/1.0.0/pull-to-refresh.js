define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    //自定义事件
    var EventEmitter = require('lib/core/1.0.0/event/emitter');
    var Util = require('lib/core/1.0.0/utils/util');
    var IScroll = require('lib/plugins/iscroll/1.0.0/iscroll-probe');
    var build = require('lib/core/1.0.0/dom/build');

    /**
     * 下拉刷新、上拉加载更多
     * @param selector [dom selector] dom选择器
     * @param options [mix] 参数
     * @events pullScroll 滚动事件
     * @events pullDown  下拉事件
     * @events pullUp  上拉事件
     */
    function PullToRefresh(selector, options) {
        var _this = this;
        var defaults = {
            pullUp: {
                enable: true, //是否要支持上拉
                distance: 6, //上拉距离，只有上拉到指定的distance才加载，否则视为误操作
                todoHtml: '<i class="isema isema-arrow-up"></i>上拉加载更多',
                doingHtml: '<i class="isema isema-arrow-down"></i>松手开始加载',
                doneHtml: '<i class="isema isema-loading"></i>正在加载，请稍后...'
            },
            pullDown: {
                enable: true, //是否要支持下拉
                distance: 20, //下拉距离，只有上拉到指定的distance才加载，否则视为误操作
                todoHtml: '<i class="isema isema-arrow-down"></i>下拉刷新',
                doingHtml: '<i class="isema isema-arrow-up"></i>松手开始更新',
                doneHtml: '<i class="isema isema-loading"></i>正在刷新，请稍后...'
            },
            iscrollOptions: {
                probeType: 3, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
                scrollbars: true, //有滚动条  
                mouseWheel: true, //允许滑轮滚动  
                fadeScrollbars: true, //滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
                bounce: true, //边界反弹  
                interactiveScrollbars: true, //滚动条可以拖动  
                shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
                click: true, // 允许点击事件  
                momentum: true // 允许有惯性滑动 
            }
        };

        _this.el = $(selector);
        _this.options = $.extend(true, {}, defaults, options);

        var builder = build.build(selector, false);

        _this.pullUp = builder.get('pull-up');
        _this.pullDown = builder.get('pull-down');

        _this.iscroll = new IScroll(selector, _this.options.iscrollOptions);
        _this.scrolling = false;

        _this._canDo = false; //是否满足加载条件
        _this.pullType = null; //下拉方向
        _this._isLoading = false;

        _this._initEvent();

    }

    //继承自定义事件
    Util.inherits(PullToRefresh, EventEmitter);

    PullToRefresh.prototype._initEvent = function() {
        var _this = this;
        // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        _this.iscroll.on('scrollStart', function() {
            _this.pullType = null;
            _this._isDo = false;
            _this.scrolling = true;
            if (_this.options.pullDown.enable) {
                _this.setPullDownHtml(_this.options.pullDown.todoHtml);
            }
            if (_this.options.pullUp.enable) {
                _this.setPullUpHtml(_this.options.pullUp.todoHtml);
            }
        });
        _this.iscroll.on('scroll', function() {
            _this.emit('pullScroll', this);
            var y = this.y;
            //防止重复刷新iscroll
            if (_this.scrolling) {
                if (y > 5) {
                    if (_this.options.pullDown.enable) {
                        _this.scrolling = false;
                        _this.pullDown.show();
                        _this.iscroll.refresh();
                    }
                } else if (y < -5) {
                    if (_this.options.pullUp.enable) {
                        _this.scrolling = false;
                        _this.pullUp.show();
                        _this.iscroll.refresh();
                    }
                }
            }
            if (y > _this.options.pullDown.distance) {
                if (_this.options.pullDown.enable) {
                    _this.pullType = 'down';
                    _this._isDo = true;
                    _this.setPullDownHtml(_this.options.pullDown.doingHtml);
                }
            } else if (y < (this.maxScrollY - _this.options.pullUp.distance)) {
                if (_this.options.pullUp.enable) {
                    _this.pullType = 'up';
                    _this._isDo = true;
                    _this.setPullUpHtml(_this.options.pullUp.doingHtml);
                }
            }
        });
        _this.iscroll.on('scrollEnd', function() {
            _this.scrolling = false;
            if (_this._isDo) {
                if (_this.pullType == 'down') {
                    _this.setPullDownHtml();
                    if (!_this._isLoading) {
                        _this._isLoading = true;
                        _this.emit('pullDown', function() {
                            _this.pullDown.hide();
                            _this._isLoading = false;
                            _this.iscroll.refresh();
                        });
                    }
                } else if (_this.pullType == 'up') {
                    _this.setPullUpHtml();
                    if (!_this._isLoading) {
                        _this._isLoading = true;
                        _this.emit('pullUp', function() {
                            _this.pullUp.hide();
                            _this._isLoading = false;
                            _this.iscroll.refresh();
                        });
                    }
                }
            } else {
                _this._isLoading = false;
                _this.pullDown.hide();
                _this.pullUp.hide();
                _this.iscroll.refresh();
            }
        });
    }

    PullToRefresh.prototype.setPullDownHtml = function(html) {
        var _this = this;
        html = html || _this.options.pullDown.doneHtml;
        _this.pullDown.html(html);
    }

    PullToRefresh.prototype.setPullUpHtml = function(html) {
        var _this = this;
        html = html || _this.options.pullUp.doneHtml;
        _this.pullUp.html(html);
    }

    //动态设置是否支持上拉
    PullToRefresh.prototype.setPullUpEnable = function(value) {
        var _this = this;
        _this.options.pullUp.enable = value;
    }

    //动态设置是否支持下拉
    PullToRefresh.prototype.setPullDownEnable = function(value) {
        var _this = this;
        _this.options.pullDown.enable = value;
    }

    module.exports = PullToRefresh;
});
