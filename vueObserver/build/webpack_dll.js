/*
 * @Author: hblvsjtu (hblvsjtu@163.com) 
 * @Date: 2020-05-04 17:30:12 
 * @Last Modified by: hblvsjtu (hblvsjtu@163.com)
 * @Last Modified time: 2020-05-04 19:43:31
 */

const DllPlugin = require('webpack/lib/DllPlugin');
const path = require('path');
const {
    distPath,
    dllFileNames
} = require('../config');

module.exports = {
    mode: 'development', 
    entry: { // 第三方库
        dllFileNames
    },
    output: {
        // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
        filename: '[name].dll.js',
        path: distPath,
        // library必须和后面dllplugin中的name一致 后面会说明
        library: '_dll_[hash]'
    },
    plugins: [
        // 接入 DllPlugin
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            name: '_dll_[hash]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(distPath, '[name].manifest.json')
        })
    ]
}