/**
 * 表单验证
 * @Author   jiangchaoyi
 * @DateTime 2016-12-01T23:06:03+0800
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    require('plugins/validator/1.0.0/validator');
    var box = require('lib/ui/box/1.0.1/crossbox');
    var io = require('lib/core/1.0.0/io/request');

    

    var validate1 = $('#jForm').validate({
        submitHandler: function(form) {
            io.get($PAGE_DATA['baseStaticUrl'] + '/source/api/login.json', function(data) {
                var top = box.get(window);
                console.log('top success');
                top && top.hide();
            }, function(data) {
                console.log('top faild');
            }, $('#jSubmit')[0]);
        },
        rules: {
            userName: {
                required: true
            },
            pwd: {
                required: true
            }
        },
        messages: {
            userName: {
                required: '账户名不能为空'
            },
            pwd: {
                required: '密码不能为空'
            }
        }
    });

    // $('#jSubmit').on('click', function() {
    //     if (validate1.) {

    //     }
    //     // $('#jForm').submit();
    // });

});
