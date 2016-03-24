var gulp = require('gulp'),
    // common
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    server = lr(),
    // css
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    // js
    uglify = require('gulp-uglify'),
    // icon
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    async = require('async'),
    iconfontCss = require('gulp-iconfont-css');
;


// Js
gulp.task('js', function(){
    gulp.src(['./assets/js/main.js',
              './assets/js/logist.js',
              './assets/js/controllers/modal.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload(server));
});

// Js Vendor
gulp.task('js-vendor', function(){
    gulp.src(['./bower_components/angular/angular.min.js',
              './bower_components/angular-animate/angular-animate.min.js',
              './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/js'))
});


// Css
gulp.task('less', function () {
    gulp.src('./assets/less/**/*.less')
        .pipe(concat('style.css'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload(server));
});


// Watch
gulp.task('watch', function() {
    gulp.run('less');
    gulp.run('js');

    server.listen(35729, function(err) {
        if (err) return console.log(err);

        gulp.watch('./assets/less/**/*.less', function() {
            gulp.run('less');
        });
        gulp.watch('./assets/js/**/*.js', function() {
            gulp.run('js');
        });
    });
    gulp.run('local-server');
});


// Local server
gulp.task('local-server', function() {
    connect()
        .use(serveStatic("./public"))
        .listen('9000');
    console.log('Server listening on http://localhost:9000');
});


// Font Icon
gulp.task('icon', function(){
    gulp.src( './assets/icons/*.svg' )
        .pipe(iconfontCss({
            fontName: 'fonticon', // required
            path: './public/css/icon.css',
            targetPath: '../css/_icons.css',
            fontPath: './public/fonts/'
        })).pipe(iconfont({
            fontName: 'fonticon' // required
        }))
        .pipe(gulp.dest('./public/fonts/'));
});




// Default
gulp.task('default', function() {
    gulp.run('watch');
});