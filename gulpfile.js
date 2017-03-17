var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	gulpPlumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
	csslint = require('gulp-csslint'),
    image = require('gulp-image');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});
	
gulp.task('scripts',function(){
	gulp.src('src/js/**/*.js')
		.pipe(gulpPlumber()) 
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('build/js/'))
		.pipe(connect.reload());
});

gulp.task('styles', function(){
	gulp.src('src/css/*.css')
		.pipe(csslint())
		.pipe(gulpPlumber()) 
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});

gulp.task('optimize-image', function () {
    gulp.src('src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        })).pipe(gulp.dest('build/images'));
});

gulp.task('watch',function(){
	//gulp.watch('src/js/*.js',['scripts']);
	gulp.watch('src/css/*.css',['styles']);
});

gulp.task('default', ['connect','watch']);