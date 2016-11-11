//导入配置
var config = require('./gulp/config');

//监听
var watch = require('gulp-watch');

//scss模块
var gulp = require('gulp');
var compass = require('gulp-compass'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

//./dist目录
gulp.task('clear-dist', function() {
    return del([config.dist]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

//生成样式并自动添加浏览器兼容前缀（图片base64、图片sprite）
gulp.task('compass', function() {
    return gulp.src(config.sass.src)
        .pipe(compass(config.compass))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.sass.dest));
});

//字体源文件直接拷贝过去
gulp.task('copy-fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
});

//图片源文件直接拷贝过去
gulp.task('copy-images', function() {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest));
});

//css直接拷贝过去
gulp.task('copy-css', function() {
    return gulp.src(config.css.src)
        .pipe(gulp.dest(config.css.dest));
});

//js合并
gulp.task('js-merger', function() {});

gulp.task('watch', function() {
    gulp.watch(config.sass.src, gulp.series('compass'));
});

//开发环境：只要编译sass即可
gulp.task('default', gulp.series('compass', 'watch'));



//生成环境：1、删除dist目录 2、编译sass，并把编译后的结果发送到dist目录；3、合并js请求
gulp.task('p', gulp.series('clear-dist', gulp.parallel(gulp.series('compass', 'copy-css', 'copy-fonts', 'copy-images'), 'js-merger')));
