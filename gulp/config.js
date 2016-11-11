module.exports = {
    srcPath: {
        sass: './sass/**/*.{sass,scss}',
        js: './js/conf/**/*',
        images: './images/**/*',
        fonts: './fonts/**/*',
        tempCss: './css/**/*.{css}'
    },
    distPath: {
        dist: './dist/',
        sass: './dist/css',
        js: './dist/js',
        images: './dist/images',
        fonts: './dist/fonts'
    },
    //compass 配置
    compass: {
        // project: path.join(__dirname, 'assets'),
        css: './dist/css',
        sass: 'sass',
        images: 'images',
        style: 'expanded' //expanded(default)|compressed
    },
    //支持配置
    cssBase64: {
        baseDir: './dist/images',
        maxWeightResource: 20*1024,
        extensionsAllowed: ['.gif', '.jpg', '.png', '.jpeg']
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
