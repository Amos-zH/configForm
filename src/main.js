import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setComp from './plugins/antd'

const app = createApp(App)
setComp(app)

// 路由拦截
router.beforeEach((to, from) => {
  if (to.path.indexOf('/newMenu') !== -1 && to.matched.length <= 0) {
    // 异步新增的菜单
    const pathArr = to.path.split('/')
    const id = pathArr[pathArr.length - 1]
    const url = to.path
    const file_url = 'customPage'
    const meta = {}
    const menus = treeToList(store.state.menu.menuList)
    const menuRoute = menus.find(item => item.id === id)
    if (menuRoute) {
      meta.title = menuRoute.name
      meta.isAsync = true
    }
    const asyncRoute = {
      name: id,
      path: url,
      file_url,
      meta,
    }
    console.log('asyncRoute: ', asyncRoute)
    // 注册异步路由
    router.addRoute('layout', {
      path: asyncRoute.path,
      meta: asyncRoute.meta,
      name: asyncRoute.name,
      component: () => import(`@views/${asyncRoute.file_url}/index`),
    })
    console.log('查看现有路由：', router.getRoutes())
    return to.fullPath
  } else if (to.matched.length > 0) {
    // 匹配到路由，正常跳转
    return true
  } else {
    // 如果没有匹配到路由，跳转404页面
    return { name: '404' }
  }
})
// 树结构平铺
function treeToList (tree) {
  const result = tree.map(node => {
    node.level = 1
    return node
  })
  for (let i = 0; i < result.length; i++) {
    if (!result[i].children) continue
    const list = result[i].children.map(node => {
      node.level = result[i].level + 1
      return node
    })
    result.splice(i + 1, 0, ...list)
  }
  return result
}

app.use(store).use(router).mount('#app')
