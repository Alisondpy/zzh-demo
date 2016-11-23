define(function(require, exports, module) {
    'use strict';
    var box = require('lib/ui/box/1.0.1/box');
    $('#jBox').on('click', function() {
        box.alert('暴力哥来了');
    });
});
