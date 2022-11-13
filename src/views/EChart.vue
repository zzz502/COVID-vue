<template>
<div>
  <div class="navbar" style="margin-bottom:10px;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'Info' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>疫情报表管理</el-breadcrumb-item>
      <el-breadcrumb-item>隔离人员状态</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div>
    <div class="right">
      <div id="Echart" style="width: 700px;height: 400px"></div>
      <div id="material" style="width: 700px;height: 400px"></div>
    </div>
    <div class="gg">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :row-style="{height:'57px'}"
          :cell-style="{padding:'0px'}">
        <el-table-column
            prop="title"
            label="标题"
            width="100">
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
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>
<script>
import { color } from 'echarts';
export default {
    data(){
        return{
            LineVO:{
                month:'',
                status:{
                    type:'',
                    count:''
                }
            },
            PieVo:{
                name:'',
                value:''
            },
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
    mounted(){
            var echarts = require('echarts');
            var chartDom = document.getElementById('Echart');
            var machartDom=document.getElementById('material');
            var myChart = echarts.init(chartDom);
            var materialChart=echarts.init(machartDom);
        axios.get('http://localhost:8080/empiden/LineVO').then((resp)=>{
            this.LineVO.month=resp.data.month
            this.LineVO.status=resp.data.status
            console.log(this.LineVO.status)
            var option = {
    title: {
        text: '疫情趋势'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['隔离', '疑似', '确诊', '治愈', '死亡']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.LineVO.month//近期七个月
    },
    yAxis: {
        type: 'value',
        data:''
    },
    series: [
        {
            name: '隔离',
            type: 'line',
            data: this.LineVO.status.隔离
        },
        {
            name: '疑似',
            type: 'line',
            data: this.LineVO.status.疑似
        },
        {
            name: '确诊',
            type: 'line',
            data: this.LineVO.status.确诊
        },
        {
            name: '治愈',
            type: 'line',
            data: this.LineVO.status.治愈,
            color:"yellow"
        },
        {
            name: '死亡',
            type: 'line',
            data: this.LineVO.status.死亡,
            color:"black"
        }
    ]
};
myChart.setOption(option);
        });
        axios.get('http://localhost:8080/empiden/PieVO').then((resp)=>{
    this.PieVo=resp.data
    var option2= {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
     title: {
        text: '物资情况'
    },
    series: [
        {
            name: '物资数量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '25',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: this.PieVo
        }
    ]
};
materialChart.setOption(option2);
})
    },
    methods:{
         
    }
}
</script>
<style>
.gg{
  float: right;
  margin-right: 100px;
}
.right{float: left}
</style>