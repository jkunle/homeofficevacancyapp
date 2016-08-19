"use strict";
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    nodemon = require('gulp-nodemon'),
    sassing = require('./gulp/sass'),
    Injector = require('./gulp/inject'),
    test = require('./gulp/test'),
    GovUk = require('./gulp/govuk');

/*
function browser() {
    gulp.src('./views')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
};*/

function serve() {
    var options = {
        script: 'index.js',
        delayTime: 1,
        env: {
            PORT: 3080
        },
        watch: ['services/**/*.js', 'js/**/*.js', 'assets/**/*.js'
            , 'routes/**/*.js', 'controllers/**/*.js', '*.js']
    }
    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        })
}
// tests
gulp.task('test-runmocha', test.runmocha);

gulp.task('watch-mocha', test.watchmocha);
// copy assets
gulp.task('copying', gulp.parallel(
    GovUk.mustache,
    GovUk.assets,
    GovUk.js
), GovUk.sass);
// injecting assets
gulp.task('injecting', gulp.series(
    Injector.injectingassets,
    Injector.assetsIntoTemplate
));
//gulp.task('browser', browser);
// transforming sass to css
gulp.task('sassing', gulp.parallel(
    GovUk.sass,
    GovUk.mustache
), sassing);
// serve run nodemon
gulp.task('serve', gulp.series(gulp.parallel(
    GovUk.mustache,
    GovUk.assets,
    GovUk.js,
    GovUk.sass
), sassing, Injector.injectingassets, serve));
// default
gulp.task('default', gulp.series(gulp.parallel(
    GovUk.mustache,
    GovUk.assets,
    GovUk.js,
    GovUk.sass
), sassing, Injector.injectingassets,
    gulp.parallel(
        test.watchmocha, serve
    )));