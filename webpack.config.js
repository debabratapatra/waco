var path = require('path');
 var webpack = require('webpack');
//  npm link webpack-cli // To fix webpack issue.
 module.exports = {
     mode: 'development',
     watch: true,
     watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600
    },
     entry: './js/app.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };