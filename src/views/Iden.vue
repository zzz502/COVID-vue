<template>

  <div>
    <div class="navbar" style="margin-bottom:10px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'Info' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>疫情报表管理</el-breadcrumb-item>
        <el-breadcrumb-item>隔离人员状态</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column prop="year" label="月份" width="184" align="center">
        <el-table-column
            prop="year"
            label="风险类型"
            align="center"
            width="184"
        ></el-table-column>
      </el-table-column>
      <el-table-column
          prop="fenopda"
          label="六月"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="dwaiod"
          label="七月"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="date"
          label="八月"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="name"
          label="九月"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="province"
          label="十月"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="province"
          label="十一月"
          align="center"
          width="184"
      ></el-table-column>
    </el-table>
    <div class="wai">
      <div class="left">
    <el-table :data="tableData" border stripe>
      <el-table-column prop="year" label="体温情况" width="184" align="center">
        <el-table-column
            prop="year"
            label="风险类型"
            align="center"
            width="184"
        ></el-table-column>
      </el-table-column>
      <el-table-column
          prop="fenopda"
          label="大于37.3度"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="dwaiod"
          label="小于37.3度"
          align="center"
          width="184"
      ></el-table-column>
    </el-table>
      </div>
      <div class="right">
    <el-table :data="tableData" border stripe>
      <el-table-column prop="year" label="状态" width="184" align="center">
        <el-table-column
            prop="year"
            label="风险类型"
            align="center"
            width="184"
        ></el-table-column>
      </el-table-column>
      <el-table-column
          prop="fenopda"
          label="确诊"
          align="center"
          width="184"
      ></el-table-column>
      <el-table-column
          prop="dwaiod"
          label="疑似"
          align="center"
          width="184"
      ></el-table-column>
    </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //模拟的假数据
      tableData: [
        {
          date: 100,
          name: 150,
          province: 200,
          city: "普陀区",
          address: "上海市普陀区金沙江路",
          zip: 200333,
          dwaiod: 150,
          fenopda: 100,
          year: "境外",
        },
        {
          date: 100,
          name: 200,
          province: 150,
          city: "普陀区",
          address: "上海市普陀区金沙江路",
          zip: 200333,
          dwaiod: 100,
          fenopda: 150,
          year: "密接",
        },
        {
          date: 100,
          name: 150,
          province: 200,
          city: "普陀区",
          address: "上海市普陀区金沙江路",
          zip: 200333,
          dwaiod: 150,
          fenopda: 100,
          year: "次密接",
        },
      ],
    };
  },
};


// methods: {
//   getKey(e){
//     this.searchKey = e
//   },
//   edit(row) {
//     axios.get('http://localhost:8080/state/findById/'+row.id).then((resp)=>{
//       this.Appointment=resp.data;
//     })
//   },
//   handleCurrentChange(currentPage){
//     axios.get('http://localhost:8080/state/findAll/'+currentPage+'/9').then((resp)=>{
//       this.tableData=resp.data.records
//       this.total=resp.data.total
//     })
//   },
//
// },
// created(){
//   axios.get('http://localhost:8080/state/findAll/1/9').then((resp)=>{
//     this.tableData=resp.data.records
//     for(var i=0;i<this.tableData.length;i++){
//       if(this.tableData[i].begin!=null) {
//         this.tableData[i].date=this.tableData[i].begin+" 至 "+this.tableData[i].end
//       }
//     }
//     this.total=resp.data.total
//   });
//   axios.get('http://localhost:8080/states/findAll/1/9').then((resp)=>{
//     this.tableData=resp.data.records
//     for(var i=0;i<this.tableData.length;i++){
//       if(this.tableData[i].begin!=null) {
//         this.tableData[i].date=this.tableData[i].begin+" 至 "+this.tableData[i].end
//       }
//     }
//     this.total=resp.data.total
//   });
//   axios.get("http://localhost:8080/depart/findAll").then((resp) => {
//     console.log(resp.data);
//     this.options3 = resp.data;
//   });
// },
//
// data() {
//
//   return {
//     options3: [
//       {
//         value: "",
//         label: "",
//       },
//     ],
//     cname:'',
//     stext:'',
//     pickerOptions: {
//       disabledDate(time) {
//         return time.getTime() > Date.now();
//       },
//       shortcuts: [{
//         text: '今天',
//         onClick(picker) {
//           picker.$emit('pick', new Date());
//         }
//       }, {
//         text: '昨天',
//         onClick(picker) {
//           const date = new Date();
//           date.setTime(date.getTime() - 3600 * 1000 * 24);
//           picker.$emit('pick', date);
//         }
//       }, {
//         text: '一周前',
//         onClick(picker) {
//           const date = new Date();
//           date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
//           picker.$emit('pick', date);
//         }
//       }]
//     },
//     options: [],
//     value: [],
//     list: [],
//     loading: false,
//     tableData: null,
//     total:null,
//     dialogTableVisible: false,
//     dialogFormVisible: false,
//     addDialogFormVisible: false,
//     formLabelWidth: '120px',
//     addLabelWidth:'50px',
//     Disinfect: {
//       id:"",
//       area:"",
//       start:"",
//       end:"",
//       articles:"",
//       method:"",
//       person:"",
//       date:""
//     }
//   }
// }
// }
</script>

<style scoped>
/*::v-deep 这里主要的作用就是用来强制修改element默认的样式*/
::v-deep .el-table thead.is-group th {
  background: none;
  padding: 0px;
}

::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type {
  border-bottom: none; /*中间的横线去掉*/
}

::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type div.cell {
  text-align: right; /*上边文字靠右*/
}

::v-deep .el-table thead.is-group tr:last-of-type th:first-of-type div.cell {
  text-align: left; /*下边文字靠左*/
}
/*核心代码*/
::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type:before {
  content: "";
  position: absolute;
  width: 1px;
  height: 100px; /*斜线的长度*/
  top: 0;
  left: 0;
  background-color: grey;
  opacity: 0.2;
  display: block;
  transform: rotate(-43deg); /*调整斜线的角度*/
  transform: rotate(-74deg); /*调整斜线的角度*/
  -webkit-transform-origin: top;
  transform-origin: top;
}

::v-deep .el-table thead.is-group tr:last-of-type th:first-of-type:before {
  content: "";
  position: absolute;
  width: 1px;
  height: 100px; /*斜线的长度*/
  bottom: 0;
  right: 0;
  background-color: grey;
  opacity: 0.2;
  display: block;
  transform: rotate(-40deg); /*调整斜线的角度*/
  transform: rotate(-73deg); /*调整斜线的角度*/
  -webkit-transform-origin: bottom;
  transform-origin: bottom;
}
::v-deep .el-table thead.is-group th {
  height: 27.4px;
}
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;}
.wai{
 padding-top: 20px;
}
.left{
  float:left;
}
.right{
  float:right;
  padding-right: 5px;
}
</style>