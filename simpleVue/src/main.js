/**
 * main.js
 * @authors hblvsjtu (hblvsjtu@163.com)
 * @date    2019-11-24 15:21:01
 * @version 0.0.1
 */
import Vue from 'vue';
import List from './components/List.vue';
import './style/main.less';

'use strict';

const vue = new Vue({
  el: '#' + 'root',
  render: h => {
    return <List></List>;
  }
});
console.log('vue = ', vue);

class SimpleVue {
  constructor () {
    this.i = 10;
    this.compileTree = [];
    this.obersverTree = {};
    this.renderTree = [];
  }

  init () {
    this.setDefualtData();
    this.render();
  }

  setDefualtData () {
    this.data = {
      a: 1,
      b: 2,
      c: 3
    };
  }

  compile () {
    const trigger = document.createElement('button');
    trigger.id = 'trigger';
    trigger.onclick = () => {
      this.data.a = this.i++;
    };
    trigger.className = ['trigger'];
    trigger.innerHTML = 'Trigger';
    this.compileTree.push({ el: trigger, value: '', callback: this.updateView });

    // elementA
    const elementA = document.createElement('div');
    elementA.className = ['hello'];
    elementA.innerHTML = this.data.a;
    this.compileTree.push({ el: elementA, value: 'a', callback: this.updateView });
    // elementB
    const elementB = document.createElement('div');
    elementB.className = ['hello'];
    elementB.innerHTML = this.data.b;
    this.compileTree.push({ el: elementB, value: 'b', callback: this.updateView });
    // elementC
    const elementC = document.createElement('div');
    elementC.className = ['hello'];
    elementC.innerHTML = this.data.c;
    this.compileTree.push({ el: elementC, value: 'c', callback: this.updateView });

    this.compileTree.push({
      value: 'a',
      callback: () => {
        console.log(this.data.a, '=', this.data.a);
        this.data.b = 2 * this.data.a;
        this.data.c = 3 * this.data.a;
      }
    });
  }

  updateView (el, content) {
    if (!el) {
      return;
    }
    el.innerHTML = content;
  }

  registryWatcher (el, value, callback) {
    if (!value) {
      return;
    }
    if (!this.obersverTree[value]) {
      this.obersverTree[value] = [];
    }
    if (callback) {
      const callbackBind = callback.bind(this, el);
      callback && this.obersverTree[value].push(callbackBind);
    }
  }

  registryEle (el) {
    !this.renderTree[el] && this.renderTree.push(el);
  }

  registry () {
    this.compileTree.forEach(item => {
      const { el, value, callback } = item;
      this.registryEle(el);
      this.registryWatcher(el, value, callback);
    });
  }

  mount () {
    this.renderTree.forEach(item => item && document.body.appendChild(item));
  }

  obersverWatcher () {
    Object.keys(this.data).forEach(item => {
      var value = this.data[item]; // 初始值
      Object.defineProperty(this.data, item, {
        configurable: true,
        enumerable: true,
        get: () => {
          this.watchView(item);
          return value;
        },
        set: (val) => {
          if (val !== value) {
            const watcher = this.obersverTree[item];
            watcher.length > 0 && watcher.forEach(callback => callback(val));
          }
          value = val;
        }
      });
    });
  }

  update () {

  }

  watchView (val) {
    console.log('watchView = ', val);
  }

  render () {
    this.compile(); // 编译模板
    this.registry(); // 注册节点和事件
    this.obersverWatcher(); // 添加观察者
    this.mount(); // 节点挂载
  }
}

export default SimpleVue;
