<template>
<div>
  <div class="navbar" style="margin-bottom:10px;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'Info' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>疫情物资管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <el-button type="primary" @click="go" size="medium"
    >新增物资</el-button
    >
    <el-input placeholder="请输入内容" v-model="stext" class="input-with-select" style="width:40%">
    <el-select v-model="cname" slot="prepend" placeholder="请选择" @change="getKey">
      <el-option label="物资名称" value="name"></el-option>
      <el-option label="负责人" value="charge"></el-option>
      <el-option label="更新时间" value="updateTime"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
  </el-input>

  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="物资名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="count"
      label="物资数量"
      width="90">
    </el-table-column>
    <el-table-column
      prop="type"
      label="计量单位"
      width="90">
    </el-table-column>
    <el-table-column
      prop="isImp"
      label="是否为重点物资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="charge"
      label="负责人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cnum"
      label="负责人电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间"
      width="auto">
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

<el-dialog title="更新物资详情" :visible.sync="dialogFormVisible" slot>
  <el-form :model="Mat" ref="Mat">
    <el-form-item label="物资名称" :label-width="formLabelWidth">
      <el-input v-model="Mat.name"  autocomplete="off" ></el-input>
    </el-form-item>
    <el-form-item label="物资数量" :label-width="formLabelWidth">
      <el-input v-model="Mat.count" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="计量单位" :label-width="formLabelWidth">
      <el-input v-model="Mat.type" autocomplete="off"></el-input>
    </el-form-item>
          <el-form-item label="是否为重要物资" :label-width="formLabelWidth" prop="isImp">
        <el-radio v-model="Mat.isImp" label="是" @change="test($event)">是</el-radio>
        <el-radio v-model="Mat.isImp" label="否" @change="test($event)">否</el-radio>
    </el-form-item>
     <el-form-item label="负责人" :label-width="formLabelWidth">
      <el-input v-model="Mat.charge" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="负责人电话" :label-width="formLabelWidth">
      <el-input v-model="Mat.cnum" autocomplete="off"></el-input>
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
      test(dd){
        this.Mat.isImp=dd;
      },
        go(){
            this.$router.push('AddMaterial')
        },
      search(){
      if(!this.stext){
        
      axios.get('http://localhost:8080/Material/findAll/1/6').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
        this.cname=""
      })
      }else{
      axios.get('http://localhost:8080/Material/search/'+this.searchKey+"/"+this.stext).then((resp)=>{
              this.tableData=resp.data
              this.total=resp.data.total
            })}
    },
    getKey(e){
      this.searchKey = e
    },

   deleteRecord(row){
        this.$confirm('是否确定要删除'+row.name+'的物资记录?','删除数据',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{axios.delete('http://localhost:8080/Material/deleteById/'+row.id).then((resp)=>{
          this.$alert(row.name+'的物资记录删除成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
        })})
      },
      update(){
            axios.put('http://localhost:8080/Material/update',this.Mat).then((resp)=>{
              console.log(resp)
              if(resp.data=='success'){
               this.$alert(this.Mat.name+'的物资记录修改成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
              }
            })
        },
      edit(row) {
         axios.get('http://localhost:8080/Material/findById/'+row.id).then((resp)=>{
        this.Mat=resp.data;
      })
      },
      handleCurrentChange(currentPage){
        axios.get('http://localhost:8080/Material/findAll/'+currentPage+'/6').then((resp)=>{
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
      axios.get('http://localhost:8080/Material/findAll/1/6').then((resp)=>{
        console.log(resp)
        this.tableData=resp.data.records
        this.total=resp.data.total
      })
    },

    data() {
      return {
        cname:'',
        stext:'',
        formLabelWidth: '120px',
        options: [],
        value: [],
        list: [],
        loading: false,
        tableData: null,
        total:null,
        dialogTableVisible: false,
        dialogFormVisible: false,

          Mat: {
            id:"",
            name:"",
            count:"",
            type:"",
            isImp:"",
            charge:"",
            cnum:"",
            updateTime:""
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