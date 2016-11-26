define(function(require, exports, module) {
	    'use strict';
    var $ = require('jquery');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');

    //image-lazyload 
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });


    $('.jCompany').click(function(){
		$('.jCompany').css({
			'border-bottom':'3px solid #0044CC'
		}).find($('.jService').css({
				'border-bottom':'none'
			}));
			$('.jTab1').css('display','block').find($('.jTab2').css('display','none'));
		})
	
    $('.jService').click(function(){
    	$('.jCompany').css({
    		'border-bottom':'none'
    	}).find($('.jService').css({
    		'border-bottom':'3px solid #0044CC'
    		}));
			$('.jTab2').css('display','block').find($('.jTab1').css('display','none'));
    		
    })


    
    
});

