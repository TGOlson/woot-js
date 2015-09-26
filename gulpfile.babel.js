import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import shell from 'gulp-shell';

gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', shell.task('./node_modules/.bin/jasmine', {
  ignoreErrors: true
}));

gulp.task('tdd', ['test'], () => {
  gulp.watch(['spec/**/*.js', 'dist/**/*.js'], ['test']);
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('default', ['build', 'watch', 'tdd']);
