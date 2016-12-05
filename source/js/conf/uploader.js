define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');

    var jChooseBg = $('#jChooseBg');

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
            }]
        });
        uploader.on('ok', function(urls) {
            console.log(urls);
            // for (var i = 0; i < urls.length; i++) {
            //     var bg = nailBox.createBg(urls[i]);
            //     nailBox.addBg(bg);
            // }
            this.hide();
        });
        uploader.show();
    });

});
