/**
 * Common sso login box.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 */
define(function(require, exports, module) {
    'use strict';

    var Box = require('../ui/box');
    var Messenger = require('core/io/messenger');

    // login min url
    var LOGIN_URL = 'https://ssl.yunhou.com/login/login-min.php';

    var LOGIN_DOMAIN = 'yunhou.com';

    var initMessenger = function(domain, sucCallback, errCallback) {
        document.domain = domain;
        var messenger = new Messenger('parent', domain);
        messenger.listen(function(message) {
            if (message !== 'success') {
                Box.error(message);
                errCallback && errCallback();
            } else {
                sucCallback && sucCallback();
                messenger.destroy();
                if (_loginBox) {
                    _loginBox.remove();
                    _loginBox = null;
                }
            }
        });
        return messenger;
    };

    var _loginBox, _loginMessager;

    var createLoginBox = function(options, successHandler, errorHandler, closeHandler) {
        var domain;

        // Destroy preview box instance first
        if (_loginMessager) { _loginMessager.destroy(); }
        if (_loginBox) { _loginBox.remove(); }

        if (typeof options === 'function') {
            closeHandler = errorHandler;
            errorHandler = successHandler;
            successHandler = options;
            options = null;
        }

        // default settings
        var settings = {
            url: LOGIN_URL,
            title: '步步高商城欢迎您',
            skin: 'min-login-dialog',
            width: 356,
            height: 360,
            padding: 0,
            domain: LOGIN_DOMAIN
        };

        if (options) {
            $.extend(settings, options);
        }

        // dialog close handler
        settings.onremove = function() {
            closeHandler && closeHandler();
            _loginMessager.destroy();
            _loginMessager = null;
            _loginBox = null;
        };

        _loginMessager = initMessenger(settings.domain, successHandler, errorHandler);
        _loginBox = Box.create(settings).showModal();

        return _loginBox;
    };

    exports.login = createLoginBox;
});
