import gulp from 'gulp';
import gutil from 'gulp-util';
import shell from 'gulp-shell';

import { spawn } from 'child_process';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

import * as Profile from './profile';

const logBundleError = (err) => {
  gutil.log('Error bundling components: ', err.message, err.stack);
};

gulp.task('build', (cb) => {
  const babelOpts = {
    presets: ['es2015'],
    plugins: ['transform-flow-strip-types'],
  };

  return browserify('src/woot.js', {
    debug: true,
    standalone: 'Woot',
  })
    .transform(babelify, babelOpts)
    .bundle()
    .on('error', (err) => {
      logBundleError(err);
      cb();
    })
    .pipe(source('woot.js'))
    .pipe(gulp.dest('dist'));
});


gulp.task('typecheck', (cb) => {
  const ls = spawn(
    './node_modules/.bin/flow',
    ['check', '--all'],
    { stdio: 'inherit' }
  );

  ls.on('close', () => cb());
});

gulp.task('test', ['build'], shell.task('./node_modules/.bin/jasmine', {
  ignoreErrors: true,
}));

gulp.task('tdd', ['test'], () => {
  gulp.watch(['src/**/*.spec.js', 'spec/**/*.spec.js', 'dist/**/*.js'], ['test']);
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'spec/**/*.js'], ['typecheck', 'build']);
});

gulp.task('profile', Profile.runProfiles);
gulp.task('profile-with-logs', Profile.runProfilesWithLogs);

gulp.task('default', ['typecheck', 'build', 'watch', 'tdd']);
