<template>
  <div>
    <h4>功能模板配置新增</h4>
    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right">
      <a-collapse-panel key="1" header="页面基本信息">
        <a-form
          :model="formState"
          name="horizontal_login"
          layout="inline"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="菜单编号"
            name="code"
            :rules="[{ required: true, message: '请输入菜单编号！' }]"
          >
            <a-input v-model:value="formState.code">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            label="菜单名称"
            name="name"
            :rules="[{ required: true, message: '请输入菜单名称！' }]"
          >
            <a-input v-model:value="formState.name">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model:activeKey="activeKey" expand-icon-position="right">
      <a-collapse-panel key="1" header="页面布局配置">
        <a-button type="primary" @click="showQueryModal" class="mr10">查询条件配置</a-button>
        <a-button type="primary" @click="showBtnModal" class="mr10">操作按钮配置</a-button>
        <a-button type="primary" @click="showGridModal" class="mr10">Grid表格配置</a-button>
        <a-divider style="border-color: #7cb305" dashed>查询配置展示</a-divider>
        <a-form
          layout="inline"
          autocomplete="off"
        >
          <a-form-item
            v-if="queryObj.type === 'input'"
            :label="queryObj.label"
            :name="queryObj.code"
          >
            <a-input v-model:value="formState[queryObj.code]" />
          </a-form-item>
          <a-form-item
            v-if="queryObj.type === 'select'"
            :label="queryObj.label"
            :name="queryObj.code"
          >
            <a-select v-model:value="formState[queryObj.code]" :options="selectOptionList" />
          </a-form-item>
        </a-form>
        <a-divider style="border-color: #7cb305" dashed>按钮配置展示</a-divider>
        <a-button
          v-for="(item, index) in btnList"
          :key="index"
          :type="item.btnCode === 1 ? 'primary' : 'default'"
          @click="showGridModal"
          class="mr10"
          >
          {{ item.btnName }}
        </a-button>
      </a-collapse-panel>
    </a-collapse>
  </div>
  <dialog-config-query
    v-model="dialogQueryVisible"
    :dialogType="userDialogType"
    @success="getQueryObj"
  />
  <dialog-config-btn
    v-model="dialogBtnVisible"
    :dialogType="userDialogType"
    @success="getBtnObj"
  />
  <dialog-config-grid
    v-model="dialogGridVisible"
    :dialogType="userDialogType"
    @success="query"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import dialogConfigQuery from './dialogConfigQuery.vue'
import dialogConfigBtn from './dialogConfigBtn.vue'
import dialogConfigGrid from './dialogConfigGrid.vue'

const activeKey = ref('1')
const formState = reactive({
  username: '',
  password: '',
})
const onFinish = values => {
  console.log('Success:', values)
}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
// 查询条件配置弹窗
const dialogQueryVisible = ref(false)
const showQueryModal = () => {
  dialogQueryVisible.value = true
}
// 按钮配置弹窗
const dialogBtnVisible = ref(false)
const showBtnModal = () => {
  dialogBtnVisible.value = true
}
// 表格配置弹窗
const dialogGridVisible = ref(false)
const showGridModal = () => {
  dialogGridVisible.value = true
}
// 查询条件
const queryObj = ref({
  width: '',
  type: '',
  code: '',
  label: '',
})
const getQueryObj = (obj) => {
  console.log('obj: ', obj)
  queryObj.value = { ...obj }
}
const selectOptionList = ref([
  {
    value: 'input',
    label: '输入框',
  },
  {
    value: 'select',
    label: '下拉框',
  },
])
// 按钮配置
const btnList = ref([])
const getBtnObj = (obj) => {
  btnList.value.push({ ...obj })
}
</script>

<style lang="scss" scoped>
.mr10 {
  margin-right: 10px;
}
</style>
