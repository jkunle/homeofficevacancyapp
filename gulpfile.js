var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sassing = require('./gulp/sass'),
    Injector = require('./gulp/inject'),
    GovUk = require('./gulp/govuk');


function browser() {
    gulp.src('./views')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
};

gulp.task('copying', gulp.parallel(
    GovUk.sass,
    GovUk.mustache,
    GovUk.assets
));

gulp.task('injecting', gulp.series(
    Injector.injectingassets, Injector.assetsIntoTemplate
));
gulp.task('browser', browser);

gulp.task('sassing', gulp.parallel(
    GovUk.sass,
    GovUk.mustache
), sassing);

gulp.task('default', gulp.series(gulp.parallel(
    GovUk.sass,
    GovUk.mustache,
    GovUk.assets
), sassing, Injector.injectingassets, browser));