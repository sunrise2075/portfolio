var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	gulpPlumber = require('gulp-plumber'),
	connect = require('gulp-connect');;

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});
	
gulp.task('scripts',function(){
	gulp.src('js/**/*.js')
		.pipe(gulpPlumber()) 
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js/'))
		.pipe(connect.reload());
});

gulp.task('styles', function(){
	gulp.src('css/*.css')
		.pipe(gulpPlumber()) 
		.pipe(minifyCSS())
		.pipe(gulp.dest('css/'))
		.pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('css/*.css',['styles']);
});

gulp.task('default', ['connect','watch']);