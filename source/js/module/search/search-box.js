define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var EventEmitter = require('lib/core/1.0.0/event/emitter');
    var build = require('lib/core/1.0.0/dom/build');

    /**
     * 搜索栏目
     * @params selector [dom selector] 搜索盒子id
     * @events enter 搜索框回车事件、搜索按钮点击事件
     * @events changType 切换搜索类型事件
     */
    function SearchBox(selector) {
        var _this = this;
        _this.el = $(selector);
        var builder = build.build(selector, false);
        _this.selected = builder.get('selected');
        _this.documentBody = $('body');
        _this.selectTitle = builder.get('selectTitle');
        _this.selected = builder.get('selected');
        _this.selectList = builder.get('selectList');
        _this.selectOptions = _this.selectList.find('li');
        _this.inputWord = builder.get('inputWord');
        _this.btn = builder.get('btn');
        _this.setCurrentType(_this.selected.attr('data-id'));
        _this._initEvent();
    }
    //继承自定义事件
    Util.inherits(SearchBox, EventEmitter);

    SearchBox.prototype._initEvent = function() {
        var _this = this;
        _this.inputWord.on('focus', function() {
            _this.el.addClass('focus');
        });
        _this.inputWord.on('blur', function() {
            _this.el.removeClass('focus');
        });
        //回车事件
        _this.inputWord.on('keydown', function(e) {
            if (e.keyCode === 13) {
                _this.emit('enter', _this.get());
            }
        });
        //关闭下拉列表
        _this.documentBody.on('tap', function() {
            _this.selectList.hide();
        });
        //选择下拉列表
        _this.selectTitle.on('tap', function(e) {
            e.stopPropagation();
            _this.selectList.show();
        });
        //选择当前项
        _this.selectList.on('tap', 'li', function(e) {
            e.stopPropagation();
            _this.selectList.hide();
            var $li = $(this);
            //已经是当前选择项目，不激活change
            if ($li.hasClass('selected')) {
                return;
            }
            _this.setCurrentType($(this).attr('data-id'));
            _this.emit('changType', _this.get());
        });
        //搜索按钮事件
        _this.btn.on('tap', function() {
            _this.emit('enter', _this.get());
        });
    }

    /**
     * 设置当前选中项
     * @params id [number|string] 当前选中项的id
     */
    SearchBox.prototype.setCurrentType = function(id) {
        var _this = this,
            curItem, tItem;
        for (var i = 0, len = _this.selectOptions.length; i < len; i++) {
            tItem = $(_this.selectOptions[i]);
            if (id == tItem.attr('data-id')) {
                curItem = tItem;
                break;
            }
        }
        if (curItem) {
            _this.selectOptions.removeClass('selected');
            curItem.addClass('selected');
            _this.selected.attr('data-id', curItem.attr('data-id'));
            _this.selected.html(curItem.html());
        }
    }

    //获取搜索数据
    SearchBox.prototype.get = function() {
        var _this = this;
        return {
            word: _this.inputWord.val(),
            typeId: _this.selected.attr('id'),
            typeTxt: _this.selected.html()
        };
    }

    module.exports = SearchBox;

});
