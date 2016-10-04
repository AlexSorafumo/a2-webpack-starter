'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var webpack_config_dev = require('../../webpack/webpack.dev.js')({env: 'development'});
var webpack_config_prod = require('../../webpack/webpack.prod.js')({env: 'production'});
var webpack_config_test = require('../../webpack/webpack.prod.js')({env: 'testing'});

gulp.task('webpack:dev', ['source', 'sass'], function() {
    // Start a webpack-dev-server
    var compiler = webpack(webpack_config_dev, function (err, stats) {
        stats.toString({ colors: true })
    });

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(3000, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('webpack:prod', ['ngc'], function() {
    // run webpack
    webpack(webpack_config_prod, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        //callback();
    });
});
