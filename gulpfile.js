(function () {
    var gulp = require('gulp'),
        webserver = require('gulp-webserver'),
        sassing = require('./gulp/sass'),
        injecting = require('./gulp/inject'),
        copying = require('./gulp/copygovassets');



    function browser() {
        gulp.src('./views')
            .pipe(webserver({
                livereload: true,
                open: true
            }));
    };

    gulp.task('copying', copying);
    gulp.task('sassing', sassing);
    gulp.task('injecting', injecting);
    gulp.task('browsering', browser);
    
    gulp.task('default', gulp.series(copying, sassing, injecting, browser));



})();