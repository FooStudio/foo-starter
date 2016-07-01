var path = require('path');

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'http://0.0.0.0:3000/',
        productionSourceMap: true
    },
    dev: {
        port: 3000,
        proxyTable: {}
    }
};
