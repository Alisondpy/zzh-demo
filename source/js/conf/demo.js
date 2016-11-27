define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var FixNav = require('../module/fix-nav/fix-nav');

    var fixNav = new FixNav({
        items: [{
            href: '/',
            title: '首页',
            iconClass: 'isema isema-home'
        }, {
            href: '',
            title: '发布需求',
            iconClass: 'isema isema-publish'
        }, {
            href: '',
            title: '个人中心',
            iconClass: 'isema isema-admin'
        }]
    });

    //slider
    var slider = new Slider('#jSlider', {
        lazyLoad: {
            loadingClass: 'img-error'
        },
        play: {
            auto: true,
            interval: 4000,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });

    // box.create({
    //     content: 'text',
    //     className: 'ui-bubble',
    //     autofocus: false,
    //     autoRelease: true,
    //     close: false,
    //     xtype: 'warn',
    //     align: 'bl',
    //     duration: 0,
    //     button: [{
    //         text: '知道了',
    //         fn: function() { callback(true) }
    //     },{
    //         text: '知道了1',
    //         fn: function() { callback(true) }
    //     },{
    //         text: '知道了1',
    //         fn: function() { callback(true) }
    //     }],
    //     hideWithAni: 'fadeOut',
    //     showWithAni: 'fadeInUp'
    // }).show();

    var clickHandles = {

        loadUrl: function() {
            // async request with loading bar
            box.loadUrl('/m-service-market/source/api/demo/publish-require.json', {
                data: { t: +new Date },
                content: '加载中',
                success: function(res) {
                    console.log(res);
                    alert(JSON.stringify(res));
                }
            });
        },

        loading: function() {
            // async request with loading bar
            var _box = box.loading('加载中,3秒后关闭');
            setTimeout(function() { _box.hide(); }, 3000);
        },

        tips: function() {
            box.tips('ok! it\'s a tips', null, 5000);
        },

        alert: function() {
            box.alert('ok! it\'s a tips');
        },

        confirm: function() {
            box.confirm('Are you sure?',
                function() {
                    box.tips('ok');
                },
                function() {
                    alert('cancel');
                }, this
            );
        },

        bubble: function() {
            box.bubble('我是气泡，可以任意调整方向', { align: 't' }, this);
        },

        warn: function() {
            box.warn('Opps!');
        },

        sendPost: function() {
            io.jsonp('/m-service-market/source/api/demo/publish-require.json', { 'foo': 'foo text' }, function(res) {
                alert(res.msg + ' (code: ' + res.error + ')');
            }, this);
            // io.get('/m-service-market/source/api/demo/publish-require.json', { 'foo': 'foo text' }, function(res) {
            //     alert(res.msg + ' (code: ' + res.error + ')');
            // }, this);
        }
    };

    $('#jBox .btn').each(function() {
        var _this = $(this),
            type = _this.attr('data-type'),
            handle = clickHandles[type];
        if (handle) {
            _this.on('click', handle);
        }
    });


    //image-lazyload
    var lazy = new Lazyload($('#jImgList .jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    $('#jFixNav').find('.more').click(function() {
        if ($('#jFixNav').hasClass('ui-fix-nav-show')) {
            $('#jFixNav').removeClass('ui-fix-nav-show');
        } else {
            $('#jFixNav').addClass('ui-fix-nav-show');
        }
    });
});
