import { mapActions, mapGetters, mapMutations } from 'vuex'
import { computed, getCurrentInstance } from 'vue'

const storeBind = (obj) => {
  const { proxy } = getCurrentInstance()
  const ret = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      ret[key] = obj[key].bind(proxy)
    }
  }
  return ret
}
// vuex
const useGetters = (_getters) => {
  const { proxy } = getCurrentInstance()
  const g = mapGetters(_getters)
  const ret = {}
  for (const key in g) {
    if (Object.hasOwnProperty.call(g, key)) {
      ret[key] = computed(() => g[key].call(proxy))
    }
  }
  return ret
}
const useMutations = (mutations) => {
  return storeBind(mapMutations(mutations))
}
const useActions = (actions) => {
  return storeBind(mapActions(actions))
}

export { useGetters, useMutations, useActions }
