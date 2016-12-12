/**
 * Common sso login box.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 */
define(function(require, exports, module) {
    'use strict';

    //因为要跨页面了（非跨域），所以请用此box,父页面和子页面都要用此box, 支持lib/ui/box/1.0.1/box的所有功能
    var Box = require('lib/ui/box/1.0.1/crossbox');

    // login min url
    var LOGIN_URL = 'https://ssl.yunhou.com/login/login-min.php';

    var LOGIN_DOMAIN = 'yunhou.com';

    exports.login = createLoginBox;
});
