//导入配置
var config = require('./gulp/config');

//监听
var watch = require('gulp-watch');

//scss模块
var gulp = require('gulp');
var compass = require('gulp-compass'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    cssBase64 = require('gulp-css-base64'),
    plumber = require('gulp-plumber');

//./dist目录
gulp.task('clear-dist', function() {
    del([config.distPath.dist]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

//生成样式并自动添加浏览器兼容前缀
gulp.task('style', function() {
    return gulp.src(config.srcPath.sass)
        .pipe(compass(config.compass))
        .pipe(autoprefixer(config.autoprefixer))
        .on('error', function(err) {
            //Would like to catch the error here 
        })
        .pipe(gulp.dest(config.distPath.sass));
});

// //生成雪碧图
// gulp.task('sprite', ['style'], function() {});

// //把小图片转化成base64
// gulp.task('base64', ['style'], function() {
//     return gulp.src(config.distPath.sass)
//         .pipe(cssBase64(config.cssBase64))
//         .pipe(gulp.dest(config.distPath.sass));
// });

//字体源文件直接拷贝过去
gulp.task('copy-fonts', function() {
    return gulp.src(config.srcPath.fonts)
        .on('error', function(err) {
            //Would like to catch the error here 
        })
        .pipe(gulp.dest(config.distPath.fonts));
});

//图片源文件直接拷贝过去
gulp.task('copy-images', function() {
    return gulp.src(config.srcPath.images)
        .on('error', function(err) {
            //Would like to catch the error here 
        })
        .pipe(gulp.dest(config.distPath.images));
});

gulp.task('watch', function() {
    gulp.watch(config.srcPath.sass, ['style']);
    gulp.watch(config.srcPath.fonts, ['copy-fonts']);
    gulp.watch(config.srcPath.images, ['copy-images']);
});

//开发环境
// gulp.task('default', ['watch', 'style', 'copy-fonts', 'copy-images']);
gulp.task('default', ['watch', 'style', 'copy-fonts', 'copy-images']);


//生成环境
// gulp.task('p', gulp.series('del', gulp.parallel('style', 'copy-fonts', 'copy-images')));


// gulp.task('prod', gulp.series('clean', 'compass', gulp.parallel('image', 'style', 'html'), 'ftp'));
