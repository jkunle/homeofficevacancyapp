(function () {
    var gulp = require('gulp');
    

    module.exports = function injectingassets () {
        var inject = require('gulp-inject'),
            wiredep = require('wiredep').stream; //wiredep for: bower handled packages

        var injectSrc = gulp.src(['./builds/css/*.css', './js/*.js'],
            { read: false });

        var injectOptions = { ignorePath: ['/builds'] };

        var options = {
            bowerJson: require('../bower.json'),
            ignorePath: '..'
        };

        return gulp.src('./views/*.html')
            .pipe(wiredep(options))
            .pipe(inject(injectSrc, injectOptions))
            .pipe(gulp.dest('./views'));
    };

})();