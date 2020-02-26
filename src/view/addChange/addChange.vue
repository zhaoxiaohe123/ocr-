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
            :http-request="customUpload"
            :before-upload="uploadVer"
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

      <div class="right-content" ref="aa">
        <img :src="this.imgUrl" alt="" v-show="imageState" ref="uploadImgSize">
        <div v-show="!imageState">暂无数据！</div>
        <canvas id="customPositionImg" ref="customPositionImg" 
        :width="this.canvasWidth" 
        :height="this.canvasHeight" 
        v-show="imageState"
        @mousedown="canvasDown"
        @mousemove="canvasMove"
        @mouseup="canvasUp"
        />
         <!-- :width="this.canvasWidth" :height="this.canvasHeight" -->
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
        imageState:false,
        imgName:'',
        fileList:[],
        imgUrl:'',
        canvasWidth:100,
        canvasHeight:500,
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

        endX:'',
        endY:'',
        startX:'',
        startY:'',
        isMouseDownInCanvas:false,
        canvasDom:'',
        point2:[]
      }
    },
    methods:{
      // 返回
      backListTable(){
        this.$router.push('./')
      },
      // 上传图片
      uoloadChange(file){
        console.log(file)
        if(this.imgName == ''){
          this.imgUrl = '';
          this.$message.error('请输入类型名称');
          this.imageState = false;
        }else{
          this.imgUrl = URL.createObjectURL(file.raw);
          this.imageState = true;
          this.getImgWidthHeight(this.imgUrl);
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
      },
      // 自定义上传
      customUpload(file){
        console.log(file)
      },
      // 上传校验
      uploadVer(file){
        let fileName = file.name.replace(/.+\./, "");
         if (['jpg','png'].indexOf(fileName.toLowerCase()) === -1){            
            this.$message.error('请上传jpg或png格式得文件');             
            return false;       
          }   
      },
      // 鼠标按下
      canvasDown(e){
        this.isMouseDownInCanvas = true;
        this.endX = e.offsetX;
        this.endY = e.offsetY;
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        let tempCanvas = document.getElementById('customPositionImg');
        let tempCtx = tempCanvas.getContext('2d');
        this.canvasDom = tempCtx;
      },
      // 鼠标移动
      canvasMove(e){
        if (this.isMouseDownInCanvas){ // 当鼠标有按下操作时执行
          if((this.endX != e.offsetX)||( this.endY != e.offsetY)){
            this.endX = e.offsetX;
            this.endY = e.offsetY;
            let wwidth = this.endX - this.startX;
            let wheigth = this.endY - this.startY;
            // 清除临时层指定区域的所有像素
            this.canvasDom.strokeStyle="red"; //矩形框颜色
            this.canvasDom.lineWidth="1"; //矩形框宽度
            // 清除临时层指定区域的所有像素
            this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.canvasDom.strokeRect(this.startX,this.startY,wwidth,wheigth); //绘制矩形

            if(this.point2.length>0){
              for(let item in this.point2){
                this.canvasDom.strokeStyle="#4848B7"; //矩形框颜色
                this.canvasDom.lineWidth="1"; //矩形框宽度
                this.canvasDom.strokeRect(this.point2[item].x,this.point2[item].y,this.point2[item].wwidth,this.point2[item].wheigth)
              }
            }

            console.log(this.$refs.aa.scrollHeight,this.$refs.aa.scrollTop,this.$refs.aa.clientHeight)
            console.log(this.endY,this.startY)
            // 滚动条判断
            if((this.$refs.aa.clientHeight-40)<this.endY){
              this.$refs.aa.scrollTop = this.$refs.aa.scrollTop + 10;
            }
            if((this.$refs.aa.clientHeight-this.startY-40)<this.endY){
              this.$refs.aa.scrollTop = this.$refs.aa.scrollTop - 10;
            }
          }else{
            let wwidth2 = this.endX - this.startX;
            let wheigth2 = this.endY - this.startY;
            this.canvasDom.strokeStyle="red"; //矩形框颜色
            this.canvasDom.lineWidth="1"; //矩形框宽度
            this.canvasDom.strokeRect(this.startX,this.startY,wwidth2,wheigth2)
          }
        }
      },
      // 鼠标抬起
      canvasUp(e){
        this.isMouseDownInCanvas = false;
    　　// 绘制最终的矩形框
        this.canvasDom.strokeStyle="black"; //矩形框颜色
        this.canvasDom.lineWidth="1"; //矩形框宽度
        let wwidth = this.endX - this.startX;
        let wheigth = this.endY - this.startY;
        this.canvasDom.strokeRect(this.startX,this.startY,wwidth,wheigth);
        let temp = {
          wwidth:wwidth,
          wheigth:wheigth,
          x:this.startX,
          y:this.startY
        }
        if(wwidth != 0 || wheigth != 0){
          this.point2.push(temp);
        }
        
        console.log(this.point2);
      },
      // 获取图片宽高
      getImgWidthHeight(url){
        let img = new Image();
        img.src = url;
        img.onload = (()=>{
          console.log(img.height);
          this.canvasHeight = img.height < 500 ? 500 : img.height;
          this.canvasWidth = img.width < 900 ? 900 : img.width;
        })
      },

    },
    created(){
    }
  }
</script>


<style lang="less" scoped>
  @import "addChange.less";
</style>

<style lang="less">
  @import "default.less";
</style>
