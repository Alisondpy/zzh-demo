/**
 * 表单验证
 * @Author   jiangchaoyi
 * @DateTime 2016-12-01T23:06:03+0800
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Pagination = require('lib/ui/pagination/1.0.1/pagination');
    var IO = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');

    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');

    var pager = new Pagination(jPagination, {
        pageSize : 10,
        onPage: function(pageNum, e) {

            var loading = Box.loading('正在加载...');
            IO.get($PAGE_DATA['baseStaticUrl'] + '/source/api/pager.json', { curPage: pageNum }, function(data) {
                jContainer.html(template(data.data.resultList));
                pager.setTotalCount(data.data.records);
                loading.hide();
            }, function(data) {
                jContainer.html('网络错误，请重试！');
                loading.hide();
            });
        }
    });

    IO.get($PAGE_DATA['baseStaticUrl'] + '/source/api/pager.json', {}, function(data) {
        jContainer.html(template(data.data.resultList));
        pager.setTotalCount(data.data.records);
    }, function(data) {
        jContainer.html('网络错误，请重试！');
    });

    function template(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<div>' + data[i] + '</div>';
        }
        return str;
    }

});
