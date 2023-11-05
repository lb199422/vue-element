import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        redirect: '/home/recommend',
        component: () => import('@/views/home/Home.vue'),
        children: [
          {
            path: '/home/recommend',
            component: () => import('@/views/home/recommend/Recommend.vue'),
          },
          {
            path: '/home/musiclist',
            component: () => import('@/views/home/musicList/MusicList.vue'),
          },
          {
            path: '/home/newmusic',
            component: () => import('@/views/home/newMusic/NewMusic.vue'),
          },
          {
            path: '/home/ranklist',
            component: () => import('@/views/home/rankList/RankList.vue'),
          },
          {
            path: '/home/singerlist',
            component: () => import('@/views/home/singerList/SingerList.vue'),
          },
          {
            path: '/flow',
            component: () => import('@/views/flow/index.vue'),
          },
        ],
      },
      {
        path: '/video',
        component: () => import('@/views/video/Video.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/test',
    component: () => import('@/components/Test.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
