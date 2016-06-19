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
    ,cleanCSS       = require('gulp-clean-css')
    ,concatCss      = require('gulp-concat-css');


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
/*--------------------------------*/
/*./JAVASCRIPT TASKS*/
/*--------------------------------*/


/*--------------------------------*/
/*(S)CSS TASKS*/
/*--------------------------------*/
gulp.task('custom-css', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({includePaths: ['./src/scss']}).on('error',sass.logError))
        .pipe(autoprefixer({
             browsers   : ['last 2 versions']
            ,cascade    : false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('home.min.css'))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('vendor-css', function () {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('css',['custom-css', 'vendor-css']);
/*--------------------------------*/
/*./(S)CSS TASKS*/
/*--------------------------------*/



/*Browsersync watches JS, SCSS, and HTML*/
// create 2 tasks that ensure the custom JS and CS
// tasks are complete before reloading browsers
gulp.task('js-watch', ['custom-js'], function () {
    //Anonymous function fix from
    //http://stackoverflow.com/questions/29801070/gulp-browser-sync-only-works-once
    browserSync.reload();
});
gulp.task('css-watch', ['custom-css'], function () {
    browserSync.reload();
});

/*Main Browsersync task*/
gulp.task('serve', ['js', 'css'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(jsFiles, ['js-watch']);
    gulp.watch('./src/scss/**/*.scss', ['css-watch']);
    gulp.watch("./dist/*.html", browserSync.reload);
});