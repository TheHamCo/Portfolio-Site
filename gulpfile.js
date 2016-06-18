var  gulp           = require('gulp')
    ,browserSync    = require('browser-sync').create()
    /*Javascript stuff*/
    ,eslint         = require('gulp-eslint')
    ,concat         = require('gulp-concat')
    ,uglify         = require('gulp-uglify')
    ,rename         = require('gulp-rename');

/*Lint, concatenate, and minify custom Javascript*/
gulp.task('custom-js', function () {
    return gulp.src(['./src/js/test.js', './src/js/test2.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(concat('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});
/*Concatenate and minify vendor Javascript*/
/*(For now, only using jQuery, so only copies)*/
gulp.task('vendor-js', function () {
    return gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(rename('vendor.js'))
        .pipe(gulp.dest('./dist/js'));
});
/*COMPLETE JS TASK*/
gulp.task('js',['custom-js','vendor-js']);

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

/*Browsersync watches JS and HTML*/
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("./dist/*.html", browserSync.reload);
});