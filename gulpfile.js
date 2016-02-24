var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    runSequence = require('run-sequence'),
    cssmin = require('gulp-cssmin'),

    env = {
        appDir: 'assets',
        buildDir: 'dist'
    }
;

gulp.task('clean', function() {
    return del.sync(env.buildDir);
});

gulp.task('sass', function () {
    return gulp.src(env.appDir + '/scss/**/*.scss')
    .pipe(
        sass({
            outputStyle: 'expanded',
            'sourceComments': 'true'
        }).on('error', sass.logError)
    )
    .pipe(
        gulp.dest(env.buildDir + '/styles')
    );
});

gulp.task('copy:html', function() {
    return gulp.src(env.appDir + '/html/**/*')
    .pipe(gulp.dest(env.buildDir));
});

gulp.task('copy:resources', function() {
    return gulp.src(env.appDir + '/{images,fonts,pdf,excel}/**/*')
    .pipe(gulp.dest(env.buildDir));
});

gulp.task('watch', function(){
    gulp.watch(env.appDir + '/scss/**/*.scss', ['sass']);
    gulp.watch(env.appDir + '/html/**/*', ['copy:html']);
});

gulp.task('cssmin', function(){
    gulp.src('dist/styles/**/*')
        .pipe(cssmin())
        .pipe(gulp.dest(env.buildDir + '/styles'));
});

gulp.task('build:dev', function () {
    runSequence('clean', ['sass', 'copy:html', 'copy:resources'], 'watch')
});

gulp.task('build:prod', function () {
    runSequence('clean', ['sass', 'copy:html', 'copy:resources'], 'cssmin')
});
