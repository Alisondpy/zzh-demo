/**
 * 表单验证
 * @Author   jiangchaoyi
 * @DateTime 2016-12-01T23:06:03+0800
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Pagination = require('lib/ui/pagination/1.0.1/pagination');

    var pager = $('#jPagination');

    var random = function(min, max) {
        return ~~(Math.random() * (max - min + 1)) + min;
    };

    var pagination = new Pagination(pager, {
        pageSize: 10,
        totalCount: 100,
        displayInfo: true,

        // Implements a async paging api method.
        async: function(pageOpts) {
            console.log('async paging options => ', pageOpts);

            var deferred = $.Deferred();

            // simulating async paging
            setTimeout(function() {
                deferred.resolve({ totalCount: random(100, 500) });
            }, 100);

            return deferred.promise();
        }
    });

    $('.selectPage').click(function() { pagination.selectPage(random(10, 100)); });
    $('.setPageSize').click(function() { pagination.setPageSize(20); });
    $('.setTotalCount').click(function() { pagination.setTotalCount(random(500, 1000)); });

    $('.disable').click(function() { pagination.disable(); });
    $('.enable').click(function() { pagination.enable(); });
    $('.destroy').click(function() { pagination.destroy(); });

    $('.getPageData').click(function() {
        var data = [
            'totalCount: ' + pagination.get('totalCount'),
            'pageCount: ' + pagination.get('pageCount'),
            'currentPage: ' + pagination.get('currentPage')
        ];
        console.log(data.join(', '));
    });

});
