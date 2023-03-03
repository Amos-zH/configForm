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
        label="label宽度"
        v-bind="validateInfos.width"
        name="width"
      >
        <a-input v-model:value="formState.width" />
      </a-form-item>
      <a-form-item
        label="查询类型"
        v-bind="validateInfos.type"
        name="type"
      >
        <a-select v-model:value="formState.type" :options="typeList" />
      </a-form-item>
      <a-form-item
        label="查询字段"
        v-bind="validateInfos.code"
        name="code"
      >
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item
        label="字段名称"
        v-bind="validateInfos.label"
        name="label"
      >
        <a-input v-model:value="formState.label" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits, toRaw, onMounted } from 'vue'
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
    value: 'input',
    label: '输入框',
  },
  {
    value: 'select',
    label: '下拉框',
  },
])
const formState = reactive({
  width: '',
  type: '',
  code: '',
  label: '',
})
const rulesRef = reactive({
  width: [{
    required: true,
    message: '请输入label宽度！',
  }],
  type: [{
    required: true,
    message: '请输入查询类型！',
  }],
  code: [{
    required: true,
    message: '请输入查询字段！',
  }],
  label: [{
    required: true,
    message: '请输入字段名称！',
  }],
})
const {
  resetFields,
  validate,
  validateInfos,
} = useForm(formState, rulesRef, {
  onValidate: (...args) => console.log(...args),
})
onMounted(() => {
})
</script>

<style lang="scss" scoped>

</style>
