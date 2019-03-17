import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
        {
          path: 'manga/:id',
          name: 'manga-info',
          component: () => import('./views/manga/Info.vue'),
        },
      ],
    },
    {
      path: '/chapter',
      name: 'reading-layout',
      component: () => import('./layouts/ReadingLayout.vue'),
      children: [
        {
          path: ':chapterID',
          name: 'chapter-view',
          component: () => import('./views/chapter/View.vue'),
        },
      ],
    }
  ],
});
