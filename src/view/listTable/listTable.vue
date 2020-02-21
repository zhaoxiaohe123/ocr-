<template>
  <div>
    <HeaderContent></HeaderContent>
    <div class="head">
      <div class="head-find"> 
        <el-input  v-model="input" placeholder="请输入搜索名称"></el-input>
        <el-button type="primary">
        <img src="../../assets/images/icon-find@2x.png" alt="">
        查询</el-button>
        <!-- <button>
          <img src="../../assets/images/icon-find@2x.png" alt="">
            查询</button> -->
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
      prop="num"
      label="序号"
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
        <el-button round class="delete" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
        <el-button round @click="handleClick(scope.row)" class="change-button"  size="small">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <div>
      <img src="../../assets/images/icon-maehe_@2x.png" alt="">
      <span>1</span>
    </div>
    <div>
      <img src="../../assets/images/icon-maehe@2x.png" alt="">
      <span>上页</span>
    </div>
    <div v-for="i in 10" :key="i" class="num"> 
      <div>{{i}}</div>
    </div>
    <div>
      <span>下页</span>
      <img class="img-3" src="../../assets/images/icon-maehe_z@2x.png" alt="">
    </div>
    <div>
      <span>999</span>
      <img class="img-4" src="../../assets/images/icon-maehe_u@2x.png" alt="">
    </div>
  </div>
  </div>
</template>

<script>
  import HeaderContent from '@/components/header/header';

  export default {
    name: 'listTable',
    components: {
      HeaderContent
    },
    data () {
      return {
        input:'',
        // tableData:[]
        tableData:[{
          num: '1',
          name: '上海市门诊医疗票据'
        }, {
          num: '2',
          name: '上海市第六人民医院门急诊医疗票据'
        }, {
          num: '3',
          name: '上海市门诊医疗票据'
        }, {
          num: '4',
          name: '上海市交通大学附属第九人民医院门急诊医疗票据'
        }, {
          num: '5',
          name: '上海同济大学附属口腔医院门诊医疗票据'
        },{
          num: '6',
          name: '上海市第十人民医院门急诊医疗票据'
        }, {
          num: '7',
          name: '上海市第六人民医院门急诊医疗票据'
        },{
          num: '8',
          name: '上海市第一妇婴保健院门急诊医疗票据'
        }]
      }
    },
    methods:{
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleClick(row) {
        console.log(row);
      },
      add(){
        this.$router.push('./addChange')
      }
    }

  }
</script>


<style lang="less" scoped>
  @import "listTable.less";
</style>
<style>
*{
  margin: 0;
  padding: 0;
}
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
</style>
