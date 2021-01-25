import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import G6 from '@/view/G6/index'
import atnd from '@/view/atnd/index'
import quill from '@/view/quill/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/G6',
      name: 'G6',
      component: G6
    },
    {
      path: '/atnd',
      name: 'atnd',
      component: atnd
    },
    {
      path: '/quill',
      name: 'quill',
      component: quill
    },
  ]
})
