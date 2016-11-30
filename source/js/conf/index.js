/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    //slider
    var slider = new Slider('#jSlider', {
        lazyLoad: {
            loadingClass: 'img-error'
        },
        play: {
            auto: true,
            interval: 4000,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500
        },
        navigation: {
            arrows: true,
            toggleOnHover: false,
            effect: 'slide',
            nextArrow: '',
            prevArrow: ''
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });


    var clickHandles = {

        loadUrl: function() {
            // async request with loading bar
            box.loadUrl('/m-service-market/source/api/demo/publish-require.json', {
                data: { t: +new Date },
                content: '加载中',
                success: function(res) {
                    console.log(res);
                    alert(JSON.stringify(res));
                }
            });
        },

        loading: function() {
            // async request with loading bar
            var _box = box.loading('加载中,3秒后关闭');
            setTimeout(function() { _box.hide(); }, 3000);
        },

        tips: function() {
            box.tips('ok! it\'s a tips', null, 5000);
        },

        alert: function() {
            box.alert('ok! it\'s a tips');
        },

        confirm: function() {
            box.confirm('Are you sure?',
                function() {
                    box.tips('ok');
                },
                function() {
                    alert('cancel');
                }, this
            );
        },

        bubble: function() {
            box.bubble('我是气泡，可以任意调整方向', { align: 't' }, this);
        },

        warn: function() {
            box.warn('Opps!');
        },

        sendPost: function() {
            io.jsonp('/m-service-market/source/api/demo/publish-require.json', { 'foo': 'foo text' }, function(res) {
                alert(res.msg + ' (code: ' + res.error + ')');
            }, this);
            // io.get('/m-service-market/source/api/demo/publish-require.json', { 'foo': 'foo text' }, function(res) {
            //     alert(res.msg + ' (code: ' + res.error + ')');
            // }, this);
        }
    };

    $('#jBox .btn').each(function() {
        var _this = $(this),
            type = _this.attr('data-type'),
            handle = clickHandles[type];
        if (handle) {
            _this.on('click', handle);
        }
    });


    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    $('#jFixNav').find('.more').click(function() {
        if ($('#jFixNav').hasClass('ui-fix-nav-show')) {
            $('#jFixNav').removeClass('ui-fix-nav-show');
        } else {
            $('#jFixNav').addClass('ui-fix-nav-show');
        }
    });

    //师资团队滚动
    var teacherItemWidth = $(".jItem").outerWidth(true);
    var num = $(".jItem").length;
    $(".jItemsWidth").width(teacherItemWidth*num);

    function isAnimate(obj){//判断动画是否已完成
        return obj.is(":animated");
    };

    $(".jArrowLeft").click(function(){
        var left = $(".jItemsWidth").position().left;
        if(left < 0 && !isAnimate($(".jItemsWidth"))){
            $(".jItemsWidth").animate({"left":left+teacherItemWidth},500);
        }
    });
    $(".jArrowRight").click(function(){
        var left = $(".jItemsWidth").position().left;
        if(left > -teacherItemWidth*(num-3) && !isAnimate($(".jItemsWidth"))){
            $(".jItemsWidth").animate({"left":left-teacherItemWidth},500);
        }
    });
});
