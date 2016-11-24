define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var PullToRefresh = require('plugins/pull-to-refresh/1.0.0/pull-to-refresh');
    var io = require('lib/core/1.0.0/io/request');
    //自定义事件

    //image-lazyload
    var lazy = new Lazyload($('#jImgList .jImg'), {
        container: $('#jWrapper'),
        mouseWheel: true,
        effect: 'fadeIn'
    });


    var pullRefresh = new PullToRefresh('#jWrapper');
    pullRefresh.on('pullDownEnd', function(callback) {
        setTimeout(function() {
            callback && callback();
        }, 2000);
    });
    pullRefresh.on('pullScroll', function(iscroll) {
        lazy.update();
    });
    pullRefresh.on('pullUpEnd', function(callback) {
        setTimeout(function() {
            var str = '';
            for (var i = 0; i < 10; i++) {
                str += '<li>' + i + '</li>';
            }
            $('#jImgList').append('<ul><li>-------</li>' + str + '</ul>');
            callback && callback();
        }, 2000);
    });
});
