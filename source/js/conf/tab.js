define(function(require, exports, module) {
	    'use strict';
    var $ = require('jquery');

    $('.company').click(function(){
		$('.company').css({
			'border-bottom':'3px solid #0044CC'
		}).find($('.service').css({
				'border-bottom':'none'
			}));
			$('.mod-tab1').css('display','block').find($('.mod-tab2').css('display','none'));
		})
	
    $('.service').click(function(){
    	$('.company').css({
    		'border-bottom':'none'
    	}).find($('.service').css({
    		'border-bottom':'3px solid #0044CC'
    		}));
			$('.mod-tab2').css('display','block').find($('.mod-tab1').css('display','none'));
    		
    })
    
    
});

