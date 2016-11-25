/**
 * Created by admin on 2016/11/21 0021.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    /*交互效果*/
    //分类
    function getClassify(){
        var classify = '';
        $('#jClassify label').each(function(){
            if($(this).hasClass('checked')){
                var val = $(this).attr('data-value');
                classify = classify+val+',';
            }
        });
        return classify.substring(0,classify.length-1);
    };
    $('#jClassify').on('tap','label',function(e) {
        if($(e.target).hasClass('checked')){
            $(e.target).removeClass('checked');
            $('#jClassify input[name="classify"]').val(getClassify());
        }else {
            $(e.target).addClass('checked');
            $('#jClassify input[name="classify"]').val(getClassify());
        }
    });

    //报价
    var config = {
        "value0":"<input type='number' name='start' step='0.001' placeholder='0.00'><label class='unit'>元</label>"
                +"<span>至</span>"
                +"<input type='number' name='end' step='0.001' placeholder='0.01'><label class='unit'>元</label>",
        "value1":"<input type='number' name='price' step='0.001' placeholder='0.00'><label class='unit'>元</label>",
        "value2":"<b style='font-weight: normal;'>价格以面议为准</b>"
    };


    $('.jLabel').on('tap',function(){
        $(this).addClass('current').siblings().removeClass('current');
        var val = $(this).attr('data-value');
        $('#jQuote input[name="quote"]').val(val);
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
    $('#jHideDate').val(date);
    $('#jDate').on('change',function(){
        date = $(this).val().replace("-","年").replace("-","月")+"日";
        $('.date .day').text(date);
        $('#jHideDate').val(date);
    });

    //验证必填项
    function validation(){
        var message = '';
        var title = $('.jRequired input[name="title"]').val();
        var classify = $('.jRequired input[name="classify"]').val();
        var description = $('.jRequired textarea[name="description"]').val();
        var quote = $('.jRequired input[name="quote"]').val();
        var start = $('.jRequired input[name="start"]').val();
        var end = $('.jRequired input[name="end"]').val();
        var price = $('.jRequired input[name="price"]').val();
        var contact = $('.jRequired input[name="contact"]').val();
        var contactInfo = $('.jRequired input[name="contact-info"]').val();

        if(title === ''){
            message = '请完善标题';
        }else if(classify === ''){
            message = '请选择分类';
        }else if(description === ''){
            message = '请完善描述';
        }else if(quote === ''){
            message = '请选择报价方式';
        }else if(start === '' || end === '' || price === ''){
            message = '请完善预算或一口价';
        }else if(start < 0 || end < 0 || price < 0){
            message = '价格大于等于0且不能超过2位小数';
        }else if(end <= start){
            message = '请输入正确的预算区间';
        }else if(contact === ''){
            message = '请完善联系人';
        }else if(contactInfo === ''){
            message = '请完善联系方式';
        }else{
            try{
                if(start.split(".")[1].length > 2){
                    message = '价格大于等于0且不能超过2位小数';
                }
            }catch (e){}
            try{
                if(end.split(".")[1].length > 2){
                    message = '价格大于等于0且不能超过2位小数';
                }
            }catch (e){}
            try{
                if(price.split(".")[1].length > 2){
                    message = '价格大于等于0且不能超过2位小数';
                }
            }catch (e){}
        }
        return message;
    };

    $('.jRequired').find('.list').on('tap',function(){
        if(validation() === ''){
            $('input[type="button"]').addClass('submit');
        }else {
            $('input[type="button"]').removeClass('submit');
        }
    });

    $('.jRequired').on('keyup','input[type="number"],input[type="text"],#jDescription',function(){
        if(validation() == ''){
            $('input[type="button"]').addClass('submit');
        }else {
            $('input[type="button"]').removeClass('submit');
        }
    });

     /*数据渲染*/
    //发布需求数据渲染
    function pageInit(data){
        $('#jClassify').append('<input type="hidden" name="classify">');
        for(var i = 0; i < data.init.length; i++){
            var list = '<label class="list list'+i+' f-l" data-value="'+i+'">'+data.init[i].name+'</label>';
            $('#jClassify').append(list);
        }
    };
    //io.get('/m-service-market/source/api/publish-require/publish-require.json', function(data) {
    //    pageInit(data);
    //});

    //修改需求数据渲染
    function pageModify(data){
        if(data.modify.title){//标题
            $('#jTitle').val(data.modify.title);
        }
        if(data.modify.classify){//分类
            pageInit(data);
            $('.jRequired input[name="classify"]').val(data.modify.classify);
            var classify = data.modify.classify.split(',');
            for(var i=0; i < classify.length; i++){
                $('#jClassify').children('.list'+classify[i]+'').addClass('checked');
            }
        }
        if(data.modify.description){//需求描述
            $('#jDescription').val(data.modify.description);
        }
        if(data.modify.date){//需求截止时间
            $('.date .day').text(data.modify.date);
        }
        if(data.modify.quote){//报价
            if(data.modify.quote.type || data.modify.quote.type === 0){//报价方式
                $('#jQuote').children('.jLabel'+data.modify.quote.type+'').addClass('current');
                $('.jRequired input[name="quote"]').val(data.modify.quote.type);
                if(data.modify.quote.price){//价格
                    if(data.modify.quote.type === 0){
                        $('.jPrice').html("<input type='number' name='start' step='0.001' placeholder='0.00' value='"+data.modify.quote.price.start+"'><label class='unit'>元</label>"
                            +"<span>至</span>"
                            +"<input type='number' name='end' step='0.001' placeholder='0.01' value='"+data.modify.quote.price.end+"'><label class='unit'>元</label>");
                    }
                    if(data.modify.quote.type === 1){
                        $('.jPrice').html("<input type='number' name='price' step='0.001' placeholder='0.00' value='"+data.modify.quote.price.price+"'><label class='unit'>元</label>");
                    }
                }
                if(data.modify.quote.type === 2){
                    $('.jPrice').html("<b style='font-weight: normal;'>价格以面议为准</b>");
                }
            }
        }
        if(data.modify.name){//联系人
            $('#jConcat').val(data.modify.name);
        }
        if(data.modify.nameInfo){//联系方式
            $('#jConcatInfo').val(data.modify.nameInfo);
        }
    };
    io.get('/m-service-market/source/api/publish-require/publish-require.json', function(data) {
        pageModify(data);
        if(validation() == ''){
            $('input[type="button"]').addClass('submit');
        }else {
            $('input[type="button"]').removeClass('submit');
        };
    });

    //提交表单
    $('input[type="button"]').on('tap',function(){
        var isSubmit = true;
        var message = validation();
        if(message != ''){
            isSubmit = false;
            box.warn(message);
        }
        var formData = form.serializeForm($('#jForm'));
        console.log(formData);
        if(isSubmit){
            io.get('/m-service-market/source/api/publish-require/publish-require.json',{'data':formData},function(data) {
                console.log(data.info);
                if(data.info.success){
                    box.tips(data.info.success);
                    setTimeout(function(){
                        window.location.href='./publish-require-success.html';
                    },2000)
                }else {
                    if(data.info.error){
                        box.tips(data.info.error);
                    }
                }
            },this);
        }
    });
});
