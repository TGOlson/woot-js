import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
// import concat from 'gulp-concat';

gulp.task('default', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(concat('woot.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});
