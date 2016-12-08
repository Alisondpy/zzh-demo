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
    var Pager = require('./pager');

    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');

    var pager = new Pager(jPagination, {
        url: $PAGE_DATA['baseStaticUrl'] + '/source/api/pager.json',
        data:{
            class : 'djune'
        },
        alias: {
            currentPage: 'currentPage',
            pageSize: 'pageSize'
        },
        options: {
            currentPage: 2, // start with 1
            pageSize: 20
        }
    });

    var loading = null;

    pager.on('ajaxStart', function() {
        loading = Box.loading('正在加载...', {
            modal: false
        });
    });

    pager.on('ajaxSuccess', function(data, callback) {
        console.log(data, callback);
        jContainer.html(template(data.data.resultList));
        callback && callback(data.data.records);
        loading && loading.hide();
    });

    pager.on('ajaxError', function(data) {
        jContainer.html('网络错误，请重试！');
        loading && loading.hide();
    });

    pager.on('change', function(pageNum, e) {
        console.log('pageNum', pageNum, e);
        $('#jCurrentPage').html(pageNum)
    });

    pager.pagination.selectPage(2);

    function template(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<div>' + data[i] + '</div>';
        }
        if(str == ''){
            str = '<div>数据为空</div>'
        }
        return str;
    }
});
