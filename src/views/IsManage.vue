<template>
<div>
  <div class="navbar" style="margin-bottom:10px;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Info' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>隔离人员信息</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
      <el-button  type="primary" @click="addDialogFormVisible = true"  size="medium">新增记录</el-button>
    <el-input placeholder="请输入内容" v-model="stext" class="input-with-select" style="width:40%">
    <el-select v-model="cname" slot="prepend" placeholder="请选择" @change="getKey">
      <el-option label="姓名" value="name"></el-option>
<!--      <el-option label="隔离方式" value="type"></el-option>-->
<!--      <el-option label="隔离地点" value="place"></el-option>-->
<!--      <el-option label="出发地" value="leaved"></el-option>-->
<!--      <el-option label="途径地" value="arrived"></el-option>-->
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
      prop="name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="60">
    </el-table-column>
      <el-table-column
              prop="age"
              label="年龄"
              width="50">
      </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="temp"
      label="体温"
      width="100">
      <template slot-scope="scope">
          <div slot="reference" >
            <p size="medium" :class="scope.row.temp>36 && scope.row.temp<37.4 ? '' : 'red'">{{ scope.row.temp + "°C" }}</p>
          </div>
        </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="隔离方式"
      width="120">
    </el-table-column>
<!--    <el-table-column-->
<!--      prop="place"-->
<!--      label="隔离地点"-->
<!--      width="200">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="date"
      label="隔离期"
      width="200">
    </el-table-column>
<!--    <el-table-column-->
<!--      prop="leaved"-->
<!--      label="出发地"-->
<!--      width="120">-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      prop="arrived"-->
<!--      label="途径地"-->
<!--      width="120">-->
<!--    </el-table-column>-->
        <el-table-column
      prop="depart"
      label="风险类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="content"
      label="状态"
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

<el-dialog title="修改隔离人员信息" :visible.sync="dialogFormVisible" slot>
  <el-form :model="EmpIs" ref="EmpIs">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.name"  autocomplete="off" ></el-input>
    </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
  <el-radio v-model="EmpIs.sex" label="男">男</el-radio>
  <el-radio v-model="EmpIs.sex" label="女">女</el-radio>
    </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="EmpIs.age"  autocomplete="off" ></el-input>
      </el-form-item>
    <el-form-item label="手机号码" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.phone" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="体温" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.temp" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="隔离方式" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.type" autocomplete="off"></el-input>
    </el-form-item>
<!--     <el-form-item label="隔离地点" :label-width="formLabelWidth">-->
<!--      <el-input v-model="EmpIs.place" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
     <el-form-item label="隔离开始日期" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.begin" autocomplete="off"></el-input>
    </el-form-item>
<!--    <el-form-item label="出发地" :label-width="formLabelWidth">-->
<!--      <el-input v-model="EmpIs.leaved" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="途径地" :label-width="formLabelWidth">-->
<!--      <el-input v-model="EmpIs.arrived" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
         <el-form-item label="风险类型" :label-width="formLabelWidth" prop="depart">
            <el-select
              v-model="EmpIs.depart"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options3"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
     <el-form-item label="状态" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.content" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,update()">确 定</el-button>
  </div>
</el-dialog>


<el-dialog title="新增隔离人员信息" :visible.sync="addDialogFormVisible" slot>
  <el-form :model="EmpIs" >
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.name"  autocomplete="off" ></el-input>
    </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="EmpIs.sex" label="男">男</el-radio>
          <el-radio v-model="EmpIs.sex" label="女">女</el-radio>
    </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="EmpIs.age"  autocomplete="off" ></el-input>
      </el-form-item>
    <el-form-item label="手机号码" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.phone" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="体温" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.temp" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="隔离方式" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.type" autocomplete="off"></el-input>
    </el-form-item>
<!--     <el-form-item label="隔离地点" :label-width="formLabelWidth">-->
<!--      <el-input v-model="EmpIs.place" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
     <el-form-item label="隔离开始日期" :label-width="formLabelWidth">
       <el-date-picker v-model="EmpIs.begin" align="right" type="date"
      placeholder="选择日期" :picker-options="pickerOptions">
    </el-date-picker>
    </el-form-item>
<!--    <el-form-item label="出发地" :label-width="formLabelWidth">-->
<!--      <el-input v-model="EmpIs.leaved" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="途径地" :label-width="formLabelWidth">-->
<!--      <el-input v-model="EmpIs.arrived" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
         <el-form-item label="风险类型" :label-width="formLabelWidth" prop="depart">
            <el-select
              v-model="EmpIs.depart"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options3"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
     <el-form-item label="状态" :label-width="formLabelWidth">
      <el-input v-model="EmpIs.content" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogFormVisible = false,submitForm()">确 定</el-button>
  </div>
</el-dialog>
</div>
</div>
</template>

<script>
  export default {
    methods: {
      search(){
      if(!this.stext){
      axios.get('http://localhost:8080/empis/findAll/1/6').then((resp)=>{
        this.tableData=resp.data.records
        this.total=resp.data.total
        this.cname=""
      })
      }else{
      axios.get('http://localhost:8080/empis/search/'+this.searchKey+"/"+this.stext).then((resp)=>{
              this.tableData=resp.data
              this.total=resp.data.total
            })}
    },
    getKey(e){
      this.searchKey = e
    },
        submitForm() {
          console.log(this.EmpIs.end)
            axios.post('http://localhost:8080/empis/save',this.EmpIs).then((resp)=>{
              if(resp.data=='success'){
               this.$alert('隔离记录添加成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
              }
            })
      },

   deleteRecord(row){
        this.$confirm('是否确定要删除'+row.name+'的隔离记录?','删除数据',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{axios.delete('http://localhost:8080/empis/deleteById/'+row.id).then((resp)=>{
          this.$alert(row.name+'的隔离记录删除成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
        })})
      },
      update(){
            axios.put('http://localhost:8080/empis/update',this.EmpIs).then((resp)=>{
              console.log(resp)
              if(resp.data=='success'){
               this.$alert(this.EmpIs.name+'的隔离记录修改成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   window.location.reload()
                 }
               })
              }
            })
        },
      edit(row) {
         axios.get('http://localhost:8080/empis/findById/'+row.id).then((resp)=>{
        this.EmpIs=resp.data;
      })
      },
      handleCurrentChange(currentPage){
        axios.get('http://localhost:8080/empis/findAll/'+currentPage+'/6').then((resp)=>{
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
      axios.get('http://localhost:8080/empis/findAll/1/6').then((resp)=>{
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
          EmpIs: {
            id:"",
            name:"",
            sex:"",
            age:"",
            phone:"",
            temp:"",
            type:"",
            place:"",
            leaved:"",
            begin:"",
            end:"",
            content:"",
            depart:""
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