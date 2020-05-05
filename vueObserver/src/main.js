/*
 * @Author: hblvsjtu (hblvsjtu@163.com) 
 * @Date: 2020-05-04 12:20:37 
 * @Last Modified by: hblvsjtu (hblvsjtu@163.com)
 * @Last Modified time: 2020-05-05 20:28:01
 */
import {
    isArray,
    isPlainObject
} from 'lodash';

const newArray = (callbacks) => {
    const myArray = Object.create(Array.prototype);
    ['push', 'pop', 'slice', 'concat'].forEach(methodKey => {
        myArray[methodKey] = function() {
            Array.prototype[methodKey].call(this, ...arguments);
            callbacks.forEach(callback => callback.call(this, ...arguments));
        }
    })
    return myArray;
}

export default class BindData {
    constructor(getHook) {
        this.getHook = getHook;
        this.list = new Map();
    }
    addData(data, callback) {
        if (this.list.has(data)) {
            this.list.get(data).push(callback);
        }
        else {
            this.list.set(data, [callback]);
        }
        this.observe(data, this.list.get(data));
    }
    deleteData(data) {
        if (this.list.has(data)) {
            this.disableObserve(data);
            this.list.delete(data);
        }
    }
    observe(data, callbacks) {
        if (isArray(data)) {
            data.__proto__ = newArray(callbacks);
            data.forEach(item => this.observe(item, callbacks));
        }
        if (isPlainObject(data)) {
            for(let key in data) {
                this.activeWatch(data, key, data[key], callbacks);
                this.observe(data[key], callbacks);
            }
        }
    }
    disableObserve(data) {
        if (isArray(data)) {
            data.__proto__ = Array;
            data.forEach(item => this.observe(item));
        }
        if (isPlainObject(data)) {
            for(let key in data) {
                this.activeWatch(data, key, data[key]);
                this.observe(data[key]);
            }
        }
    }
    activeWatch (data, key, val, callbacks) {
        Object.defineProperty(data, key, {
            get() {
                this.getHook && this.getHook(val);
                return val;
            },
            set (nowVal) {
                val = nowVal;
                callbacks && callbacks.forEach(callback => callback.call(this, ...arguments));
            }
        })
    }
    disableObserve(data) {
        this.observe(data, []);
    }
}


