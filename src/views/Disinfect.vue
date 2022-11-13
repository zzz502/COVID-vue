<template>
  <div>
    <div class="navbar" style="margin-bottom:10px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'Info' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>疫情报表管理</el-breadcrumb-item>
        <el-breadcrumb-item>每日消毒汇报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="area"
          label="消毒区域"
          width="145">
      </el-table-column>
      <el-table-column
          prop="start"
          label="消毒开始时间"
          width="145">
      </el-table-column>
      <el-table-column
          prop="end"
          label="消毒结束时间"
          width="145">
      </el-table-column>
      <el-table-column
          prop="articles"
          label="消毒用品"
          width="145">
      </el-table-column>
      <el-table-column
          prop="method"
          label="消毒方法"
          width="145">
      </el-table-column>
      <el-table-column
          prop="person"
          label="消毒人员签字"
          width="145">
      </el-table-column>
      <el-table-column
          prop="date"
          label="消毒日期"
          width="145">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange"
          :page-size="6"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
    </div>
</template>

<script>
export default {
  methods: {
    getKey(e){
      this.searchKey = e
    },
    edit(row) {
      axios.get('http://localhost:8080/disinfect/findById/'+row.id).then((resp)=>{
        this.Appointment=resp.data;
      })
    },
    handleCurrentChange(currentPage){
      axios.get('http://localhost:8080/disinfect/findAll/'+currentPage+'/9').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
      })
    }
  },
  created(){
    axios.get('http://localhost:8080/disinfect/findAll/1/9').then((resp)=>{
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
<style>
.red{
  color: red;
}
.el-select .el-input {
  width: 130px;
}.input-with-select{

   float: right;
 }
.input-with-select .el-input-group__prepend {

  background-color: #fff;
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

.navbar-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;}
::v-deep .navbar-item {
  display: inline-block;
  margin-left: 18px;
  font-size: 22px;
  color: #5a5e66;
  box-sizing: border-box;
  cursor: pointer;
}
</style>