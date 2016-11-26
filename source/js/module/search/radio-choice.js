define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var EventEmitter = require('lib/core/1.0.0/event/emitter');
    var IScroll = require('lib/plugins/iscroll/1.0.0/iscroll');
    var build = require('lib/core/1.0.0/dom/build');


    /**
     * 搜索栏目
     * @params selector [dom selector]
     * @events change 单击事件
     */
    function RadioChoice(selector) {
        var _this = this;
        _this.el = $(selector);
        var builder = build.build(selector, false);
        _this.mask = builder.get('mask');
        _this.selectedTitle = builder.get('selectedTitle');
        _this.iscrollWrapper = builder.get('iscrollWrapper');
        _this.menuList = builder.get('menuList');
        _this.filterMenu = builder.get('filterMenu');
        _this.menuItems = _this.menuList.find('li');
        _this.setCurrent(_this.selectedTitle.attr('data-id'));
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        _this.iscroll = new IScroll(_this.iscrollWrapper[0], {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });
        _this._initEvent();
    }
    //继承自定义事件
    Util.inherits(RadioChoice, EventEmitter);

    RadioChoice.prototype._initEvent = function() {
        var _this = this;
        //弹窗菜单
        _this.el.on('tap', function() {
            _this.el.addClass('active');
            _this.filterMenu.show();
            _this.iscroll.refresh();
        });
        //设置当前选中项
        _this.menuList.on('tap', 'li', function(e) {
            e.stopPropagation();
            var $li = $(this);
            _this.filterMenu.hide();
            _this.el.removeClass('active');
            if ($li.hasClass('selected')) {
                return;
            }
            _this.setCurrent($li.attr('data-id'));
            _this.emit('change', _this.get());
        });
        //点击遮罩关闭
        _this.mask.on('tap', function(e) {
            e.stopPropagation();
            _this.filterMenu.hide();
        });
    }

    //设置当前选中项
    RadioChoice.prototype.setCurrent = function(id) {
        var _this = this,
            curItem, tItem;
        for (var i = 0, len = _this.menuItems.length; i < len; i++) {
            tItem = $(_this.menuItems[i]);
            if (id == tItem.attr('data-id')) {
                curItem = tItem;
                break;
            }
        }
        if (curItem) {
            _this.menuItems.removeClass('selected');
            curItem.addClass('selected');
            _this.selectedTitle.attr('data-id', curItem.attr('data-id'));
            _this.selectedTitle.html(curItem.find('span').html());
        }
    }

    //获取当前选中项的数据
    RadioChoice.prototype.get = function() {
        var _this = this;
        return {
            id: _this.selectedTitle.attr('data-id'),
            txt: _this.selectedTitle.html()
        };
    }

    module.exports = RadioChoice;

});
