<template>
  <div class="list-table">
    <HeaderContent></HeaderContent>
    <div class="head">
      <div class="head-find"> 
        <el-input  v-model="name" placeholder="请输入搜索名称"></el-input>
        <el-button type="primary" @click="select">
        <img src="../../assets/images/icon-find@2x.png" alt="">
        查询</el-button>
      </div>
      <div class="head-add" @click="add()">
        <img src="../../assets/images/icon_tianjia@2x.png" alt="">
        <span>新增</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      border stripe
      style="width: 100%">
      <el-table-column
        prop="pid" label="序号"
        width="160">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <el-button round class="delete" size="small"  @click.native.prevent="deleteRow(scope.row)">删除</el-button>
          <el-button round @click="jumpModift(scope.row)" class="change-button"  size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div @click="prev" class="prev_next">
          <img class="img-1" src="../../assets/images/icon-maehe_@2x.png" alt="">
          <span>1</span>
        </div>
      <div @click="prevPage" class="prev_next">
            <img class="img-1" src="../../assets/images/icon-maehe@2x.png" alt="">
            <span>上页</span>
          </div>
        <el-pagination 
          background
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :page-size="page.pageSize" 
          :current-page.sync="page.currentPage"
          :total="page.total"
          layout="pager">
        </el-pagination>
        <div @click="nextPage" class="prev_next">
          <span>下页</span>
          <img class="img-2" src="../../assets/images/icon-maehe_z@2x.png" alt="">
        </div>
        <div @click="next" class="prev_next">
          <span>999</span>
          <img class="img-2" src="../../assets/images/icon-maehe_u@2x.png" alt="">
        </div>
      </div>
  </div>
</template>

<script>
  import HeaderContent from '@/components/header/header';
  import { List, DelList,UpdateList } from '@/api/list'

  export default {
    name: 'listTable',
    components: {
      HeaderContent
    },
    data () {
      return {
        name:'',
        // pagerCount:11,
        tableData:[],
        page:{
          total:0,
          pageSize:10,
          currentPage:1
        },
        isFirstPage: true,
        isLastPage: true,
        hasPreviousPage: false,
        hasNextPage: false,
        // tableData:[{
        //   name: '上海市门诊医疗票据'
        // }, {
        //   name: '上海市第六人民医院门急诊医疗票据'
        // }, {
        //   name: '上海市门诊医疗票据'
        // }, {
        //   name: '上海市交通大学附属第九人民医院门急诊医疗票据'
        // }, {
        //   name: '上海同济大学附属口腔医院门诊医疗票据'
        // },{
        //   name: '上海市第十人民医院门急诊医疗票据'
        // }, {
        //   name: '上海市第六人民医院门急诊医疗票据'
        // },{
        //   name: '上海市第一妇婴保健院门急诊医疗票据'
        // }]
      }
    },
    created() {
      this.initData()
    },
    methods:{
      async initData() {
        let data = {
          name:this.name,
          pageSize: 10, //每页条数
          pageNum: 1 //当前页码
        }
        let res = await List(data)
        if (res) {
          this.tableData=res.list
          this.page.total=res.total
          this.page.pageSize=res.pageSize
          this.page.currentPage=res.pageNum
          this.isFirstPage=res.isFirstPage
          this.isLastPage=res.isLastPage
          this.hasPreviousPage=res.hasPreviousPage
          this.hasNextPage=res.hasNextPage
        }
      },
      async deleteData(){
        let str = this.img
        if(str.indexOf('.jpg')== -1 || str.indexOf('.png')== -1){
          this.img=''
        }
        let data={
          pid:this.pid,
          img:this.img
        }
        let res = await DelList(data)
        if(res){
          this.initData()
        }
      }, 
     
      select(){
        this.initData()
      },
      deleteRow(row) {
        this.pid=row.pid
        this.img=row.img
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      jumpModift(row) {
        this.$router.push({name:'Addchange',params:{statusGato:'修改',changeText:row}});
      },
      add(){
        this.$router.push({name:'Addchange',params:{statusGato:'新增'}});
      },
      prev(){
        if(this.isFirstPage){
          console.log("clickfirstPage")
          this.page.currentPage=1
        }
      },
      next(){
        if(this.isLastPage){
          console.log("clickLastPage")
          this.page.currentPage= this.page.total/this.page.pageSize;
        }
      },
      prevPage(){
        if(this.hasPreviousPage){
          console.log("clickPrevPage")
          this.page.currentPage-=1
        }
      },
      nextPage(){
        if(this.hasNextPage){
          console.log("clickNextPage")
          this.page.currentPage+=1;
        }
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
      }
    }

  }
</script>


<style lang="less" scoped>
  @import "listTable.less";
</style>
<style lang="less">
  .list-table{
    .el-input__inner{
      font-size: 14px;
      color: #C2C8E3;
      background: #FFFFFF;
      border-radius: 18px;
      height: auto;
      line-height: 20px;
      padding: 8px 20px;
      border: none;
      cursor: pointer;
    }
    .el-table{
      margin: 18px 114px 0 122px;
      width:auto !important;
      color: #3B4162;
      cursor: pointer;
      font-size: 14px;
    }
    .el-table thead{
        font-size: 14px;
        color: #3B4162;
    }
    .el-table th{
      text-align: center;
    }
    .el-table__header tr th{
      background: #FAFAFA;
    }
    .el-table__body tr td{
      border-bottom: none;
    }
    .el-table__body tr .el-table_1_column_1 {
      text-align: center;
    }
    .el-table__body tr .el-table_1_column_2{
      padding:0 30px;
    }
    .el-table__body tr td:nth-of-type(3){
      text-align: center;
    }
    .el-table__empty-block{
      min-height: 100px;
    }
    .el-pagination{
      padding: 0;
      .el-pager{
        .number{
          padding: 0 !important;
          width: 30px;
          height: 30px;
          margin: 0 6px 0  0 !important;
          font-size: 12px !important;
          color: #1E1E1E !important; 
          background: #FFFFFF !important;
          border: 1px solid #E5E7EF !important;
          border-radius: 2px !important;
          font-weight: 400 !important;
        }
        li:not(.disabled).active{
          color: #FFFFFF !important;
          background: #3B4162 !important;
          border: none !important;
        }
      }
    }
  }
</style>
