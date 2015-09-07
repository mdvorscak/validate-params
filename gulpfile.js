/**
 * Created by Mike Dvorscak on 9/2/2015.
 */

'use strict';
var gulp = require('gulp');
//Test libs
var karma = require('karma');
//documentation
var rename = require("gulp-rename");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");

gulp.task('test', function (done) {
    var server = new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun : true
    }, done);
    server.start();
});

gulp.task('tdd', function () {
    gulp.watch(['index.js', 'lib/**/*.js' ,'test/**/*.js'], ['test']);
});

gulp.task('docs', function(){
    gulp.src(["index.js"])
        .pipe(gulpJsdoc2md())
        .pipe(rename(function(path){
            path.extname = ".md";
        }))
        .pipe(gulp.dest("docs"));
});