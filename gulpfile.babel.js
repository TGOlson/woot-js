import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import shell from 'gulp-shell';
import concat from 'gulp-concat';

import Profile from './profile';

gulp.task('build', () => {
  return gulp.src(['src/**/*.js', '!**/*.spec.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', shell.task('./node_modules/.bin/jasmine', {
  ignoreErrors: true
}));

gulp.task('tdd', ['test'], () => {
  gulp.watch(['src/**/*.spec.js', 'dist/**/*.js'], ['test']);
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', '!src/**/*.spec.js'], ['build']);
});

gulp.task('profile', Profile.runProfiles);
gulp.task('profile-with-logs', Profile.runProfilesWithLogs);

gulp.task('default', ['build', 'watch', 'tdd']);
