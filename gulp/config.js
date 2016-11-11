var path = require('path');
module.exports = {
    dist : './dist',
    images: {
        src: './images/**/*',
        dest: './dist/images'
    },
    fonts: {
        src: './fonts/**/*',
        dest: './dist/fonts'
    },
    css: {
        src: './css/**/*.css',
        dest: './dist/css'
    },
    sass:{
        src : './sass/**/*.{sass,scss}',
        dest : './css'
    },
    //compass 配置
    compass: {
        project: path.join(__dirname, '../'),
        css: 'css',
        sass: 'sass',
        images: 'images',
        style: 'expanded' //expanded(default)|compressed
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
    }
};
