/**
 * 表单验证
 * @Author   jiangchaoyi
 * @DateTime 2016-12-01T23:06:03+0800
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var IO = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');

    var jTab = $('#jTab');
    var tab = new Tab(jTab);

    tab.on('change', function(el) {
        console.log(el);
    });

    tab.setCurrent();
});
