<template>
  <div>
    <div class="font">
      首页11
      <div>
        首页2
        <el-button type="danger">危险按钮</el-button>
        <router-link to="/listTable">第一个页面</router-link>
        <router-link to="/addChange">第二个页面</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
     
    }
  }
}
</script>


<style lang="less" scoped>
 @import "home.less";
</style>
