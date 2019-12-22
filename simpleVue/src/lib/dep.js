/**
 * dep.js
 * @authors hblvsjtu (hblvsjtu@163.com)
 * @date    2019-11-24 15:21:01
 * @version 0.0.1
 */

export default class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    let sub = this.subs.filter(sub => sub.name === watcher.name)[0];
    if(!sub) {
      this.subs.push(watcher);
    }
  }
  notify() {
      this.subs.forEach(sub => {
        sub.update();
      })
  }
}
