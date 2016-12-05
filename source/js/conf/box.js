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
    var box = require('lib/ui/box/1.0.1/crossbox');

    var nodeList = build.parse($('#jBtns'));
    var clickHandles = {
        submit: function() {
            box.loadUrl('/demo/dist/html/login.html', {
                title: '登陆页面',
                autoRelease: false,
                modal: false
            });
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
            ajaxApi.post({ 'foo': 'foo text' }, function(res) {
                alert(res.msg + ' (code: ' + res.code + ')');
            }, this);
        },
        loginBox: function() {
            // require('common/ui/loginbox').login({ title: '步步高商城用户登陆' }, function(e) {
            //     console.log('success', arguments);
            // }, function(e) {
            //     console.log('error', arguments);
            // }, function(e) {
            //     console.log('close', arguments);
            // });
        }
    };

    $.each(nodeList, function(k, el) {
        var handle = clickHandles[k];
        if (handle) {
            $(el).on('click', handle);
        }
    });
});
