define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');

    var jChooseBg = $('#jChooseBg');
    var jImgList = $('#jImgList');

    jChooseBg.on('click', function() {
        var uploader = new Uploader({
            tabs: [{
                type: 'local',
                options: {
                    uploadLimit: 0,
                    swf: '/demo/uploadify.swf',
                    uploader: '/Upload/images/'
                }
            }, {
                type: 'network',
                options: {}
            }, {
                type: 'album',
                options: {}
            }],
            limit: 0, //上传限制，当是0的时候就代表无限制多选
            selected: [] //选种的图片
        });
        uploader.on('ok', function(urls) {
            console.log(urls);
            var str = '';
            for (var i = 0; i < urls.length; i++) {
                str += '<img src="' + urls[i] + '">';
            }
            jImgList.html(urls);
            this.hide();
        });
        uploader.show();
    });

});
