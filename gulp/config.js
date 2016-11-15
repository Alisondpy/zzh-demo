var path = require('path');
module.exports = {
    dist: './dist',
    images: {
        src: './source/images/**/*',
        dest: './dist/images'
    },
    fonts: {
        src: './source/fonts/**/*',
        dest: './dist/fonts'
    },
    html: {
        src: './source/html/**/*.{html,htm}',
        dest: './dist/html'
    },
    sass: {
        src: './source/sass/**/*.{sass,scss}',
        dest: './dist/css'
    },
    js: {
        src: './source/js/**/*.js',
        filter: ['source/js/**/*.js', 'source/js/app.js'],
        dest: './dist/js/'
    },
    //autoprefixer 配置，自动添加需要兼容浏览器前缀
    autoprefixer: {
        browsers: [
            'last 10 versions',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: false
    },
    requirejs: {
        app: {
            // pragmasOnSave: {
            //     excludeRequireCss: true
            // },
            // include: ['jquery'],
            findNestedDependencies: true,
            paths: {
                'jquery': 'lib/jquery/1.11.1/jquery',
                'css': 'lib/require/2.1/plugins/css/css',//https://github.com/guybedford/require-css/
                'text': 'lib/require/2.1/plugins/text/text',
                'bootstrap': 'lib/bootstrap/3.3.0/js/bootstrap.min'
            },
            shim: {
                'bootstrap': ['jquery']
            }
        },
        modules: {
            // pragmasOnSave: {
            //     excludeRequireCss: true
            // },
            extend: ['app'],
            inlineText: false,
            findNestedDependencies: true,
            paths: {
                'jquery': 'lib/jquery/1.11.1/jquery',
                'css': 'lib/require/2.1/plugins/css/css',//https://github.com/guybedford/require-css/
                'text': 'lib/require/2.1/plugins/text/text',
                'bootstrap': 'lib/bootstrap/3.3.0/js/bootstrap.min'
            },
            shim: {
                'bootstrap': ['jquery']
            }
        }
    }
};
