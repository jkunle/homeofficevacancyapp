(function () {
    var gulp = require('gulp');
    module.exports =  function copyingassets(done) {
        gulp.src(['node_modules/govuk-elements-sass/public/sass/**/*',
            'node_modules/govuk_frontend_toolkit/stylesheets/**/*'], {
            }).pipe(gulp.dest('assets'))
            .on('end', done);
    }
})();