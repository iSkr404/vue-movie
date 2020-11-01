<template>
<!-- 缓存机制使页面不要重复渲染 -->
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name:'app',
}
</script>
<style>


</style>
