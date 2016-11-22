/**
 * Created by admin on 2016/11/21 0021.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    $(".mod-classify .list").on('click', function() {
        $(".mod-classify .title input").text($(this).text());
    });
});
