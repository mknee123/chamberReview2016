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
 */
gulp.task('default', function() {
    console.log("working!")
});


/**
 * Minify and combine CSS files, including Reset
*/
