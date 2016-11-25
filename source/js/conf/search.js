define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');

    /*选择服务产品或服务商,点击显示或隐藏*/


    $('.select').bind('click', function(e) {
            var target = e.target;
            /*把DOM对象转换JQ对象，并把使触发事件对象保存在变量，优化代码，减少查找次数*/
            var $target = $(target);

            if ($(this).find('.option').height() == 0) {
                $(this).find('.option').animate({ 'height': '160px' }, 300);
            } else {
                $(this).find('.option').animate({ 'height': '0' }, 300);
            }
            if ($target.is('.business')) {
                $(this).find('span').text($target.text());

                /*--刷新--*/
                console.log('第一个', searching());
            } else if ($target.is('.product')) {
                $(this).find('span').text($target.text());
                /*--刷新--*/
                console.log('第二个', searching());

            }
            //e.stopPropagation();
        })
        /*--点击空白位置使弹出列表隐藏--*/
    $('body').on('click', function(e) {
            if ($('.select').find('.option').height() !== 0) {
                $('.select').find('.option').animate({ 'height': '0' }, 300);
            } else if ($('.mod-split .allspt').height() !== 0) {
                $('.split i').attr('class', 'isema isema-menu-down');
                $('#alllist').find('.allspt').animate({ 'height': '0' }, 300);
            } else if ($('.mod-split .allarea').height() !== 0) {
                $('.area i').attr('class', 'isema isema-menu-down');
                $('#alllist').find('.allarea').animate({ 'height': '0' }, 300);
            }
            //e.stopPropagation();
        })
        /*--地址传参关键字拼接--*/
    function searching() {
        var serv = $('.select span').text();
        var alladdr = $('.allsplit .split em').text();
        var allsplt = $('.allsplit .area em').text();
        var iptval = $('#ipt').val();
        var url = '?serv=' + encodeURI(serv) + '&' + 'addr=' + encodeURI(alladdr) + '&' + 'splt=' + encodeURI(allsplt) + '&' + 'keywords=' + encodeURI(iptval);
        //var url = '?serv='+ serv+'&' + 'addr='+ alladdr+'&' + 'splt='+ allsplt+'&' + 'keywords='+ iptval;
        window.location.href = 'http://localhost:3000/m-service-market/dist/html/search.html' + url;
        return url;
    }

    /*选择分类,地区，点击显示或隐藏*/

    $('.mod-split').bind('click', function(e) {
        var target = e.target;
        /*把DOM对象转换JQ对象，并把使触发事件对象保存在变量，优化代码，减少查找次数*/
        var $target = $(target);
        var $split = $('.split i');
        var $alllist = $('#alllist');
        if ($target.is('.split em, .split i')) {


            var $split = $('.split i');
            if ($split.hasClass('isema-menu-down')) {
                $split.attr('class', 'isema isema-menu-up');
                $alllist.find('.allspt').animate({ 'height': '160px' }, 300);
                console.log($('#alllist').find('.allspt').height())
            } else if ($split.hasClass('isema-menu-up')) {
                //$split.text($target.text());
                $split.attr('class', 'isema isema-menu-down');
                $alllist.find('.allspt').animate({ 'height': '0' }, 300);
                /*--刷新--*/
                console.log('第三个', searching());
            }

        } else if ($target.is('.area em, .area i')) {


            var $area = $('.area i');
            if ($area.hasClass('isema-menu-down')) {
                $area.attr('class', 'isema isema-menu-up');
                $alllist.find('.allarea').animate({ 'height': '300px' }, 300);

            } else if ($area.hasClass('isema-menu-up')) {
                $area.attr('class', 'isema isema-menu-down');
                $('#alllist').find('.allarea').animate({ 'height': '0' }, 300);
                /*--刷新--*/
                console.log('第四个', searching());
            }
        }

        /*--分类和地区选择--*/
        if ($target[0].tagName == 'LI' && $target.parent()[0].className == 'allspt') {
            //alert($target[0].innerHTML);
            //console.log($target.parent()[0].className);
            $('.split em').text($target[0].innerHTML);
            console.log('第五个', searching());
        } else if ($target[0].tagName == 'LI' && $target.parent()[0].className == 'allarea') {
            //console.log($target.parent()[0].className);
            $('.area em').text($target[0].innerHTML);
            console.log('第六个', searching());
        }
        //console.log($target.parent());
        //e.stopPropagation();
    })


    //$(this).find('.allarea').text($target.text());

    /*创建列表*/
    // $.ajax({
            //     "url": "../js/conf/data.js",
            //     "type": "GET",
            //     //"async":"true",
            //     "dataType": "json",
            //     "success": function(res) {
            //         var res = eval(res);
            //         var $data = res.data;
            //         var str = '';
            //         for (var i = 0; i < $data.length; i++) {
            //             var $soft = $data[i].soft.length;
            //             var $softdata = '';

            //             for (var j = 0; j < $soft; j++) {
            //                 $softdata += '<span class="soft">' + $data[i].soft[j] + '</span>';
            //             }
            //             str += '<li class="item clearfix">' +
            //                 '<a href="demo.html" class="itema">' +
            //                 '<div class="f-l img">' +
            //                 ' <img src="' + $data[i].url + '" alt="psd" />' +
            //                 ' </div>' +
            //                 ' <div class="tool">' + $softdata +
            //                 ' </div>' +
            //                 '<div class="cnt f-l">' +
            //                 '<div class="title">' +
            //                 ' <h3>' + $data[i].title + '</h3>' +
            //                 ' </div>' +
            //                 ' <div class="details"><p>' +
            //                 $data[i].details +
            //                 '</p></div>' +
            //                 ' </div>' +
            //                 '</li></a>';
            //         }
            //         $('.creatul').append(str);

            //     },
            //     "error": function(err) {
            //         alert(err)
            //     }

            // })

});
