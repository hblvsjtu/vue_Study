/*
 * @Author: hblvsjtu (hblvsjtu@163.com) 
 * @Date: 2020-05-04 12:20:05 
 * @Last Modified by: hblvsjtu (hblvsjtu@163.com)
 * @Last Modified time: 2020-05-04 19:45:52
 */

const path = require('path');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack_common');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const {
    proxy,
    srcPath,
    distPath,
    dllFileNames
} = require('../config');

module.exports = merge(webpackCommon, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_module/,
                include: srcPath
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                include: srcPath
            }
        ]
    },
    plugins: [
        new DllReferencePlugin({
            manifest: require(path.join(distPath, `dllFileNames.manifest.json`))
        }),
        new HtmlWebpackTagsPlugin({
             tags: ['dllFileNames.dll.js'],
             append: false
        })
    ],
    devServer: {
        index: 'index.html',
        compress: true,
        host: '127.0.0.1',
        port: 8080,
        progress: true,
        contentBase: distPath,
        open: true,
        hot: true,
        compress: true,
        proxy
    }
})