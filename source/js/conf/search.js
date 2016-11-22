define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    //var box = require('lib/ui/box/1.0.1/box');
    /*事件委托--绑定父元素select让它代理子元素被点击的触发事件*/
    $('.select').bind('click', function(e) {
		var target = e.target;
		/*把DOM对象转换JQ对象，并把使触发事件对象保存在变量，优化代码，减少查找次数*/
		var	$target=$(target);

		if($(this).find('.option').height()==0){
       		$(this).find('.option').animate({'height':'160px'},300);
        }else{
       		$(this).find('.option').animate({'height':'0'},300);
        }
		if ($target.is('.business')) {
			$(this).find('span').text($target.text());
		}else if($target.is('.product')) {
			$(this).find('span').text($target.text());
		}
	})
    /*事件委托--绑定父元素mod-split让它代理子元素被点击的触发事件*/
	$('.mod-split').bind('click', function(e) {
		var target = e.target;
		/*把DOM对象转换JQ对象，并把使触发事件对象保存在变量，优化代码，减少查找次数*/
		var	$target = $(target);
		var $split = $('.split i');
		var $alllist = $('#alllist');
		if ($target.is('.split')||$target.is('.split i')) {
			var $split = $('.split i');
			if($split.hasClass('isema-menu-down')) {
				$split.attr('class', 'isema isema-menu-up');
				$alllist.find('.allspt').animate({'height':'160px'}, 300);
				console.log($('#alllist').find('.allspt').height())
			}else if($split.hasClass('isema-menu-up')) {
				$split.attr('class', 'isema isema-menu-down');
				$alllist.find('.allspt').animate({'height':'0'}, 300);
			}
			//$('#alllist').find('.allspt').text($target.text());
		}else if($target.is('.area')||$target.is('.area i')) {
			var $area = $('.area i');
			if($area.hasClass('isema-menu-down')) {
				$area.attr('class', 'isema isema-menu-up');
				$alllist.find('.allarea').animate({'height':'160px'}, 300);
			}else if($area.hasClass('isema-menu-up')) {
				$area.attr('class', 'isema isema-menu-down');
				$('#alllist').find('.allarea').animate({'height':'0'}, 300);
			}

			//$(this).find('.allarea').text($target.text());
		}
	})

	$.ajax({
		"url":"../js/conf/data.js",
		"type":"GET",
		//"async":"true",
		"dataType":"json",
		"success":function(data) {
			var str = '<li class="item clearfix">'+
                '<div class="f-l img">'+
                   ' <img src="../images/news.gif" alt="psd" />'+
               ' </div>'+
               ' <div class="tool">'+
                    '<span class="soft">软件工具</span>'+
                    '<span class="soft">运营推广</span>'+
               ' </div>'+
                '<div class="cnt f-l">'+
                    '<div class="title">'+
                       ' <h3>超级ERP</h3>'+
                   ' </div>'+
                   ' <div class="details">'+
                    '    风刀霜剑看风景的失联客机富利卡就分开了送积分卡数据库富家大室看经费看电视就分开的健身房几点睡可减肥的哭声风刀霜剑看风景的失联客机富利卡就分开了送积分卡数据库富家大室看经费看电视就分开的健身房几点睡可减肥的哭声风刀霜剑看风景的失联'+
                   ' </div>'+
               ' </div>'+
           ' </li>';
           	$('.creatul').append(str);
		},
		"error":function(err) {
			alert(err)
		}

	})
});