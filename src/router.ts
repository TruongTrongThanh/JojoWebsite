import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/manga',
      name: 'manga-list',
      component: () => import('./views/manga/List.vue')
    },
    {
      path: '/manga/:mangaID',
      name: 'manga-details',
      component: () => import('./views/manga/Details.vue')
    },
    {
      path: '/chapter/:id',
      name: 'chapter-view',
      component: () => import('./views/chapter/View.vue')
    }
  ]
})
