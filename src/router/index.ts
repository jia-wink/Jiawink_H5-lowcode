import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/css/nprogress.css'; // 进度条样式

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    // path: '/',
    // path: '',
    component: () => import('@/visual-editor/index.vue'),
    // meta: { requiresAuth: true }
    // component: () => import('../visual-editor/components/login/index.vue'),
    // redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('../visual-editor/components/login/index.vue'),
    meta: {
      title: '',
      requiresAuth: false,
    },
  },
  // {
  //   path: '/',
  //   component: () => import('@/visual-editor/index.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const routerTo = JSON.parse(localStorage.getItem('routerTo') as string);
  if (to.meta.requiresAuth === false) {
    next();
  } else if (routerTo) {
    next();
    NProgress.start(); // start progress bar
  } else {
    next({
      path: '/login',
    });
  }
  return true;
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
