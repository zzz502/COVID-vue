<template>
<el-form style="width:60%" :model="Emp" :rules="rules" ref="Emp" label-width="100px" class="demo-Emp">
  <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
    <el-input v-model="Emp.title" autocomplete="off"></el-input>
  </el-form-item>
     <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
      <el-input v-model="Emp.content" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('Emp')">立即创建</el-button>
    <el-button @click="resetForm('Emp')">重置</el-button>
    <el-button @click="go">取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        formLabelWidth: '130px',
        Emp: {
            title:"",
            content:"",
                },
        rules: {
          title: [
            { required: true, message: '请输入公告标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },
            { min: 3, max: 20, message: '长度大于10个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      go(){
        this.$router.push('RecordManage')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8080/emp/save',this.Emp).then((resp)=>{
              if(resp.data=='success'){
               this.$alert('添加成功！',"消息",{
                 confirmButtonText:"确定",
                 callback:action=>{
                   this.$router.push('/RecordManage')
                 }
               })
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        console.log(formName);
        this.$refs[formName].resetFields();
      }
    }
  }
</script>