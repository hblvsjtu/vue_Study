/*
 * @Author: hblvsjtu (hblvsjtu@163.com) 
 * @Date: 2020-05-04 12:18:32 
 * @Last Modified by: hblvsjtu (hblvsjtu@163.com)
 * @Last Modified time: 2020-05-04 19:02:12
 */

const path = require('path');

module.exports = {
    srcPath: path.resolve(__dirname, '../src'),
    distPath: path.resolve(__dirname, '../dist'),
    proxy: {
        '/test': {
            target: 'http://127.0.0.1:3000'
        }
    },
    dllFileNames: ['lodash']
}
