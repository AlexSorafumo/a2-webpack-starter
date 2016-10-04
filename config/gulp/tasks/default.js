'use strict';

var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var clean = require('gulp-clean');

gulp.task('build',      ['webpack:dev']);
gulp.task('build:dev',  ['webpack:dev']);
gulp.task('build:prod', ['webpack:prod']);
gulp.task('test',       ['webpack:test']);
gulp.task('build:test', ['webpack:test']);

gulp.task('clean:build', function() {
    return gulp.src('./.build/**')
        .pipe(clean());
})

gulp.task('clean:dist', function() {
    return gulp.src('./dist/**')
        .pipe(clean());
})

gulp.task('source'/*, ['clean:build', 'clean:dist']*/, function () {
    return gulp.src(['./src/**', '!./src/**/*.scss'])
        .pipe(gulp.dest('./.build'));
});

gulp.task('source:watch', function () {
    gulp.watch('./src/**', ['source']);
});

gulp.task('ngc', ['source', 'sass'], function (cb) {
    return exec('./node_modules/.bin/ngc -p "./tsconfig.aot.json"', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
