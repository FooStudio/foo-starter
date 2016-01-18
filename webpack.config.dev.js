/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'js/bundle.js'
    },
    plugins: [
        new WebpackNotifierPlugin({title: "Foo()"}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html', // Move the index.html file
            inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
        })
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.css', '.scss'],
        modulesDirectories: ['src', 'node_modules', 'vendor', 'bower_components']
    },
    module: {
        preLoaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components|vendor)/,
                includes: path.resolve(__dirname, "src"),
                loader: "eslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src'),
                exclude: /(node_modules|bower_components|vendor)/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-url')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?-url&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap')
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file?name=[name].[ext]'
            }, {
                test: /\.json$/,
                loaders: ['json'],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
