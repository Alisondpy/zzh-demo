/**
 * 表单验证
 * @Author   jiangchaoyi
 * @DateTime 2016-12-01T23:06:03+0800
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    // require('lib/plugins/validation/1.15.1/jquery-validate');
    // require('lib/plugins/validation/1.15.1/localization/messages_zh');
    require('plugins/validator/1.0.0/validator');

    // $.validator.setDefaults({ submitHandler: function() { alert("submitted!"); } });
    // $("#commentForm").validate();


    var a = $('#jForm').validate({
        focusCleanup: false,
        errorElement: 'p',
        errorClass: 'ui-tiptext ui-tiptext-error',
        errorPlacement: function(error, elem) {
            error.appendTo(elem.parent());
        },
        // customize error message with icons
        customMessage: function(message, errorObj) {
            return '<i class="ui-tiptext-icon iyoyo iyoyo-close"></i>' + message;
        },
        // use highlight and unhighlight
        highlight: function(elem, errorClass, validClass) {
            if (elem.type !== 'radio') {
                $(elem).addClass('error').removeClass(validClass);
            }
        },
        unhighlight: function(elem, errorClass, validClass) {
            if (elem.type !== 'radio') {
                $(elem).addClass(validClass).removeClass('error');
            }
        }
    });

    console.log(a);

    $('#jSubmit').on('click', function() {
        $('#jForm').submit();
    });

    var a = $('#jForm2').validate({
        rules: {
            a: {
                required: true,
                isIdCardNo: true
            }
        },
        messages: {
            a: {
                required: 'Enter this!'
            }
        },
        focusCleanup: false,
        errorElement: 'p',
        errorClass: 'ui-tiptext ui-tiptext-error',
        errorPlacement: function(error, elem) {
            error.appendTo(elem.parent());
        },
        // customize error message with icons
        customMessage: function(message, errorObj) {
            return '<i class="ui-tiptext-icon iyoyo iyoyo-close"></i>' + message;
        },
        // use highlight and unhighlight
        highlight: function(elem, errorClass, validClass) {
            if (elem.type !== 'radio') {
                $(elem).addClass('error').removeClass(validClass);
            }
        },
        unhighlight: function(elem, errorClass, validClass) {
            if (elem.type !== 'radio') {
                $(elem).addClass(validClass).removeClass('error');
            }
        }
    });

    console.log(a);

    $('#jSubmit2').on('click', function() {
        $('#jForm2').submit();
    });

});
