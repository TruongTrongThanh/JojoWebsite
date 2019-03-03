import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main-layout',
      component: () => import('./layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/About.vue'),
        },
        {
          path: 'manga',
          name: 'manga-view',
          component: () => import('./views/manga/View.vue'),
        },
      ],
    },
  ],
});
