/**
 * Created by admin on 2016/11/21 0021.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');

    //分类
    $('#jClassify').on('tap','label',function(e) {
        if($(e.target).hasClass('checked')){
            $(e.target).removeClass('checked');
        }else {
            $(e.target).addClass('checked');
        }
    });

    //报价
    var config = {
        "value0":"<input type='text' placeholder='0元'>"
                +"<span>至</span>"
                +"<input type='text' placeholder='0元'>",
        "value1":"<input type='text' placeholder='0元'>",
        "value2":"<b style='font-weight: normal;'>价格以面议为准</b>"
    };

    $('.jLabel').each(function(){
        if($(this).next('input[type="radio"]').val() === '0'){
            $(this).addClass('current');
            $(this).next('input[type="radio"]').prop('checked',true);
        }
    });

    $('.jLabel').on('tap',function(){
        $(this).addClass('current').siblings().removeClass('current');
        var val = $(this).next('input[type="radio"]').val();
        switch (val)
        {
            case '0':
                $('.jPrice').html(config.value0);
                break;
            case '1':
                $('.jPrice').html(config.value1);
                break;
            case '2':
                $('.jPrice').html(config.value2);
                break;
        };
    });

    //需求截止时间
    var date = new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日";
    $('.date .day').text(date);
    $('#jDate').on('change',function(){
        date = $(this).val().replace("-","年").replace("-","月")+"日";
        $('.date .day').text(date);
    });

    //验证必填项
    function validation(){
        var message = '';
        $('.jRequired').children('input[type="text"]').each(function(){
            if($(this).val() === ''){
                message = '请输入标题、联系人和联系方式';
            }
        });

        var checkboxL = $('.jRequired').children('input[type="checkbox"]:checked').length;
        if(checkboxL === 0){
            message = '请选择分类';
        }

        var radio = $('.jRequired').children('input[type="radio"]:checked');
        var radioL = radio.length;
        if(radioL === 0){
            message = '请选择报价方式';
        }else if(radio.val() !== "2"){
            $('.jRequired').children('.price').children('input[type="text"]').each(function(){
                if($(this).val() === ''){
                    message = '请输入预算或一口价';
                }
            });
        }

        $('.jRequired').children('textarea').each(function(){
            if($(this).val() === ''){
                message = '请输入需求描述';
            }
        })

        return message;
    };

    $('.jRequired').find('input[type="checkbox"],input[type="radio"]').on('change',function(){
        if(validation() === ''){
            $('input[type="submit"]').addClass('submit');
        }else {
            $('input[type="submit"]').removeClass('submit');
        }
    });

    $('.jRequired').find('input[type="text"]').on('blur',function(){
        if(validation() == ''){
            $('input[type="submit"]').addClass('submit');
        }else {
            $('input[type="submit"]').removeClass('submit');
        }
    });

    validation();
    $('#jForm').on('submit',function(){
        var isSubmit = true;
        var message = validation();
        console.log(message);
        if(message != ''){
            isSubmit = false;
            box.warn(message);
        }
        return isSubmit;
    });
});
