import Vue from 'vue'
import Router from 'vue-router'
import indexpage from '@/components/indexpage'
import reg from '@/components/reg.vue'
import login from '@/components/login.vue'
import index from '@/components/home/index.vue'
import home from '@/components/home/home.vue'
import classmate from '@/components/home/classmate.vue'
import achieve from '@/components/home/achieve.vue'
import me from '@/components/home/me.vue'
import classmateinfor from '@/components/home/classmateinfor.vue'
import permsg from '@/components/home/permsg.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexpage',
      component: indexpage
    },
    {
      path: '/reg',
      component: reg
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      redirect: '/home',
      children:[
        {
          path: '/home',
          component: home,
        },
        {
          path: '/classmate',
          component: classmate,
        },
        {
          path: '/achieve',
          component: achieve,
        },
        {
          path: '/me',
          component: me,
        },
        {
          path: '/classmateinfor/:id',
          component: classmateinfor,
        },
        {
          path: '/permsg',
          component: permsg,
        }
      ]
    }
  ]
})
