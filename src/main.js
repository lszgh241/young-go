// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

// 进行css reset和rem手机端适配，字体文件的引入
import 'css-reset/reset.css'
import './utils/rem'
import 'font-awesome/css/font-awesome.css'

// 备选的mint-ui配置（估计移动端的rem适配毁了他了。。。。）
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
