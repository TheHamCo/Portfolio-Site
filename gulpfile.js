var  gulp           = require('gulp')
    ,browserSync    = require('browser-sync').create()
    ,rename         = require('gulp-rename')
    /*Javascript stuff*/
    ,eslint         = require('gulp-eslint')
    ,concat         = require('gulp-concat')
    ,uglify         = require('gulp-uglify')
    /*(S)CSS stuff*/
    ,sass           = require('gulp-sass')
    ,scsslint       = require('gulp-scss-lint')
    ,autoprefixer   = require('gulp-autoprefixer')
    ,cleanCSS       = require('gulp-clean-css');


/*--------------------------------*/
/*JAVASCRIPT TASKS*/
/*--------------------------------*/
/*Javascript files*/
var jsFiles = ['./src/js/test.js', './src/js/test2.js'];
/*Lint, concatenate, and minify custom Javascript*/
gulp.task('custom-js', function () {
    return gulp.src(jsFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(concat('dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});
/*Concatenate and minify vendor Javascript*/
/*(For now, only using jQuery, so only copies)*/
gulp.task('vendor-js', function () {
    return gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('./dist/js'));
});
/*COMPLETE JS TASK*/
gulp.task('js',['custom-js','vendor-js']);

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['custom-js'], function () {
    //Anonymous function fix from
    //http://stackoverflow.com/questions/29801070/gulp-browser-sync-only-works-once
    browserSync.reload();
});
/*--------------------------------*/
/*./JAVASCRIPT TASKS*/
/*--------------------------------*/


/*--------------------------------*/
/*(S)CSS TASKS*/
/*--------------------------------*/
gulp.task('custom-css', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({includePaths: ['./src/scss']}).on('error',sass.logError))
        .pipe(gulp.dest('./dist/css'));
});
/*--------------------------------*/
/*./(S)CSS TASKS*/
/*--------------------------------*/

/*Browsersync watches JS and HTML*/
gulp.task('serve', ['js'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(jsFiles, ['js-watch']);
    gulp.watch("./dist/*.html", browserSync.reload);
});