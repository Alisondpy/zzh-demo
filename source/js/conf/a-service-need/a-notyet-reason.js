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
        // _this.id = $(el).attr('data-id');
        _this.touch();
    }
    ChoiceStatus.prototype.touch = function() {
        var _this = this;
        _this.el.each(function () {
            var that = $(this);
            that.on('tap', function () {
                console.log(that.attr('data-id'));
                that.children().addClass('active').parent().siblings().children().removeClass('active');
                $('input[name="idStatus"]').attr('data-id', that.attr('data-id'));
                if(that.attr('data-id')==4) {
                    console.log(5+'被点击了')
                    that.children().removeClass('active');
                }else{
                    $('textarea[name="txtStatus"]').val('');
                }
            })
        })
    }

    var choice = new ChoiceStatus('#jForm .status');

    $('#jSubmit').on('tap',function(){

        var formData = form.serializeForm($('#jForm'));
        console.log(formData)

    });
});