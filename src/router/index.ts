import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '.././layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }, {
        path: '/chooseIcon',
        component: () => import('../views/chooseIcon/index.vue')
      }, {
        path: '/chooseArea',
        component: () => import('../views/chooseArea/index.vue')
      }, {
        path: '/chooseTime',
        component: () => import('../views/chooseTime/index.vue')
      }, {
        path: '/chooseCity',
        component: () => import('../views/chooseCity/index.vue')
      }, {
        path: '/trend',
        component: () => import('../views/trend/index.vue')
      }, {
        path: '/notification',
        component: () => import('../views/notification/index.vue')
      }, {
        path: '/menu',
        component: () => import('../views/menu/index.vue')
      }, {
        path: '/progress',
        component: () => import('../views/progress/index.vue')
      }, {
        path: '/calendar',
        component: () => import('../views/calendar/index.vue')
      }, {
        path: '/preview',
        component: () => import('../views/preview/index.vue')
      }, {
        path: '/icon',
        component: () => import('../views/svgIcon/index.vue')
      }, {
        path: '/table',
        component: () => import('../views/table/index.vue')
      }, {
        path: '/form',
        component: () => import('../views/form/index.vue')
      },{
        path: '/bpmn',
        redirect: '/bpmn/index',
        children: [
          {
            path: 'index',
            component: () => import('../views/process/index.vue')
          },
          {
            path: 'design',
            component: () => import('../views/process/design/index.vue'),
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
