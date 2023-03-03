import { ref, onMounted, computed, watch } from 'vue'
import { getMenu } from '@/api/modules/base'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useMutations, useGetters } from '@store/useStore'

export default function useMenu () {
  const router = useRouter()
  const store = useStore()
  const menuList = ref([])
  const selectedMenu = computed(() => [store.state.menu.activeMenu])
  const openMenu = ref([])

  onMounted(() => {
    fetchMenu()
  })

  const { setMenuList, setActiveMenu, addTab, removeTab } = useMutations({
    setMenuList: 'menu/setMenuList',
    setActiveMenu: 'menu/setActiveMenu',
    addTab: 'menu/addTab',
    removeTab: 'menu/removeTab',
  })
  const { getMenuList, getTabList } = useGetters({
    getMenuList: 'menu/getMenuList',
    getTabList: 'menu/getTabList',
  })
  // 监听激活菜单
  const activeTab = ref('')
  watch(() => selectedMenu.value, (val) => {
    console.log('激活菜单: ', val)
    // 设置展开选中的菜单
    const openMenuKeyList = filterTree(val[0], getMenuList.value)
    openMenu.value = openMenuKeyList
    // 激活 tab
    activeTab.value = val[0]
    // 路由跳转
    router.push(val[0])
  }, {
    immediate: true,
  })
  // 初始化菜单
  function initMenu () {
    console.log('初始化')
    // 设置选中的菜单
    !store.state.menu.activeMenu && setActiveMenu('/home')
  }
  // 根据选中的菜单，获取展开的菜单数据
  /**
   * 根据目标值在树形数组中获取包含目标值的父子结构
   * @param {*} target 目标值
   * @param {*} treeData 树形数据
   * @param {*} newArr 返回的父子结构
   * @returns
   */
  function filterTree (target, treeData, newArr = []) {
    if (!treeData) return []
    for (const item of treeData) {
      newArr.push(item.path)
      if (item.path === target) {
        return newArr
      }
      if (item.children && item.children.length > 0) {
        const subArr = filterTree(target, item.children, newArr)
        if (subArr && subArr.length) {
          return subArr
        }
      }
      newArr.pop()
    }
    return []
  }
  // 获取菜单数据
  function fetchMenu () {
    getMenu().then(res => {
      if (res.code === '200') {
        menuList.value = res.data
        setMenuList(res.data)
        initMenu()
        initTab()
      }
    })
  }
  // 菜单点击
  function menuClick (item) {
    // 激活左侧菜单
    setActiveMenu(item.key)
    // 增加tab
    addTab({
      key: item.key,
      title: item.item.title,
      closable: true,
    })
  }

  const tabList = ref([])
  // 初始化 tab
  function initTab () {
    if (getTabList.value.length <= 0) {
      addTab({
        key: '/home',
        title: '首页',
        closable: false,
      })
    }
    tabList.value = getTabList.value
  }
  // 删除tab
  function onEditTab (targetKey, action) {
    if (action === 'remove') {
      // 确定删除后下一个激活的tab
      const index = getTabList.value.findIndex(item => item.key === targetKey)
      setActiveMenu(getTabList.value[index - 1].key) // 这里有个问题：如果删除不成功，还是会切换激活的tab，目前的情况不会有问题，后续有逻辑变化再修改
      // 删除tab
      removeTab(targetKey)
    }
  }
  // tab切换
  function onChangeTab (activeKey) {
    setActiveMenu(activeKey)
  }

  return {
    menuList,
    selectedMenu,
    openMenu,
    menuClick,
    tabList,
    activeTab,
    onEditTab,
    onChangeTab,
  }
}
