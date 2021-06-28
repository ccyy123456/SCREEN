import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		//框架
    {
      path: '/',
      component: () => import('../components/container.vue'),
      children: [
        {
          path: '/',
          component: () => import('../pages/home/home.vue'),
        },
        {
          path: '/home',
          component: () => import('../pages/home/home.vue'),
          meta:{
            title: ''
          }
        },
        {
          path: '/projecthome',
          component: () => import('../pages/project/projecthome.vue'),
          meta: {
            title: ''
          }
        },
        {
          path: '/patentanalyze',
          component: () => import('../pages/project/patentanalyze.vue'),
          meta: {
            title: ''
          } 
        }, 
        {
          path: '/financeanalyze',
          component: () => import('../pages/project/financeanalyze.vue'),
          meta: {
            title: ''
          }
        },
        {
          path: '/businessanalyze',
          component: () => import('../pages/project/businessanalyze.vue'),
          meta: {
            title: ''
          }
        },
        {
          path: '/teachanalyze',
          component: () => import('../pages/teach/teachanalyze.vue'),
          meta: {
            title: ''
          }
        },
        {
          path: '/eventhome',
          component: () => import('../pages/event/eventhome.vue'),
          meta: {
            title: ''
          }
        },
        {
          path: '/hatchome',
          component: () => import('../pages/hatch/hatchome.vue'),
          meta: {
            title: ''
          }
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
