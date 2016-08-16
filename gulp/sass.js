    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps');

    module.exports = function sassingassets (done) {
        gulp.src('sass/style.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'expanded'
            }))
            .on('error', sass.logError)
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css'))
            .on('end', done);
    }