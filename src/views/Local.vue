<template>
  <div>
    <div class="navbar" style="margin-bottom:10px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'Info' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>疫情报表管理</el-breadcrumb-item>
        <el-breadcrumb-item>疫情每日汇报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
           align="right"
          label="行动轨迹"
          width="145">
        <el-table-column
            prop="area" align="right"
            label="地区"
            width="145">
        </el-table-column>
      </el-table-column>
      <el-table-column
          prop="per"
          label="经停高风险地区人数"
          width="145">
      </el-table-column>
      <el-table-column
          prop="pers"
          label="与高风险地区人员接触人数"
          width="145">
      </el-table-column>
      <el-table-column
          prop="perso"
          label="发热、咳嗽人数"
          width="145">
      </el-table-column>
      <el-table-column
          prop="person"
          label="隔离人数"
          width="145">
      </el-table-column>
    </el-table>
<!--    <div class="block">-->
<!--      <el-pagination-->
<!--          @current-change="handleCurrentChange"-->
<!--          :page-size="6"-->
<!--          layout="total, prev, pager, next"-->
<!--          :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->
    </div>
</template>

<script>
export default {
  methods: {
    getKey(e){
      this.searchKey = e
    },
    edit(row) {
      axios.get('http://localhost:8080/local/findById/'+row.id).then((resp)=>{
        this.Appointment=resp.data;
      })
    },
    handleCurrentChange(currentPage){
      axios.get('http://localhost:8080/local/findAll/'+currentPage+'/9').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
      })
    }
  },
  created(){
    axios.get('http://localhost:8080/local/findAll/1/9').then((resp)=>{
      this.tableData=resp.data.records
      for(var i=0;i<this.tableData.length;i++){
        if(this.tableData[i].begin!=null) {
          this.tableData[i].date=this.tableData[i].begin+" 至 "+this.tableData[i].end
        }
      }
      this.total=resp.data.total
    });
    axios.get("http://localhost:8080/depart/findAll").then((resp) => {
      console.log(resp.data);
      this.options3 = resp.data;
    });
  },

  data() {

    return {
      options3: [
        {
          value: "",
          label: "",
        },
      ],
      cname:'',
      stext:'',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      options: [],
      value: [],
      list: [],
      loading: false,
      tableData: null,
      total:null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      addDialogFormVisible: false,
      formLabelWidth: '120px',
      addLabelWidth:'50px',
      Disinfect: {
        id:"",
        area:"",
        start:"",
        end:"",
        articles:"",
        method:"",
        person:"",
        date:""
      }
    }
  }
}
</script>
<style scoped>
.red{
  color: red;
}
.el-select .el-input {
  width: 130px;
}.input-with-select{

   float: right;
 }
.input-with-select .el-input-group__prepend {

  background-color: #fff;}
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
  transform: rotate(-70deg); /*调整斜线的角度*/
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
  transform: rotate(-45deg); /*调整斜线的角度*/
  transform: rotate(-70deg); /*调整斜线的角度*/
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
</style>