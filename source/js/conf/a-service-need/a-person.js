define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    //console.log('接受成功');
    if($('.jNum').text()>0) {
        $('.jNum').css({'display':'block'});
    }else{
        $('.jNum').css({'display':'none'});
    };
    $('.jNeed').on('tap', function () {
        window.location.href = '/m-service-market/dist/html/a-service-need.html?status=0';
    });
    $('.jGoing').on('tap', function () {
        window.location.href = '/m-service-market/dist/html/a-service-need.html?status=1';
    });
    $('.jOver').on('tap', function () {
        window.location.href = '/m-service-market/dist/html/a-service-need.html?status=2';
    });
    /*io.get('url', {}, function(){
    	
    })*/
});