define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');

    //slider
    var slider = new Slider('.jSlider', {
        lazyLoad: {
            loadingClass: 'img-error'
        },
        play: {
            auto: true,
            interval: 4000,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500,
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });

    var clickHandles = {

        loadUrl: function() {
            // async request with loading bar
            box.loadUrl('/m-service-market/source/api/demo/demo.json', {
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
            setTimeout(function(){_box.hide();}, 3000);
        },

        tips: function() {
            box.tips('ok! it\'s a tips', null, 5000);
        },

        confirm: function() {
            box.confirm('Are you sure?',
                function() {
                    box.tips('ok');
                },
                function() {
                    alert('cancel');
                }
            );
        },

        warn: function() {
            box.warn('Opps!');
        },

        sendPost: function() {
            io.get('/m-service-market/source/api/demo/demo.json', { 'foo': 'foo text' }, function(res) {
                alert(res.msg + ' (code: ' + res.error + ')');
            }, this);
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


    //image-lazyload
    var lazy = new Lazyload($('#jImgList .jImg'), {
        effect: 'fadeIn'
    });
    
	//nav-footer 的一部分，这个地方我错误---donkey
//	$('.isema-error').click(function(){
//		$('.subnav ul').animate({	
//			width:'70px',
//			overflow:'hidden'
//		},500);
////		$('.isema-error').siblings().css;
////		$('.isema-error').clone(true).appendTo($('.subnav'));
//		$('.isema-error').replaceWith($('.isema-home')); 
////		$('.isema-error').css('display','none');
//		$('.isema-home').css('display','block');
//	})
//	
//	$('.isema-home').click(function(){
//		$('.isema-m').replaceWith($('.isema-error'));
//		$('.isema-error').siblings().show();
//		$('.subnav ul').animate({
//			width:'440px'
//		},500);
//		
//	})

	$('.textposition').click(function(){
		window.location.href='demo.html';
	})
});

	