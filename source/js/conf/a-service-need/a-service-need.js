define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    $('#jTap div').each(function(){
    	$(this).tap(function(){
    		$(this).find('span').addClass('active').parent('div').siblings().find('span').removeClass('active');
    	})
    })
    /*io.get('url', {}, function(){
    	
    })*/
});