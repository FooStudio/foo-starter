/* eslint-disable no-var */

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);
var server = 3000;

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true, // With hot reloading
    inline: false,
    historyApiFallback: true,
    quiet: false, // Without logging
    noInfo: true,
    stats: {
        assets: true,
        colors: true,
        version: true,
        hash: true,
        timings: true,
        chunks: true,
        chunkModules: true
    }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(server, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:' + server);
});
