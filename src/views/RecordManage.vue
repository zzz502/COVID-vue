<template>
<div>
  <div class="navbar" style="margin-bottom:10px;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'Info' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-button type="primary" @click="go" size="medium"
  >新增公告</el-button
  >
  <el-input placeholder="请输入内容" v-model="stext" class="input-with-select" style="width:40%">
    <el-select v-model="cname" slot="prepend" placeholder="请选择" @change="getKey">
      <el-option label="标题" value="title"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
  </el-input>

  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    :row-style="{height:'57px'}"
    :cell-style="{padding:'0px'}">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="auto">
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="发布时间"
        width="170"
        sortable>
    </el-table-column>
   <el-table-column width="120" label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button @click="dialogFormVisible = true,edit(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small" @click="deleteRecord(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

<el-dialog title="修改公告" :visible.sync="dialogFormVisible" slot>
  <el-form :model="Emp" ref="Emp">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="Emp.title" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="Emp.content" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,update()">确 定</el-button>
  </div>
</el-dialog>
  </div>

</div>

</template>

<script>
  export default {
    methods: {
      go(){
        this.$router.push('AddRecord')
      },
    search(){
      if(!this.stext){
        
      axios.get('http://localhost:8080/emp/findAll/1/6').then((resp)=>{
        console.log(resp)
        this.tableData=resp.data.records
        this.total=resp.data.total
        this.cname=""
      })
      }else{
      axios.get('http://localhost:8080/emp/search/'+this.searchKey+"/"+this.stext).then((resp)=>{
              this.tableData=resp.data
              this.total=resp.data.total
            })}
    },
    getKey(e){
      this.searchKey = e
    },

   deleteRecord(row){
        this.$confirm('是否确定要删除'+row.name+'的打卡记录?','删除数据',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{axios.delete('http://localhost:8080/emp/deleteById/'+row.id).then((resp)=>{
          this.$alert(row.name+'的打卡记录删除成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
        })})
      },

      update(){
            axios.put('http://localhost:8080/emp/update',this.Emp).then((resp)=>{
              console.log(resp)
              if(resp.data=='success'){
               this.$alert(this.Emp.name+'的打卡记录修改成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
              }
            })
        },
      edit(row) {
         axios.get('http://localhost:8080/emp/findById/'+row.id).then((resp)=>{
        this.Emp=resp.data;
      })
      },
      handleCurrentChange(currentPage){
        axios.get('http://localhost:8080/emp/findAll/'+currentPage+'/6').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
      })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    created(){
      axios.get('http://localhost:8080/emp/findAll/1/6').then((resp)=>{
        console.log(resp)
        this.tableData=resp.data.records
        this.total=resp.data.total
      });
          axios.get("http://localhost:8080/depart/findAll").then((resp) => {
      console.log(resp.data);
      this.options3 = resp.data;
    });
    },

    data() {

      return {
        value: '',
        cname:'',
        stext:'',
        searchKey:"",
        options: [],

        list: [],
        loading: false,
        tableData: null,
        total:null,
        dialogTableVisible: false,
        dialogFormVisible: false,
         formLabelWidth: '120px',
         LabelWidth: '180px',
          Emp: {
            id:"",
            title:"",
            createTime:"",
            content:""
                }
      }
    }
  }
</script>
<style>
.el-select .el-input {
  width: 130px;
}.input-with-select{

   float: right;
 }
.input-with-select .el-input-group__prepend {

  background-color: #fff;
}
  .red{
    color: red;
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