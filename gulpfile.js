var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

// Browsersync watches HTML
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("./dist/*.html", browserSync.reload);
});