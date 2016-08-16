var gulp = require('gulp');

function get_govuksass(done) {
    gulp.src(['node_modules/govuk-elements-sass/public/sass/**/*',
            'node_modules/govuk_frontend_toolkit/stylesheets/**/*'
        ], {}).pipe(gulp.dest('assets'))
        .on('end', done);
}

function get_govuk_template_mustache(done) {
    gulp.src(['node_modules/govuk_template_mustache/views/layouts/**/*.html', ], {})
        .pipe(gulp.dest('views/layouts'))
        .on('end', done);
}

function get_govuk_assets(done) {
    gulp.src(['node_modules/govuk_template_mustache/assets/**/*', ], {})
        .pipe(gulp.dest('assets'))
        .on('end', done);
}

var GovUk = {
    sass: get_govuksass,
    mustache: get_govuk_template_mustache,
    assets: get_govuk_assets
}

module.exports = GovUk;