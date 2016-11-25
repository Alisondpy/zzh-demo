define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var io = require('lib/core/1.0.0/io/request');
    var util = require('lib/core/1.0.0/utils/util');
    var localurl = util.parseParams(window.location.search);
    //页面初始化
    $(function(){

        if(location.search) {
            var sle=localurl.TypeName;
            $('.select').find('span').text($('.option').find('.'+sle).text());

        }

        io.get('/m-service-market/source/api/search/data.json', {} function(res) {
            fnCreatType(res);
            fnCreatList(res);
            fnCreatScope(res);
            //console.log(res)
        }, this);
    })

    /*----选择服务产品或服务商,点击显示或隐藏---*/


    $('.select').bind('click', function(e) {
        var target = e.target;
        var $target=$(target);
        if($(this).find('.option').height()==0){
            $(this).find('.option').animate({'height':'160px'},300);
        }else{
            $(this).find('.option').animate({'height':'0'},300);
        }
        if ($target.is('.vendor')) {
            $(this).find('span').text($target.text());
            $(this).find('span').prop('dataset').id= $target.prop('class');
            $(this).find('.option .vendor').css({'color':'#40d1ad'}).siblings().css({'color':'#000'});
            /*--刷新--*/
            //fnVendorList();
            console.log('第一个', searching());
        }else if($target.is('.product')) {
            $(this).find('.option .product').css({'color':'#40d1ad'}).siblings().css({'color':'#000'});
            $(this).find('span').prop('dataset').id= $target.prop('class');
            $(this).find('span').text($target.text());
            /*--刷新--*/
            console.log('第二个', searching());

        }
        //e.stopPropagation();
    })

    /*-----选择分类,地区，点击显示或隐藏-----*/

    $('.mod-split').bind('click', function(e) {
        var target = e.target;
        var $target = $(target);
        var $split = $('.split i');
        var $alllist = $('#alllist');
        if ($target.is('.split em, .split i')) {

            var $split = $('.split i');
            var $allsplit = $('.allspt li').height()*$('.allspt li').length-5+'px';

            if($split.hasClass('isema-menu-down')) {
                //如果分类关闭的话使展开，或展开项关闭
                $split.attr('class', 'isema isema-menu-up');
                $alllist.find('.allspt').animate({'height':$allsplit}, 300);
                $('.split em, .split i').css({'color':'#40d1ad'});
                $('.mod-layout').css({'display':'block'});

            }else if($split.hasClass('isema-menu-up')) {
                $split.attr('class', 'isema isema-menu-down');
                $('.split em, .split i').css({'color':'#666'});
                $('.mod-layout').css({'display':'none'});
                /*--刷新--*/
                console.log('第三个', searching());
            }

        }else if($target.is('.area em, .area i')) {
            //如果地区被点击
            var $area = $('.area i');
            if($area.hasClass('isema-menu-down')) {
                $area.attr('class', 'isema isema-menu-up');
                $alllist.find('.allarea').animate({'height':'250px'}, 300);
                $('.area em, .area i').css({'color':'#40d1ad'});
                $('.mod-layout').css({'display':'block'});
            }else if($area.hasClass('isema-menu-up')) {
                $area.attr('class', 'isema isema-menu-down');
                $('#alllist').find('.allarea').animate({'height':'0'}, 300);
                $('.area em, .area i').css({'color':'#666'});
                $('.mod-layout').css({'display':'none'}); 
                /*--刷新--*/
                console.log('第四个', searching());
            }
        }
        
        //e.stopPropagation();
    })
    
    /*--点击空白位置使弹出列表隐藏--*/
    $('body').on('click', function(e){
        if($('.select').find('.option').height()!==0) {
            $('.select').find('.option').animate({'height':'0'},300);
        }else if($('.mod-split .allspt').height()!==0) {
            $('.split i').attr('class', 'isema isema-menu-down');
            $('#alllist').find('.allspt').animate({'height':'0'}, 300);     
            $('.split em, .split i').css({'color':'#666'});
            $('.mod-layout').css({'display':'none'});
        }else if($('.mod-split .allarea').height()!==0) {
            $('.area i').attr('class', 'isema isema-menu-down');
            $('#alllist').find('.allarea').animate({'height':'0'}, 300);
            $('.area em, .area i').css({'color':'#666'});
            $('.mod-layout').css({'display':'none'});
        }
        e.stopPropagation();
    })

     /*输入框值改变*/
    $('#ipt').on('change', function(e){
        console.log(searching())
    })

    /*--地址传参关键字拼接--*/
    function searching(){
        var TypeName = $('.select span').prop('dataset').id;
        var Type = $('.allsplit .split em').prop('dataset').id;
        var ServiceScope = $('.allsplit .area em').prop('dataset').id;
        var KeyWords = $('#ipt').val();
        var url = '?TypeName='+ TypeName+'&' + 'ServiceScope='+ ServiceScope+'&' + 'Type='+ Type+'&' +'Page='+'1'+'&'+ 'KeyWords='+ KeyWords;
        window.location.href = 'http://localhost:3000/m-service-market/dist/html/search.html'+url;
        //return url ;
    }

    function fnCreatType(res){
        var data_type=res.data.serviceType;
        var CreatType = '';
        var tagcolor = '' ;
        for (var i = 0; i < data_type.length; i++) {
            if(localurl.Type===data_type[i].code){
                tagcolor = 'jcolor';
                $('.allspt li, .allspt li').removeClass('jcolor');
                //$('.split em').text($(this).find('em').text());
                $('.split em').text(data_type[i].name);
                console.log(localurl.Type, data_type[i].name)
            }else{
                tagcolor='';
            }
            CreatType += '<li class="'+tagcolor+'" data-id="'+data_type[i].code+'"><em>'+data_type[i].name+'</em><i class="isema isema-success'+tagcolor+'"></i></li>'
        }
        $('.allspt').append(CreatType);
        /*----分类选择----*/
        $('.allspt li').each(function(){
            $(this).on('click', function(){
                //console.log($(this).prop('dataset'))
                $(this).addClass('jcolor').siblings().removeClass('jcolor');
                $('.split em').text($(this).find('em').text());
                $('.split em').prop('dataset').id=$(this).prop('dataset').id;
                $(this).find('.isema-success').addClass('jcolor');
                $(this).siblings().find('.isema-success').removeClass('jcolor');                
                //console.log($('.split em').prop('dataset').id, searching());
            })

        })
    }
    
    function fnCreatScope(res){
        var data_scope=res.data.serviceScope;
        var CreatScope = '';
        var tagcolor = '' ;
        for (var i = 1; i < data_scope.length; i++) {
            if(localurl.ServiceScope===data_scope[i].code){
                tagcolor = 'active';
                $('.area em').text(data_scope[i].name);
                console.log(localurl.ServiceScope, data_scope[i].name)
            }
            CreatScope += '<div data-id="'+data_scope[i].code+'" class="'+tagcolor+'">'+data_scope[i].name+'</div>';
            
        }
        //console.log(localurl.ServiceScope)
        $('.area-list').append(CreatScope);
        /*----地区选择----*/
        $('.allarea div').each(function(){
            $(this).on('click', function(){
                $(this).parent().siblings().find('div').removeClass('active');
                $(this).addClass('active').siblings().removeClass('active');
                $('.area em').text($(this).text());
                $('.area em').prop('dataset').id= $(this).prop('dataset').id;
                //console.log($('.area em').prop('dataset').id, searching());
            })
        })

    }

    function fnCreatList(res){
        var $data = res.data.list;
        var str = '' ;
        for (var i=0; i < $data.length; i++) {
            var $codeName = $data[i].codeName.length;
            var $softdata = ''; 
            for (var j = 0; j < $codeName; j++) {
                $softdata += '<span class="soft" data-id="'+$data[i].code[j]+'">'+$data[i].codeName[j]+'</span>';
            }
            str += '<li class="item clearfix">'+
                        '<a href="'+$data[i].url+'" class="itema">'+
                        '<div class="f-l img">'+
                           ' <img src="'+$data[i].logUrl+'" alt="psd" />'+
                       ' </div>'+
                       ' <div class="tool">'+ $softdata +
                       ' </div>'+
                        '<div class="cnt f-l">'+
                            '<div class="title">'+
                               ' <h3>'+$data[i].name+'</h3>'+
                           ' </div>'+
                           ' <div class="details"><p>'+
                            $data[i].description+
                            '</p></div>'+
                       ' </div>'+
                   '</li></a>';
        }
        $('.creatul').append(str);
    }


});