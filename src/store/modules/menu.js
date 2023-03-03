const menu = {
  namespaced: true,
  state: {
    menuList: [], // 菜单列表
    activeMenu: '', // 当前激活的菜单
    tabList: [], // tab列表
  },
  getters: {
    getMenuList: (state) => {
      return state.menuList
    },
    getTabList: (state) => {
      return state.tabList
    },
  },
  mutations: {
    // 设置菜单列表
    setMenuList (state, v) {
      state.menuList = v
    },
    // 设置选中的菜单
    setActiveMenu (state, v) {
      state.activeMenu = v
    },
    // 增加tab
    addTab (state, v) {
      const index = state.tabList.findIndex(item => item.key === v.key)
      if (index === -1) {
        state.tabList.push(v)
      }
    },
    // 移除tab
    removeTab (state, v) {
      const index = state.tabList.findIndex(item => item.key === v)
      if (index !== -1) {
        state.tabList.splice(index, 1)
      }
    },
  },
  actions: {
  },
}

export default menu
