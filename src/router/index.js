import Vue from 'vue'
import Router from 'vue-router'
import ygCardEditor from '@/components/yg-card-editor/yg-card-editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ygCardEditor',
      component: ygCardEditor
    }
  ]
})
