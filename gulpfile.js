var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var sass  = require('gulp-sass');  // To compile Stylus CSS.
var watch = require('gulp-watch');
 
gulp.task('watch', function() {
  gulp.watch('./src/static/js/**/*.js', ['browserify']);
  gulp.watch('./src/static/css/**/*.scss', ['sass']);
  gulp.watch('./src/static/data/**/*.json', ['static']);
});

gulp.task('browserify', function(){
  browserify(['./src/static/js/site.js'])
  .transform(reactify)
  .bundle()
  .pipe(source('site.js'))
  .pipe(gulp.dest('./build/static/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/static/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/static/css'));
});

gulp.task('static', function(){
  gulp.src('./src/static/css/vendors/*.css')
  .pipe(gulp.dest('./build/static/css'));
  gulp.src('./src/static/fonts/**')
  .pipe(gulp.dest('./build/static/fonts/'));
  gulp.src('./src/static/images/**')
  .pipe(gulp.dest('./build/static/images/'));
  gulp.src('./src/static/data/**')
  .pipe(gulp.dest('./build/static/data/'));
});

gulp.task('default',['browserify','static','watch','sass']);