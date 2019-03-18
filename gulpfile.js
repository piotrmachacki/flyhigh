/* jshint esversion: 6 */ 

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');



// sass
// ---------------------------------------------- //
gulp.task('sass', () => {
	return gulp.src('./src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed' // nested | expanded | compact | compressed
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions, IE 9']
		}))
		.pipe(rename('styles.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css/'));
});
// ---------------------------------------------- //



// js
// ---------------------------------------------- //
gulp.task('js', () => {
	return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/select2/dist/js/select2.min.js', './src/js/scripts.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js/'));
});
// ---------------------------------------------- //



// imagemin
// ---------------------------------------------- //
gulp.task('imagemin', () => {
	return gulp.src('./src/images/**/*.*')
		.pipe(imagemin({
			quality: '70-90', // When used more then 70 the image wasn't saved
			speed: 1, // The lowest speed of optimization with the highest quality
			floyd: 1 // Controls level of dithering (0 = none, 1 = full).
		}))
		.pipe(gulp.dest('./dist/images/'));
});
// ---------------------------------------------- //



// copy files
// ---------------------------------------------- //
gulp.task('copyFiles', () => {
	return gulp.src(['./src/**/*.html', './src/fonts/**/*.*'],  {base: 'src'})
		.pipe(gulp.dest('./dist/'));
});
// ---------------------------------------------- //


// browserSync
// ---------------------------------------------- //
gulp.task('browserSync', (done) => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
	done();
});
// ---------------------------------------------- //


// reload
// ---------------------------------------------- //
gulp.task('reload', (done) => {
	browserSync.reload();
	done();
});
// ---------------------------------------------- //


// reload
// ---------------------------------------------- //
gulp.task('stream', (done) => {
	browserSync.stream();
	done();
});
// ---------------------------------------------- //



// clean
// ---------------------------------------------- //
gulp.task('clean', () => {
	return gulp.src(['dist/**', '!dist'], {read: false})
		.pipe(clean({
			force: true
		}));
});
// ---------------------------------------------- //


// watch
// ---------------------------------------------- //
gulp.task('watch', () => {
	gulp.watch('./src/**/*.scss', gulp.series('sass', 'reload'));
	gulp.watch('./src/**/*.js', gulp.series('js', 'reload'));
	gulp.watch('./src/images/**/*.*', gulp.series('imagemin', 'reload'));
	gulp.watch(['./src/**/*.html', './src/fonts/**/*.*'], gulp.series('copyFiles', 'reload'));
});
// ---------------------------------------------- //



// default
// ---------------------------------------------- //
gulp.task('default', gulp.series('clean', 'copyFiles', 'sass', 'js', 'imagemin', 'browserSync', 'watch'));
// ---------------------------------------------- //