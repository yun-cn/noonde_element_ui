<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="date" label="日期" width="150">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="province" label="省份" width="120">
    </el-table-column>
    <el-table-column prop="city" label="市区" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址" width="300">
    </el-table-column>
    <el-table-column prop="zip" label="邮编" width="120">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
      <span v-if="!scope.row.ifShow">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </span>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
  export default {
    name: 'homePage',
    data () {
      return {
        bannerH:200,
        bannerImgLst:['navBg1.png','navBg2.png','navBg3.jpg'],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods:{
      setBannerH(){
        this.bannerH = document.body.clientWidth / 4
      },
      handleClick(row) {
        console.log(row);
        row.name = row.city
        row.ifShow = true;
      }
    },
    mounted(){
      this.setBannerH()
      window.addEventListener('resize', () => {
        this.setBannerH()
      }, false)
    },
    created(){}
  }
</script>


<style>
</style>
