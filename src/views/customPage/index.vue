<template>
  <div>
test
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getIdrBsAutoRenderPageApi } from '@/api/modules/configForm'

onMounted(() => {
  fetchPageInfo()
})
const labelWidth = ref(0)
const LayoutInput = ref([]) // 表格配置项
const LayoutButtonArr = ref([])
// 获取页面信息
function fetchPageInfo () {
  getIdrBsAutoRenderPageApi().then(res => {
    if (res.error_code === '0' && res.return_code === 0) {
      const result = res.result || {}
      console.log('result: ', result)
      // 搜索栏
      const searchInput = JSON.parse(result.condition_json || '{}')
      console.log('searchInput: ', searchInput)
      let searchArr = []
      if (searchInput.labelWidth) {
        labelWidth.value = searchInput.labelWidth - 0
        searchArr = searchInput.LayoutInput || []
      } else {
        labelWidth.value = 90
        searchArr = searchInput
      }
      LayoutInput.value = searchArr.map(el => {
        el.showName = el.showName || '02'
        el.prop = `${el.tableName}&${el.tableColumn}`
        // if (el.required === '1' && el.tableColumn === 'manager_id') {
        //   this.addInitList.push(el.prop)
        // }
        // if(el.linkageArr&&el.linkageArr.length>0){
        //   this.comovementObj[el.prop]=el.linkageArr
        // }
        // if(el.type === 'DateRange') { // 时间范围
        //   el.prop2 = `${el.tableName}&${el.tableColumn}&end`;
        // }
        // if (el.type === 'SelectorS') {
        //   el.gsv = window.LOCAL_CONFIG.gsv[el.gsv]
        // }
        // if (el.type === "Dict" || el.type === 'Radio') {
        //   dictArr.push(el.dictName)
        //   this.tableDicts[el.prop] = el.dictName;
        // }
        // this.InputType[el.prop] = el.type === 'DateRange' ? '3' : el.multiple === '1' ? '4' : (el.is_like || '1')
        return el
      })
      // 按钮
      LayoutButtonArr.value = JSON.parse(result.button_json)
      console.log('LayoutButtonArr: ', LayoutButtonArr.value)
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
