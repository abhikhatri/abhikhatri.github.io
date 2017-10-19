//Gulp build task dependencies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    prefix = require('gulp-autoprefixer');

// Function to print errors on console without terminating gulp
function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}

//Compress and concat JS File
gulp.task('script', function(){
    return gulp.src(['./js/vendor/jquery.min.js', './js/main.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .on('error', errorLog)
    .pipe(gulp.dest('./dist/js'));
});

//Compile, minify and autoprefixes all sass files
gulp.task('sass', function(){
    gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 5 versions'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(rename({ 
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'));

});

gulp.task('fonts', function() {
    gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', ['script', 'sass', 'fonts'], function () {
  gulp.watch('./sass/**/*.scss', ['sass', 'fonts']);
  gulp.watch('./js/*.js', ['script']);
});


gulp.task('default', ['script', 'sass', 'fonts']);


