var gulp = require('gulp');
var del = require('del');
var ghPages = require('gulp-gh-pages');

gulp.task('clean', function(){
  return del('./.publish', { force: true });
});

gulp.task('deploy', ['clean'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
