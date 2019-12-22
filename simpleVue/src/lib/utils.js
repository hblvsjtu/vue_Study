/**
 * api.js
 * @authors hblvsjtu (hblvsjtu@163.com)
 * @date    2019-11-24 15:21:01
 * @version 0.0.1
 */
import Watcher from './watcher';
import Dep from './dep';

function add(a) {
    return a + 1;
}

function observer(obj) {
    if(!obj
        || Object.prototype.toString.call(obj).slice(8, -1) !== 'Object') {
            return;
    }
    Object.keys(obj).forEach(key => defineReactive(obj, key));
}

function defineReactive(obj, attr) {
    let dep = new Dep();
    let val = obj[attr];
    Object.defineProperty(obj, attr, {
        enumerable: true,
        configurable: true,
        get: () => {
            dep.addSub(new Watcher(obj, attr)); // 依赖收集
            return val;
        },
        set: newVal => {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    })
}

module.exports = {
    add,
    observer
};
