const routes = [
  { path: '/', redirect: { name: 'HomePage' } },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home.vue'),
    meta: {
      title: '首页',
    },
  },
]

export default routes
