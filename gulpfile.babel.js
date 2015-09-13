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

gulp.task('test', (cb) => {
  gulp.src('')
    .pipe(shell('./node_modules/.bin/jasmine'));
    // TODO: how do we gracefully exit after failures?
    // .pipe(cb);
});
// shell.task('./node_modules/.bin/jasmine'));

gulp.task('tdd', ['test'], () => {
  gulp.watch(['spec/**/*.js', 'dist/**/*.js'], ['test']);
});

gulp.task('watchSrc', () => {
  gulp.watch(['src/**/*.js', 'dist/**/*.js'], ['build']);
});

gulp.task('default', ['watchSrc', 'tdd'])
