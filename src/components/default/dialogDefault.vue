<template>
  <a-modal v-model:visible="dialogVisible" title="查询条件配置" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

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
    // newVal && init()
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
  emit('success', 'success')
}
</script>

<style lang="scss" scoped>

</style>
