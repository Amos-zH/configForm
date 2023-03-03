<template>
  <a-modal v-model:visible="dialogVisible" title="查询条件配置" :maskClosable="false" width="50%" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
    </template>
    <a-form
      layout="inline"
      autocomplete="off"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        label="按钮code"
        v-bind="validateInfos.btnCode"
        name="btnCode"
      >
        <a-select v-model:value="formState.btnCode" :options="typeList" />
      </a-form-item>
      <a-form-item
        label="按钮名称"
        v-bind="validateInfos.btnName"
        name="btnName"
      >
        <a-input v-model:value="formState.btnName" />
      </a-form-item>
      <a-form-item
        v-if="formState.btnCode === 2"
        label="接口地址"
        v-bind="validateInfos.btnFetchUrl"
        name="btnFetchUrl"
      >
        <a-input v-model:value="formState.btnFetchUrl" />
      </a-form-item>
      <a-form-item
        v-if="formState.btnCode === 2"
        label="接口方法"
        v-bind="validateInfos.btnFetchMethod"
        name="btnFetchMethod"
      >
        <a-input v-model:value="formState.btnFetchMethod" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
const useForm = Form.useForm

const loading = ref(false)
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogType: {
    type: String,
    default: 'add',
  },
})
const emit = defineEmits(['update:modelValue', 'success'])
const dialogVisible = ref(false)
watch(
  () => props.modelValue,
  (newVal) => {
    newVal && init()
    dialogVisible.value = newVal
  }
)
watch(
  dialogVisible,
  (val) => {
    emit('update:modelValue', val)
  }
)
const handleCancel = () => {
  dialogVisible.value = false
}
const handleOk = () => {
  validate().then(() => {
    console.log('aaa', toRaw(formState))
    emit('success', toRaw(formState))
    handleCancel()
  }).catch(err => {
    console.log('error', err)
  })
}
const init = () => {
  console.log('初始化')
  resetFields()
}
// 业务
const labelCol = reactive(
  { style: { width: '150px', marginBottom: '20px' } }
)
const wrapperCol = reactive(
  { span: 12, offset: 0 }
)
const typeList = ref([
  {
    value: 1,
    label: 'Add',
  },
  {
    value: 2,
    label: 'Delete',
  },
])
const formState = reactive({
  btnCode: '',
  btnName: '',
  btnFetchUrl: '',
  btnFetchMethod: '',
})
const rulesRef = reactive({
  btnCode: [{
    required: true,
    message: '请输入code！',
  }],
  btnName: [{
    required: true,
    message: '请输入name！',
  }],
})
const {
  resetFields,
  validate,
  validateInfos,
} = useForm(formState, rulesRef, {
  onValidate: (...args) => console.log(...args),
})
</script>

<style lang="scss" scoped>

</style>
