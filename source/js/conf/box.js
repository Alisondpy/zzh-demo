/**
 * 表单验证
 * @Author   jiangchaoyi
 * @DateTime 2016-12-01T23:06:03+0800
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var build = require('lib/core/1.0.0/dom/build');
    var IO = require('lib/core/1.0.0/io/request');

    //因为要跨页面了（非跨域），所以请用此box,父页面和子页面都要用此box, 支持lib/ui/box/1.0.1/box的所有功能
    var box = require('lib/ui/box/1.0.1/crossbox');

    var nodeList = build.parse($('#jBtns'));
    var clickHandles = {
        submit: function() {
            box.loadUrl('/demo/dist/html/login.html', {
                title: '登陆页面',
                autoRelease: false,
                modal: false
            });
        }
    };

    $.each(nodeList, function(k, el) {
        var handle = clickHandles[k];
        if (handle) {
            $(el).on('click', handle);
        }
    });
});
