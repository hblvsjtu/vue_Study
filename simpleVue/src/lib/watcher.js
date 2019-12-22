
/**
 * watcher.js
 * @authors hblvsjtu (hblvsjtu@163.com)
 * @date    2019-11-24 15:21:01
 * @version 0.0.1
 */

export default class Watcher {
    constructor(obj, attr) {
      Dep.target = this;
      this.obj = obj;
      this.name = attr;
    }
    update() {
        console.log('试图更新了～, ', this.name, ' = ', this.obj[this.name]);
    }
  }
  