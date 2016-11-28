define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    
    /*io.get('url', {}, function(){
    	
    })*/
    //var choiceStatus = {};
    /*--选择未完成原因--*/
    function ChoiceStatus(el){
        var _this = this;
        _this.el = $(el);
        _this.items = _this.el.find('status');
        _this.value = null;
        // _this.id = $(el).attr('data-id');
        _this._initEvent();
    }
    ChoiceStatus.prototype._initEvent = function() {
        var _this = this;
        _this.items.on('tap',function(){
            var $this = $(this);
            _this.items.removeClass('active');
            $this.addClass('active');
            _this.value = $this.attr('data-id');
            console.log($this)
        });
    }

    ChoiceStatus.prototype.get = function(){
        var _this = this;
        console.log(_this.value)
        return _this.value;
    }
    var choice = new ChoiceStatus('#jForm');
    choice.get()
    $('#jSubmit').on('tap',function(){

        var formData = form.serializeForm($('#jForm'));
        console.log(formData)

    });
});