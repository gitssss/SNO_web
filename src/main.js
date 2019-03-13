// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import VueCytoscape from 'vue-cytoscape'
import axios from 'axios'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
Vue.use(VueCytoscape)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


Vue.prototype.$axios = axios
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

window.storage = {
  setIndex: function(index) {
      localStorage.setItem('index', index);
  },
  getIndex: function() {
      localStorage.getItem('index');
  },
  setKey: function(uuid) {
      var keys = this.getKeys();
      keys.push(uuid)
      localStorage.setItem('keys', this.toJson(keys));
      this.setIndex(0);
  },
  getKeys: function() {
      var keys = localStorage.getItem('keys')
      if (keys === null) {
          return [];
      }
      return this.toObject(keys);
  },
  setPositions: function(locations) {
      var uuid = new Date().getTime()
      this.setKey(uuid.toString())
      localStorage.setItem(uuid.toString(), this.toJson(locations))
  },
  getPositions: function(uuid) {
      var temp = localStorage.getItem(uuid)
      if (temp === null) {
          this.setPositions(uuid, [])
          return []
      }
      return JSON.parse(temp) || '[]'
  },
  toJson(object) {
      return JSON.stringify(object)
  },
  toObject(json) {
      return JSON.parse(json)
  },
  setCount: function(count) {
    localStorage.setItem('count', count);
  },
  getCount: function() {
      localStorage.getItem('count');
  },
}
