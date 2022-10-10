<!--
  功能：功能描述
  时间：2022年08月08日 08:41:22
  版本：v1.0
-->
<template>
  <div>13</div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'NameItem',
  components: {},
  props: {},
  setup() {
    const num = ref(0)
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {})
    return {
      num,
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss"></style>
