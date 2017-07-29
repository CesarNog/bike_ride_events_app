var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');


gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000", // port of node server
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["./app/*.html"], reload);
});

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: '../server/app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});