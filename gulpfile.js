/**
Required Files
*/
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');
    jshint = require('gulp-jshint');
    rename = require('gulp-rename');

/**Development Server **/
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://localhost',
    server: {
      baseDir: "./*html"
    }
  });
});

/***
TASKS
**/

/**
 * The default gulp task

gulp.task('default', function() {
    console.log("working!")
});
 */

 /**
  * Minify and combine CSS files, including Reset
 */
 gulp.task('css-reset', function() {
     gulp.src([
             'dev/css/reset.css'
         ])
         .pipe(minifyCSS())
         .pipe(concat('reset.css'))
         .pipe(gulp.dest('assets/css'));
 });
 gulp.task('css', function() {
     gulp.src([
             'dev/css/stylesheet.css'
         ])
         .pipe(minifyCSS())
         .pipe(concat('stylesheet.css'))
         .pipe(gulp.dest('assets/css'));
 });

// Lint Task
gulp.task('lint', function() {
    return gulp.src('dev/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('dev/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});
/**
 * Copy images from source to distributable
 *
 * This could be extended to create different
 * quality versions of images, or an image sprite
 */
gulp.task('images', function() {
    gulp.src([
            'dev/img/*'
        ])
        .pipe(gulp.dest('assets/img'));
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('dev/js/*.js', ['lint', 'scripts']);
    gulp.watch('dev/css/*.css', ['css-reset', 'css']);
    gulp.watch('dev/img/*', ['images']);
    gulp.watch("*.html").on("change", reload);
    browserSync.init({
      server: {
          baseDir: "./"
      }
    });
});

// Default Task
gulp.task('default', ['css-reset', 'css', 'images', 'lint', 'scripts', 'watch']);
