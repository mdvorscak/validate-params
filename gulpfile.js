/**
 * Created by Mike Dvorscak on 9/2/2015.
 */

'use strict';
var gulp = require('gulp');
//Test libs
var karma = require('karma');

gulp.task('test', function (done) {
    var server = new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun : true
    }, done);
    server.start();
});

gulp.task('tdd', function (done) {
    gulp.watch(['index.js', 'test/**/*.js'], ['test']);
});