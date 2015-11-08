// import gulp from 'gulp';
// // import sourcemaps from 'gulp-sourcemaps';
// // import babel from 'gulp-babel';
// // import concat from 'gulp-concat';
//
// // import gulp from 'gulp';
// import gutil from 'gulp-util';
//
// // import {spawn} from 'child_process';
//
// import browserify from 'browserify';
// import babelify from 'babelify';
// import source from 'vinyl-source-stream';

var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');

var spawn = require('child_process').spawn;

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// var Profile = require('./profile');

var logBundleError = function(err) {
  gutil.log('Error bundling components: ', err.message, err.stack);
};

gulp.task('build', function(cb) {
  var babelOpts = {
    presets: ['es2015'],
    plugins: ['transform-flow-strip-types']
  };

  return browserify('src/woot.js', {
    debug: true,
    standalone: 'woot-js',
  })
    .transform(babelify,  babelOpts)
    .bundle()
    .on('error', function(err) {
      logBundleError.log(err);
      cb();
    })
    .pipe(source('woot.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', shell.task('./node_modules/.bin/jasmine', {
  ignoreErrors: true
}));
//
gulp.task('tdd', ['test'], function() {
  gulp.watch(['src/**/*.spec.js', 'dist/**/*.js'], ['test']);
});
//
gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', '!src/**/*.spec.js'], ['build']);
});
//
// gulp.task('profile', Profile.runProfiles);
// gulp.task('profile-with-logs', Profile.runProfilesWithLogs);
//
// gulp.task('default', ['build', 'watch', 'tdd']);

// gulp.task('browserify', (cb) => {
//   return browserify('src/index.js', {
//     debug: true,
//     standalone: 'bones',
//   })
//     .transform(babelify)
//     .bundle()
//     .on('error', (err) => {
//       logBundleError(err);
//       cb();
//     })
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('dist'));
// });
//
gulp.task('typecheck', function(cb) {
  const ls = spawn(
    './node_modules/.bin/flow',
    ['check', '--all'],
    {stdio: 'inherit'}
  );

  ls.on('close', function() { cb(); });
});
