import '../public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setComp from './plugins/antd'

let app = createApp(App)
setComp(app)
let routerObj = router

/* 乾坤配置 */
function render ({ container } = {}) {
  // 为了避免根 id #app 与其他的 DOM 冲突，需要用 container 限制查找范围
  app.use(store).use(routerObj).mount(container ? container.querySelector('#app') : '#app') // 这里两个#app都是对应子系统index.html里的入口位置
}
// 默认独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
// 父应用加载子应用，子应用必须暴露三个接口：bootstrap、mount、unmount
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap (props) {
  console.log('微应用已启动')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props) {
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount (props) {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
  routerObj = null
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update (props) {
  console.log('update props', props)
}
/* 乾坤配置 */

// 路由拦截
routerObj.beforeEach((to, from) => {
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
    routerObj.addRoute('layout', {
      path: asyncRoute.path,
      meta: asyncRoute.meta,
      name: asyncRoute.name,
      component: () => import(`@views/${asyncRoute.file_url}/index`),
    })
    console.log('查看现有路由：', routerObj.getRoutes())
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

// app.use(store).use(routerObj).mount('#app')
