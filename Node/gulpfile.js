var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
  gulp.src('scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*', ['styles']);
});

gulp.task('default', ['watch']);