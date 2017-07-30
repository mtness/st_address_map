/* jshint node: true */
'use strict';
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./config.json'));
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');
var debug = getArg('--debug');
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
	gulp.src([__dirname + '/Javascripts/**/*.js'])
		.pipe(plumber())
		.pipe(gulpif(!debug, uglify()))
		.pipe(replace('RequireVersionReplaceByCompiling', Date.now()))
		.pipe(gulp.dest(project.js));
});

gulp.task('watch', function() {
	gulp.watch(__dirname + '/Sass/**/*.scss', ['css']);
	gulp.watch(__dirname + '/Javascripts/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);

/**
 * Get arguments from commandline
 */
function getArg(key) {
	var argClean = key.replace('--', '').toUpperCase();
	if (argClean in process.env) {
		return process.env[argClean];
	}
	var index = process.argv.indexOf(key);
	var next = process.argv[index + 1];
	return (index < 0) ? null : (!next || next[0] === '-') ? true : next;
}
