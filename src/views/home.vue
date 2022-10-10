<!--
  功能：功能描述
  时间：2022年07月27日 16:00:26
  版本：v1.0
-->
<template>
  <div class="container">
    <van-button type="primary">主要按钮</van-button>

    <div class="box">123</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'HomeItem',
  setup() {
    const data = reactive({})
    console.log(import.meta.env.MODE)

    onBeforeMount(() => {})
    onMounted(() => {})
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  color: red;

  .box {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
}
</style>
