define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');
    var Util = require('lib/core/1.0.0/utils/util');
    //console.log(Util)

    
    $('#jTap .jStatus').each(function(){
    	$(this).tap(function(){
    		$(this).addClass('active').siblings().removeClass('active');
            $('.jCreatItem').html('');
            io.get('', function (res) {
                //地址模拟数据
            })
    	})
    })
    function creatItem(res) {
        var str='';
            str+='<li class="item">'
            str+=    '<a href="#">'
            str+=        '<div class="top">'
            str+=            '<span class="f-l"><i class="tool">软件工具</i></span>'
            str+=            '<span class="price f-r">20-30k</span>'
            str+=        '</div>'
            str+=        '<h3 class="title txt-overflow">super ERP</h3>'
            str+=        '<div class="describe">'
            str+=            '<p>尔普哦怕监考老师觉得阶级分解啊飒飒评阶级分解啊飒飒评价哦皮佛评价据阶级分解啊飒飒评价哦皮佛评价据价哦皮佛评价据了解打开</p>'
            str+=        '</div>'
            str+=        '<div class="bottom">'
            str+=            '<span class="bid f-l"><i class="bid-number">5</i>个投标</span>'
            str+=            '<span class="status f-r">审核中</span>'
            str+=        '</div>'
            str+=    '</a>'
            str+='</li>'
    }
});