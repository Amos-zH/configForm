import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import menu from './modules/menu'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    menu,
  },
  plugins: [
    createPersistedState({
      key: 'haiVuex', // 本地化存储的key值
      paths: ['menu'], // 哪些模块需要缓存
      storage: window.sessionStorage, // 默认存储到 localStorage
    }),
  ],
})
