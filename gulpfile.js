//导入配置
var config = require('./gulp/config');
//删除
var del = require('del');
var path = require('path');
//监听
var watch = require('gulp-watch');
//gulp插件
var gulp = require("gulp");
//sass编译，注意：只支持sass，不支持compass
var sass = require("gulp-sass");
//自动刷新浏览器
var browserSync = require("browser-sync");
//文件名加MD5后缀
var rev = require("gulp-rev");
//样式瘦身
var cleanCss = require("gulp-clean-css");
//图片base64编码
var base64 = require('gulp-base64');
//对应规则
var sourcemaps = require('gulp-sourcemaps');
//替换html内容js、css
var revCollector = require("gulp-rev-collector");
//postcss
var postcss = require('gulp-postcss');
//PostCSS插件 CSSNext 用下一代CSS书写方式兼容现在浏览器
// var cssnext = require('cssnext');
//PostCSS插件 Autoprefixer 为CSS补全浏览器前缀
var autoprefixer = require('autoprefixer');
//PostCSS插件 CSS Grace 让CSS兼容旧版IE 
var cssgrace = require('cssgrace');
//PostCSS插件 处理样式中的图片，支持内联图片，svg图片，支持获取图片高度宽度，cachebuster=true 没测试通过
var assets = require('postcss-assets');
//PostCSS插件 给图片添加后缀
var urlrev = require('postcss-urlrev');
//PostCSS插件 支持图片精灵
var postcssSprites = require('postcss-sprites');
//require优化
var concat = require("gulp-concat");


var requirejsOptimize = require('gulp-requirejs-optimize');


//sass合并
gulp.task("sass", function() {
    var postcssProcessors = [
        assets,
        urlrev,
        autoprefixer({ browsers: ['last 10 version'] }),
        // postcssSprites({
        //     spritePath: './dist/images', //雪碧图合并后存放地址
        //     stylesheetPath: './dist/css'
        // }),
        cssgrace
    ];
    return gulp.src(config.sass.src)
        .pipe(sass({ outputStyle: 'none' }).on('error', sass.logError))
        // .pipe(cleanCss())
        // .pipe(base64())
        // .pipe(sourcemaps.init())
        .pipe(postcss(postcssProcessors))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(rev())
        .pipe(gulp.dest(config.sass.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task("rev-html", function() {
    return gulp.src(["./dist/**/rev-manifest.json", "./source/**/*.{html,htm}"])
        .pipe(revCollector())
        .pipe(gulp.dest("./dist"))
});

//./dist目录
gulp.task('clear-dist', function() {
    return del([config.dist]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

//copy-fonts
gulp.task('copy-fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
});

//copy-images
gulp.task('copy-images', function() {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest));
});

//copy-html
gulp.task('copy-html', function() {
    return gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest));
});

//copy js
gulp.task('copy-js', function() {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest));
});

//requirejs 合并
gulp.task('scripts', function() {
    var filter = require('gulp-filter');
    return gulp.src([config.js.src])
        .pipe(filter(['**/js/conf/**/*.js', '**/js/app.js']))
        .pipe(requirejsOptimize(function(file) {
            if (file.relative == 'app.js') {
                return Object.assign({}, config.requirejs.app);
            }
            return Object.assign({}, config.requirejs.modules);
        }))
        .pipe(gulp.dest(config.js.dest))
        .pipe(rev())
        .pipe(gulp.dest(config.js.dest))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {
    gulp.watch(config.sass.src, gulp.series('sass'));
    gulp.watch(config.fonts.src, gulp.series('copy-fonts'));
    gulp.watch(config.images.src, gulp.series('copy-images'));
    gulp.watch(config.html.src, gulp.series('copy-html'));
});

//开发环境：只要编译sass即可
gulp.task('default', gulp.series('clear-dist', gulp.parallel('sass', 'copy-fonts', 'copy-images', 'copy-html'), 'watch'));
//生成环境：1、删除dist目录 2、编译sass，并把编译后的结果发送到dist目录；3、合并js请求
gulp.task('p', gulp.series('clear-dist', gulp.parallel(gulp.series('sass', 'copy-fonts', 'copy-images'), 'scripts')));
