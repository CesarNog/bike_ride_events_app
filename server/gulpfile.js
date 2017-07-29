/**
 * Module Dependencies
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('watch', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000/api",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'bin/www',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['views/*.jade'], reload);
  gulp.watch(['routes/*.js'], reload);
});