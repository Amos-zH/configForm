import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: 'home',
    component: () => import(/* webpackChunkName: "layout" */ '@views/layout/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@views/home/index'),
        meta: {
          title: '首页',
          auth: true, // 是否需要登录
          keepAlive: true, // 是否缓存组件
        },
      },
      {
        path: '/configForm',
        name: 'configForm',
        meta: {
          title: '配置表单中心',
        },
        children: [
          {
            path: '/configForm/menuConfig',
            name: 'menuConfig',
            component: () => import(/* webpackChunkName: "configForm" */ '@views/configForm/menuConfig/index'),
            meta: {
              title: '功能模板配置',
              auth: true,
              keepAlive: false, // 不需要缓存
            },
          },
          {
            path: '/configForm/formConfig',
            name: 'formConfig',
            component: () => import(/* webpackChunkName: "configForm" */ '@views/configForm/formConfig/index'),
            meta: {
              title: '动态表单配置',
              auth: true,
              keepAlive: false, // 不需要缓存
            },
          },
        ],
      },
    ],
  },
  {
    // 匹配所有路由 https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "notFound" */ '@views/error-page/index'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
