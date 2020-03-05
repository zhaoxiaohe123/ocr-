<template>
  <div class="add-change-content">
    <HeaderContent></HeaderContent>
   <div class="type-content">
      <div class="type" v-if="this.statusGato == '新增'">
        当前状态:<i></i>{{this.statusGato}}
      </div>
      <div class="type" v-if="this.statusGato == '修改'">
        当前状态:<i></i>{{this.statusGato}}
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
            action="#"
            ref="upload"
            :on-change="uoloadChange"
            :file-list="fileList"
            :http-request="customUpload"
            :before-upload="uploadVer"
            >
            <el-button class="deepPurple-btn" v-if="this.statusGato == '新增'"><img src="./images/upload-icon.png" alt="">上传照片</el-button>
          </el-upload>
        </div>
      </div>
      <div class="submit-btn">
        <el-button class="blue-btn" @click="submitUpload">提交数据</el-button>
      </div>
    </div>
    <div class="main-content" :style="{height:this.mainHeight}">
      <div class="left-content">
        <div class="sum-number">总数量：6</div>
        <div class="drawing-details"><img src="./images/drawing-icon.png" alt="">绘制详情</div>
        <ul class="drawing-list" :style="{height:this.leftLi}">
          <!-- <li>1.基础框</li>
          <li>2.姓名</li>
          <li>3.医保类型</li>
          <li>4.详情</li>
          <li>5.具体内容</li>
          <li>6.现金支付</li> -->
          <li v-for="(item,index) in this.point2" :key="index" :style="{backgroundColor:item.liColor}" @click="changeLiColor(item)">
            <div v-if="item.name == '基础框'">{{index+1}}.{{item.name}}</div>
            <div v-if="item.name != '基础框'" class="cur">{{index+1}}.{{item.name}}</div>
          </li>
        </ul>
      </div>

      <div class="right-content" ref="aa" :style="{width:this.rightWidth}">
        <img :src="this.imgUrl" alt="" v-show="imageState" ref="uploadImgSize" class="upload-imgsize">
        <div class="img-back" ref="imgBack"></div>
        <div class="hite" v-show="!imageState">暂无数据！</div>
        <canvas id="customPositionImg" ref="customPositionImg" 
        :width="this.canvasWidth" 
        :height="this.canvasHeight" 
        v-show="imageState"
        @mousedown="canvasDown"
        @mousemove="canvasMove"
        @mouseup="canvasUp"
        @mouseleave="canvasLeave"
        @mouseover="cnavasOver"
        :style="{zIndex:this.canvasIndex}"
        />
         <!-- :width="this.canvasWidth" :height="this.canvasHeight" -->
        <div @mousedown="moveCanvas($event,index)" @click="changeColor(item)" class="canvas-border" :style="{width:item.wwidth+'px',height:item.wheigth+'px',top:item.y+'px',left:item.x+'px',backgroundColor:item.backgroundColor,border:'1px solid'+item.borderColor,lineHeight:item.wheigth+'px',zIndex:item.name != '基础框' ? item.zIndex : '0'}" v-for="(item,index) in this.point2" :key="index">
          <div v-if="item.name == '基础框'">{{item.name != '基础框' ? item.name : ''}}</div>
          <input type="text" @blur="canvasInputBlur(item.name,index)" ref="canvasInputFocus" class="canvasText" v-if="item.name != '基础框'" v-model="item.name">
          <div class="close" @click="delCanvas(index)" v-if="item.liColor != ''">
            <i class="el-icon-close"></i>
          </div>
          <div v-if="item.name != '基础框'" class="moveLeft" @mousedown="changeWidth($event,index)" :style="{display:item.liColor !='' ? 'block' : 'none'}"></div>
          <div v-if="item.name != '基础框'" class="moveTop" @mousedown="changeHeight($event,index)" :style="{display:item.liColor !='' ? 'block' : 'none'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import HeaderContent from '@/components/header/header';
  import {AddList,UpdateList} from '@/api/list'
  export default {
    name: 'addChange',
    components: {
      HeaderContent
    },
    data () {
      return {
        imageState:false,
        imgWidth:0,
        imgHidth:0,
        imgName:'',
        fileList:[],
        imgUrl:'',
        canvasWidth:100,
        canvasHeight:500,
        endX:'',
        endY:'',
        startX:'',
        startY:'',
        isMouseDownInCanvas:false,
        canvasDom:'',
        point2:[],
        canvasIndex:1,
        // 所有点集合
        point:[],
        mainHeight:0,
        rightWidth:0,
        leftLi:0,
        imgFile:'',
        statusGato:'新增',
        pid:'',
        point_id:'',
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
        // let formData = new FormData() // 创建form对象 
        // formData.append('file', file.raw);
        // formData.append('name', this.imgName);
        // formData.append('points', JSON.stringify(this.point));
        this.imgFile = file;
        console.log(this.imgFile)
        if(this.imgName == ''){
          this.imgUrl = '';
          this.$message.error('请输入类型名称');
          this.imageState = false;
        }else{
          this.imgUrl = URL.createObjectURL(file.raw);
          this.imageState = true;
          this.getImgWidthHeight(this.imgUrl);
        }
        this.point2 = [];
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
        this.point = [];

        if(this.statusGato == '新增'){
          if(this.point2.length > 0){
            if(this.point2.length == 1){
              this.point.push({
                point_name:this.point2[0].name,
                x_axis:this.point2[0].x,
                y_axis:this.point2[0].y,
                width:this.point2[0].wwidth,
                height:this.point2[0].wheigth
              })
            }
            if(this.point2.length > 1){
              for(let item in this.point2){
                let temp = {}
                if(this.point2[item].name == '基础框'){
                  temp = {
                    point_name:this.point2[item].name,
                    x_axis:this.point2[item].x,
                    y_axis:this.point2[item].y,
                    width:this.point2[item].wwidth,
                    height:this.point2[item].wheigth
                  }
                }else{
                  temp = {
                    point_name:this.point2[item].name,
                    x_axis:this.point2[item].x,
                    y_axis:this.point2[item].y,
                    width:this.point2[item].wwidth,
                    height:this.point2[item].wheigth
                  }
                }
                this.point.push(temp);
              }
            }
          }
        }else{
          console.log(this.point2,'------------')
          if(this.point2.length > 0){
            if(this.point2.length == 1){
              this.point.push({
                id:this.point2[item] ? this.point2[item].id.toString() : '',
                point_id:this.point_id,
                point_name:this.point2[0].name,
                x_axis:this.point2[0].x.toString(),
                y_axis:this.point2[0].y.toString(),
                width:this.point2[0].wwidth.toString(),
                height:this.point2[0].wheigth.toString()
              })
            }
            if(this.point2.length > 1){
              for(let item in this.point2){
                let temp = {}
                if(this.point2[item].name == '基础框'){
                  temp = {
                    id:this.point2[item] ? this.point2[item].id.toString() : '',
                    point_id:this.point_id,
                    point_name:this.point2[item].name,
                    x_axis:this.point2[item].x.toString(),
                    y_axis:this.point2[item].y.toString(),
                    width:this.point2[item].wwidth.toString(),
                    height:this.point2[item].wheigth.toString()
                  }
                }else{
                  console.log(this.point2);
                  temp = {
                    id:this.point2[item].id ? this.point2[item].id.toString() : '',
                    point_id:this.point_id,
                    point_name:this.point2[item].name,
                    x_axis:this.point2[item].x.toString(),
                    y_axis:this.point2[item].y.toString(),
                    width:this.point2[item].wwidth.toString(),
                    height:this.point2[item].wheigth.toString()
                  }
                }
                this.point.push(temp);
              }
            }
          }
        }
        
        console.log(this.point);
        console.log('提交');
        if(this.imgName == ''){
           this.$message.error('请输入类型名称');
           return false;
        }

        if(this.imgUrl == ''){
           this.$message.error('请上传图片');
           return false;
        }

        if(this.statusGato == '新增'){
          this.addList();
        }else{
          this.updataList()
        }
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
          this.imageState = false;             
          return false;       
        }
      },
      // 鼠标按下
      canvasDown(e){
        this.endX = e.offsetX;
        this.endY = e.offsetY;
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        let tempCanvas = document.getElementById('customPositionImg');
        let tempCtx = tempCanvas.getContext('2d');
        this.canvasDom = tempCtx;
        this.isMouseDownInCanvas = true;
        console.log(this.point2);
        for(let item in this.point2){
          if(this.point2[item].name == '基础框'){
            this.point2[item].backgroundColor = '';
            this.point2[item].borderColor = '#E83C3C';
          }else{
            this.point2[item].backgroundColor = 'rgba(70,70,235,0.15)';
            this.point2[item].borderColor = '#4848B7';
          }
          this.point2[item].liColor = '';
          this.point2[item].zIndex = 2;
          let height1 = this.point2[item].y + this.point2[item].wheigth;
          let width1 = this.point2[item].x + this.point2[item].wwidth;
        }
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
            this.canvasDom.strokeStyle="#4848B7"; //矩形框颜色
            this.canvasDom.lineWidth="1"; //矩形框宽度
            // 清除临时层指定区域的所有像素
            this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.canvasDom.strokeRect(this.startX,this.startY,wwidth,wheigth); //绘制矩形

            
            // console.log(this.endY,this.startY)
            // 滚动条判断
            let rightW = parseInt(this.rightWidth);
            let rightH = parseInt(this.mainHeight);
            if((this.endY - this.$refs.aa.scrollTop )>(rightH/2+rightH/3)){
              this.$refs.aa.scrollTop = this.$refs.aa.scrollTop + 20;
            }

            if((this.endY - this.$refs.aa.scrollTop )<(rightH/2-rightH/3)){
              this.$refs.aa.scrollTop = this.$refs.aa.scrollTop - 20;
            }

            if((this.endX - this.$refs.aa.scrollLeft )>(rightW/2+rightH/3)){
              this.$refs.aa.scrollLeft = this.$refs.aa.scrollLeft + 20;
            }

            if((this.endX - this.$refs.aa.scrollLeft )<(rightW/2-rightH/3)){
              this.$refs.aa.scrollLeft = this.$refs.aa.scrollLeft - 20;
            }

            for(let item in this.point2){
              this.point2[item].zIndex = 0;
            }

          }else{
            let wwidth2 = this.endX - this.startX;
            let wheigth2 = this.endY - this.startY;
            this.canvasDom.strokeStyle="#4848B7"; //矩形框颜色
            this.canvasDom.lineWidth="1"; //矩形框宽度
            this.canvasDom.strokeRect(this.startX,this.startY,wwidth2,wheigth2)
          }
        }
      },
      // 鼠标抬起
      canvasUp(e){
        if(this.isMouseDownInCanvas){
          this.isMouseDownInCanvas = false;
        }else{
          return false;
        }
    　　// 绘制最终的矩形框
        this.canvasDom.strokeStyle="#4848B7"; //矩形框颜色
        this.canvasDom.lineWidth="1"; //矩形框宽度
        let wwidth = this.endX - this.startX;
        let wheigth = this.endY - this.startY;
        this.canvasDom.strokeRect(this.startX,this.startY,wwidth,wheigth);
        for(let item in this.point2){
          this.point2[item].zIndex = 2;
        }
        if(wwidth < 0){
          wwidth = Math.abs(wwidth);
          wheigth = Math.abs(wheigth);
          this.startX = this.startX - wwidth;
          this.startY = this.startY - wheigth;
        }
        if(wwidth > 10 || wheigth > 10){
          if(this.point2.length > 0){
            this.$prompt('请输入名称', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
              inputErrorMessage: '名称不能为空'
            }).then(({ value }) => {
              let temp = {
                name:value,
                wwidth:wwidth,
                wheigth:wheigth,
                x:this.startX,
                y:this.startY,
                borderColor:'#4848B7',
                backgroundColor:'rgba(70,70,235,0.15)',
                liColor:'',
                zIndex:2
              }
              console.log(wwidth,wheigth,this.startX,this.startY);
              this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
              this.point2.push(temp);
            }).catch(() => {
              this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            });
          }else{
            this.$confirm('是否将此区域作为基础框', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              let temp = {
                name:'基础框',
                wwidth:wwidth,
                wheigth:wheigth,
                x:this.startX,
                y:this.startY,
                borderColor:'#E83C3C',
                backgroundColor:'',
                liColor:'',
                zIndex:2
                
              }
              this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
              this.point2.push(temp);
            }).catch(() => {
              this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);          
            });
          }
        }
      },
      // 鼠标移出
      canvasLeave(e){
        if(this.isMouseDownInCanvas){
          this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.isMouseDownInCanvas = false;
        }
      },
      // 鼠标移入
      cnavasOver(){
        if(this.isMouseDownInCanvas){
          this.canvasDom.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.isMouseDownInCanvas = false;
        }
      },
      // 获取图片宽高
      getImgWidthHeight(url){
        let img = new Image();
        img.src = url;
        img.onload = (()=>{
          console.log(img.height,this.mainHeight);
          let mainH = parseInt(this.mainHeight);
          let rightW = '';
          if(img.height > mainH){
            rightW = parseInt(this.rightWidth)-17;
          }else{
            rightW = parseInt(this.rightWidth);
          }
          this.canvasHeight = img.height < mainH ? mainH : img.height;
          this.canvasWidth = img.width < rightW ? rightW : img.width;
          
          this.imgWidth = img.width;
          this.imgHidth = img.height;

          this.canvasHeight = img.height;
          this.canvasWidth = img.width;

          this.$refs.imgBack.style.width = img.width + 'px';
          this.$refs.imgBack.style.height = img.height + 'px';
        })
      },
      // 选中状态
      changeLiColor(item){
        if(item.name !='基础框'){
          for(let item in this.point2){
            if(this.point2[item].name == '基础框'){
              this.point2[item].backgroundColor = '';
              this.point2[item].borderColor = '#E83C3C';
            }else{
              this.point2[item].backgroundColor = 'rgba(70,70,235,0.15)';
              this.point2[item].borderColor = '#4848B7';
            }
            
            this.point2[item].liColor = '';
            this.point2[item].zIndex = 2;
          }

          item.backgroundColor = 'rgba(42,194,173,0.10)';
          item.borderColor = '#52E5D2';
          item.liColor = '#52E5D2';
          item.zIndex = 3;
        }
        console.log(this.point2);
      },
      // 删除绘制区域
      delCanvas(index){
        this.point2.splice(index, 1);
        for(let item in this.point2){
          this.point2[item].backgroundColor = 'rgba(70,70,235,0.15)';
          this.point2[item].borderColor = '#4848B7';
          this.point2[item].liColor = '';
          this.point2[item].zIndex = 2;
        }
      },
      // 改变宽度
      changeWidth(e,index){
        let odiv = e.target;
        let pdiv = odiv.offsetParent;
        let disX = e.clientX - odiv.offsetLeft;
        this.canvasIndex = -1;
        document.onmousemove = (e) =>{
          let left = e.clientX - disX;    
          pdiv.style.width = left + 2 + 'px';
          this.point2[index].wwidth = left;
          let imgWidth = this.imgWidth - parseInt(pdiv.style.left);

          if(left > imgWidth){
              pdiv.style.width = imgWidth + 2 + 'px';
              this.point2[index].wwidth = imgWidth + 2;
          }
        }
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.canvasIndex = 1;

          console.log(this.point2);
        }
      },
      // 改变高度
      changeHeight(e,index){
        let odiv = e.target;
        let pdiv = odiv.offsetParent;
        let disY = e.clientY - odiv.offsetTop;
        this.canvasIndex = -1;
        document.onmousemove = (e) =>{
          let top = e.clientY - disY;    
          pdiv.style.height = top + 2 + 'px';
          console.log(this.point2[index]);
          this.point2[index].wheigth = top;

          let imgHidth = this.imgHidth - parseInt(pdiv.style.top);

          if(top > imgHidth){
              pdiv.style.height = imgHidth + 2 + 'px';
              this.point2[index].height = wheigth;
          }
        }
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.canvasIndex = 1;
          console.log(this.point2);
        }
      },
      // 拖动元素
      moveCanvas(e,index){
        let odiv = e.target;   
        odiv.style.cursor = 'pointer';
        let poIndex = index;
        //算出鼠标相对元素的位置
        if(odiv.style.width != '' && odiv.style.backgroundColor != 'rgba(70, 70, 235, 0.15)'){
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          let that = this;
          // if(canvas-border.class)
          let scrollx = this.$refs.aa.scrollWidth;
          let scrolly = this.$refs.aa.scrollHeight;
          document.onmousemove = (e)=>{       //鼠标按下并移动的事件
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;    
              let top = e.clientY - disY;

              this.positionX = top;
              this.positionY = left;
              
              let scrollW = this.imgWidth - parseInt(odiv.style.width);
              let scrollH = this.imgHidth - parseInt(odiv.style.height);
              
              odiv.style.top = top + 'px';
              odiv.style.left = left + 'px';
              this.point2[poIndex].y = top;
              this.point2[poIndex].x = left;

              if(top >= scrollH){
                odiv.style.top = scrollH + 'px';
                this.point2[poIndex].y = scrollH;
              }
              if(top <= 0){
                odiv.style.top = 0 + 'px';
                this.point2[poIndex].y = 0;
              }

              if(left >= scrollW){
                odiv.style.left = scrollW + 'px';
                this.point2[poIndex].x = scrollW;
              }
              if(left <= 0){
                odiv.style.left = 0 + 'px';
                this.point2[poIndex].x = 0;
              }

          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            odiv.style.cursor = '';
            console.log(this.point2);
          };
        }
      },
      // 监听失去焦点
      canvasInputBlur(name,index){
        if(name == ''){
          this.point2.splice(index, 1);
        }
      },
      changeColor(item){
        if(item.name !='基础框'){
          for(let item in this.point2){
            if(this.point2[item].name == '基础框'){
              this.point2[item].backgroundColor = '';
              this.point2[item].borderColor = '#E83C3C';
            }else{
              this.point2[item].backgroundColor = 'rgba(70,70,235,0.15)';
              this.point2[item].borderColor = '#4848B7';
            }
            
            this.point2[item].liColor = '';
            this.point2[item].zIndex = 2;
          }

          item.backgroundColor = 'rgba(42,194,173,0.10)';
          item.borderColor = '#52E5D2';
          item.liColor = '#52E5D2';
          item.zIndex = 3;
        }
      },
      // 高度自适应
      getMainHeight(){
        let mainH = document.documentElement.clientHeight-261;
        let rightW = document.documentElement.clientWidth-422;
        let leftLiH = document.documentElement.clientHeight-361;
        this.mainHeight = mainH + 'px';
        this.rightWidth = rightW + 'px';
        this.leftLi = leftLiH + 'px';
      },
      async addList(){
        console.log("新增")
        console.log(this.imgFile)
        console.log(this.imgName)
        console.log(JSON.stringify(this.point))
        let formData = new FormData() // 创建form对象 
        let point11 = {
          point:this.point
        }
        formData.append('file', this.imgFile.raw);
        formData.append('name', this.imgName);
        formData.append('points', JSON.stringify(point11));
        let res =await AddList(formData)
        if(res){
          console.log("------",res)
          if(res == 1){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }else{
            this.$message({
              type: 'info',
              message: '添加失败!'
            });
          }
        }
      },
      async updataList(){
        console.log(this.point2,'---------')
        let formData = new FormData() // 创建form对象 
        // formData.append('file', this.imgFile);
        // formData.append('name', this.imgName);
        // formData.append('params', JSON.stringify(this.point));
        
        let temp = {
          pid:this.pid,
          name:this.imgName,
          img:'',
          point_id:this.point_id,
          point:this.point
        }
        console.log(temp);
        formData.append('params', JSON.stringify(temp));
        console.log(temp,JSON.stringify(temp))
        let res = await UpdateList(formData)
        if(res){
          console.log(res,"---update---")
          if(res == 1){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message({
              type: 'info',
              message: '修改失败!'
            });
          }
        }
      },
      // 页面状态修改
      changePageState(){
        if(this.$route.query.statusGato){
          this.statusGato = this.$route.query.statusGato;
        }
        if(this.$route.query.changeText){
          let obj = JSON.parse(this.$route.query.changeText);
          console.log(obj)
          this.pid = obj.pid.toString();
          this.imgName = obj.name;
          this.imgUrl = obj.img;
          this.point_id = obj.point_id.toString();
          let point = obj.point;
          for(let item in point){
            let temp = {
              name:point[item].point_name,
              wwidth:point[item].width,
              wheigth:point[item].height,
              x:point[item].x_axis,
              y:point[item].y_axis,
              borderColor:'',
              backgroundColor:'',
              liColor:'',
              zIndex:2,
              id:point[item].id,
            }
            if(point[item].point_name == '基础框'){
              temp.backgroundColor = '';
              temp.borderColor = '#E83C3C';
            }else{
              temp.backgroundColor = 'rgba(70,70,235,0.15)';
              temp.borderColor = '#4848B7';
            }
            this.point2.push(temp);
          }
          this.imageState = true;
          this.getImgWidthHeight(this.imgUrl);
        }
      }
    },
    created(){
      this.getMainHeight();
      this.changePageState();
    },
    
  }
</script>


<style lang="less" scoped>
  @import "addChange.less";
</style>

<style lang="less">
  @import "default.less";
</style>
