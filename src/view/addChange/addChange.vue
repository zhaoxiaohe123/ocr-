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
        <el-button class="green-btn" @click="backListTable()"><img src="./images/back-icon.png" alt="">返回</el-button>
      </div>
      <div class="type-name">
        <div class="name">类型名称：</div>
        <el-input v-model="imgName" placeholder="请输入类型名称"></el-input>
        <!-- <div class='name-ver'>请输入类型名称</div> -->
        <div class="upload-btn">
          <el-upload
            class="upload-content"
            action="https://jsonplaceholder.typicode.com/posts/"
            ref="upload"
            :on-change="uoloadChange"
            :file-list="fileList"
            >
            <el-button class="deepPurple-btn"><img src="./images/upload-icon.png" alt="">上传照片</el-button>
          </el-upload>
        </div>
      </div>
      <div class="submit-btn">
        <el-button class="blue-btn" @click="submitUpload">提交数据</el-button>
      </div>
    </div>
    <div class="main-content">
      <div class="left-content">
        <div class="sum-number">总数量：6</div>
        <div class="drawing-details"><img src="./images/drawing-icon.png" alt="">绘制详情</div>
        <ul class="drawing-list">
          <!-- <li>1.基础框</li>
          <li>2.姓名</li>
          <li>3.医保类型</li>
          <li>4.详情</li>
          <li>5.具体内容</li>
          <li>6.现金支付</li> -->
          <li v-for="(item,index) in this.point" :key="index">
            {{index+1}}.{{item.point_name}}
          </li>
        </ul>
      </div>

      <div class="right-content">
        <img :src="this.imgUrl" alt="">
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
        messageState:true,
        imgName:'',
        fileList:[],
        imgUrl:'',
        point:[
          {
            point_name: '基础框',
            x_axis: '10',
            y_axis: '10',
            width: '10',
            height:'10',
          },
          {
            point_name: '姓名',
            x_axis: '10',
            y_axis: '10',
            width: '10',
            height:'10',
          },
          {
            point_name: '医保类型',
            x_axis: '10',
            y_axis: '10',
            width: '10',
            height:'10',
          },
          {
            point_name: '详情',
            x_axis: '10',
            y_axis: '10',
            width: '10',
            height:'10',
          },
          {
            point_name: '具体内容',
            x_axis: '10',
            y_axis: '10',
            width: '10',
            height:'10',
          },
          {
            point_name: '现金支付',
            x_axis: '10',
            y_axis: '10',
            width: '10',
            height:'10',
          }
        ],
      }
    },
    methods:{
      // 返回
      backListTable(){
        this.$router.push('./')
      },
      // 上传图片
      uoloadChange(file){
        console.log(URL.createObjectURL(file.raw))
        if(this.imgName == '' && this.messageState){
          this.imgUrl = '';
          console.log('请输入类型名称');
        }else{
          this.imgUrl = URL.createObjectURL(file.raw);
        }
      },
      // 上传成功
      uploadSuccess(res,file){
        console.log(res,file);
      },
      // 上传失败
      uploadError(err,file){
        console.log(err,file);
      },
      // 数据提交
      submitUpload(){
        this.$refs.upload.submit();
        console.log('提交');
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
