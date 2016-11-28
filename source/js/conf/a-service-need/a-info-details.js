define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    $('#jAccept-bid').tap(function () {
    	box.alert('接受成功');
    })
    /*io.get('url', {}, function(){
    	
    })*/
});