var gulp = require('gulp');

var inject = require('gulp-inject'),
    wiredep = require('wiredep').stream; //wiredep for: bower handled packages

function injectingassets() {


    var injectSrc = gulp.src(
        [
        './assets/javascripts/vendor/jquery*.js',
        './assets/javascripts/govuk/selection-buttons.js',
        './assets/javascripts/vendor/polyfills/bind.js',
        './assets/javascripts/vendor/details.polyfill.js',
        './assets/javascripts/main.js'
        ], {
        read: false
    });

   /* var injectOptions = {
        ignorePath: ['/assets']
    };*/

    var options = {
        bowerJson: require('../bower.json'),
        ignorePath: '..'
    };

    return gulp.src('./views/**/*.hbs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc))
        .pipe(gulp.dest('./views'));
}
function assetsIntoTemplate() {

    var injectSrc = gulp.src(['./assets/stylesheets/*.css'
        //'./builds/css/*.css', './js/*.js'
    ], {
        read: false
    });

    return gulp.src('./views/docheader.hbs')
        .pipe(inject(injectSrc))
        .pipe(gulp.dest('./views'));
}
function assetsIntoScripthbs() {

    var injectSrc = gulp.src(['./assets/javascripts/*.js'], 
    {
        read: false
    });

    return gulp.src('./views/partials/scripts.hbs')
        .pipe(inject(injectSrc))
        .pipe(gulp.dest('./views'));
}
var Injector = {
    injectingassets: injectingassets,
    assetsIntoTemplate: assetsIntoTemplate,
   // assetsIntoScripthbs : assetsIntoScripthbs
}

module.exports = Injector;