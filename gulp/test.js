"use strict";
var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util');

function runmocha(){
    return gulp.src(['test/*.js'], {read : false})
    .pipe(mocha({reporter : 'list'}))
    .on('error', gutil.log);
}
function watchmocha()
{ // there is no gulp.run in 4 so self invoke the function below  
    (function(){gulp.task('test-runmocha',runmocha)})();
    gulp.watch(['./**/*.js', 'test/**/*.js'],
    gulp.series(runmocha));
}
module.exports = 
{
    runmocha : runmocha,
    watchmocha : watchmocha
};