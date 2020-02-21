<template>
  <div class="add-change-content">
    <HeaderContent></HeaderContent>
   <div class="type-content">
      <div class="type">
        当前状态:<i></i>新增
      </div>
   </div>
    <div class="enter-content">
      <div class="back-btn">
        <el-button class="green-btn"><img src="./images/back-icon.png" alt="">返回</el-button>
      </div>
      <div class="type-name">
        <div class="name">类型名称：</div>
        <el-input v-model="input" placeholder="请输入类型名称"></el-input>
        <div class="upload-btn">
          <el-button class="deepPurple-btn"><img src="./images/upload-icon.png" alt="">上传照片</el-button>
        </div>
      </div>
      <div class="submit-btn">
        <el-button class="blue-btn">提交数据</el-button>
      </div>
    </div>
    <div class="main-content">
      <div class="left-content">
        <div class="sum-number">总数量：6</div>
        <div class="drawing-details">绘制详情</div>
        <ul class="drawing-list">
          <li>1.基础框</li>
          <li>2.姓名</li>
          <li>3.医保类型</li>
          <li>4.详情</li>
          <li>5.具体内容</li>
          <li>6.现金支付</li>
        </ul>
      </div>

      <div class="right-content">
        <img src="./images/test2.png" alt="">
      </div>
    </div>
  </div>
</template>


<script>
  import HeaderContent from '@/components/header/header';
  export default {
    name: 'addChange',
    components: {
      HeaderContent
    },
    data () {
      return {
        input:''
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "addChange.less";
</style>

<style lang="less">
  @import "default.less";
</style>
