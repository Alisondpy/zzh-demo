define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');

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

    

    //image-lazyload 
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
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

	