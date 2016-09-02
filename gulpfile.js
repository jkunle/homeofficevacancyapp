"use strict";
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    sassing = require('./gulp/sass'),
    Injector = require('./gulp/inject'),
    test = require('./gulp/test'),
    GovUk = require('./gulp/govuk');

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
            setTimeout(function(){
                browserSync.notify('reloading now ...');
                browserSync.reload({stream : false});
            },1000);
        })
        .on('start', function(){
            console.log('*** nodemon started');
            startBrowserSync();
        })
};
function startBrowserSync(){
    if (browerSync.active){
        return;
    }
    //console.log('starting browser-sync on port '+ port);
    
    var options = {
        server: "./index",
        proxy : 'localhost:3080' ,
        port : 3000,
        files : ['services/**/*.js', 'js/**/*.js', 'assets/**/*.js', 'views/**/*.*', 'index.js'
            , 'routes/**/*.js', 'controllers/**/*.js', '*.js','css/**/*.css'],
        ghostMode :{
            clicks : true,
            location : false,
            forms : true,
            scroll : true
        },
        injectChanges : true,
        logFileChanges : true,
        logPrefix : 'vacancy app',
        notify : true,
        reloadDelay : 1000
    }
    browserSync(options);
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
gulp.task('injecting', gulp
.series(
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
    gulp.parallel(serve,test.watchmocha)));