/* jshint node: true */
'use strict';
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var project = {
	base: __dirname + json.dist.base,
	css: __dirname + json.dist.base + json.dist.css,
	js: __dirname + json.dist.base + json.dist.js
};

gulp.task('css', function() {
	var config = {};
	config.outputStyle = 'compressed';
	gulp.src(__dirname + '/Sass/*.scss')
		.pipe(plumber())
		.pipe(sass(config))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(project.css));
});

gulp.task('js', function() {
	gulp.src([__dirname + '/JavaScripts/**/*.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest(project.js));
});

gulp.task('watch', function() {
	gulp.watch(__dirname + '/Sass/**/*.scss', ['css']);
	gulp.watch(__dirname + '/JavaScripts/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);
