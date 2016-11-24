define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
	
    //slider
    var slider = new Slider('.jSlider', {
        lazyLoad: {
            loadingClass: 'img-error'
        },
        play: {
            auto: true,
            interval: 4000,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500,
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });

    //image-lazyload
    var lazy = new Lazyload('.jImg');

});

	