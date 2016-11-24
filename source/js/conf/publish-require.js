/**
 * Created by admin on 2016/11/21 0021.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');

    //发布需求数据渲染
    function classify(data){//渲染分类
        for(var i = 0; i < data.init.length; i++){
            var list = '<label for="class"+i+"" class="list f-l">'+data.init[i].name+'</label>'
                +'<input id="class"+i+"" type="checkbox" name="classify" value="'+i+'">';
            $('#jClassify').append(list);
        }
    };
    io.get('/m-service-market/source/api/publish-require/publish-require.json', function(data) {
        classify(data);
    });

    //修改需求数据渲染
    function modify(data){
        if(data.modify.title){//标题
            $('#jTitle').val(data.modify.title);
        }
    }
    io.get('/m-service-market/source/api/publish-require/publish-require.json', function(data) {
        modify(data);
    });

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
        "value0":"<input type='number' name='start' step='0.001' placeholder='0.00'><label class='unit'>元</label>"
                +"<span>至</span>"
                +"<input type='number' name='end' step='0.001' placeholder='0.01'><label class='unit'>元</label>",
        "value1":"<input type='number' step='0.001' placeholder='0.00'><label class='unit'>元</label>",
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
        var radio = $('.jRequired').children('input[type="radio"]:checked');
        var radioL = radio.length;
        var inputNum = $('.jRequired').children('.price').children('input[type="number"]');
        var startVal = $('.jRequired').children('.price').children('input[name="start"]').val();
        var endVal = $('.jRequired').children('.price').children('input[name="end"]').val();
        if(radioL === 0){
            message = '请选择报价方式';
        }else if(radio.val() === "0"){
            inputNum.each(function(){
                if($(this).val() === ''){
                    message = '请完善预算';
                }else if($(this).val() < 0){
                    message = '价格大于等于0且不能超过2位小数';
                }else if(endVal <= startVal){
                    message = '请输入正确的预算区间';
                }else {
                    try{
                        if($(this).val().split(".")[1].length > 2){
                            message = '价格大于等于0且不能超过2位小数';
                        }
                    }catch (e){

                    }
                }
            });
        }else if(radio.val() === "1"){
            inputNum.each(function(){
                if($(this).val() === ''){
                    message = '请完善一口价';
                }else if($(this).val() < 0){
                    message = '价格大于等于0且不能超过2位小数';
                }else {
                    try{
                        if($(this).val().split(".")[1].length > 2){
                            message = '价格大于等于0且不能超过2位小数';
                        }
                    }catch (e){

                    }
                }
            });
        }

        $('.jRequired').children('textarea').each(function(){
            if($(this).val() === ''){
                message = '请完善需求描述';
            }
        });

        var checkboxL = $('.jRequired').children('input[type="checkbox"]:checked').length;
        if(checkboxL === 0){
            message = '请选择分类';
        }

        $('.jRequired').children('input[type="text"]').each(function(){
            if($(this).val() === ''){
                message = '请完善标题、联系人和联系方式';
            }
        });

        return message;
    };

    $('.jRequired').find('input[type="checkbox"],input[type="radio"]').on('change',function(){
        if(validation() === ''){
            $('input[type="submit"]').addClass('submit');
        }else {
            $('input[type="submit"]').removeClass('submit');
        }
    });

    $('.jRequired').on('keyup','input[type="text"],input[type="number"]',function(){
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
        if(message != ''){
            isSubmit = false;
            box.warn(message);
        }
        return isSubmit;
    });
});
