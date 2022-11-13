import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/login.vue'
Vue.use(VueRouter)

const routes = [
      //配置默认的路径，默认显示登录页
      { path: '/', meta:false, component: () => import('../views/login.vue')},

  {
    path: "/Index",
    name:"人员信息管理",
    component:Index,
    meta:true,
    children:[
      {
        path:"/IdenManage",
        name:"健康人员信息",
        component:() => import(/* webpackChunkName: "BlogManage" */ '../views/IdenManage.vue')
        //const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
      },
      {
        path:"/IsManage",
        name:"隔离人员信息",
        component:()=>import(/* webpackChunkName:"AddBlog" */ '../views/IsManage.vue')
      }
    ]
  },
  {
    path: "/Index",
    name:"核酸检测管理",
    component:Index,
    meta:true,
    children:[
      {
        path:"/Appointment",
        name:"核酸预约信息",
        component:() => import(/* webpackChunkName: "BlogManage" */ '../views/Appointment.vue')
        //const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
      },
      {
        path:"/Report",
        name:"核酸报告管理",
        component:()=>import(/* webpackChunkName:"AddBlog" */ '../views/Report.vue')
      }
    ]
  },
  {
    path: "/Index",
    name:"无",
    component:Index,
    meta:false,
    children: [
      {
        path:"/AddMaterial",
        name:"新增防疫物资",

        component:()=>import(/* webpackChunkName:"AddMaterial" */ '../views/AddMaterial.vue'),

      },
      {
        path: "/EChart",
        name:"首页",
        component:()=>import(/* webpackChunkName:"AddMaterial" */ '../views/EChart.vue'),
      },
      {
        path:"/AddRecord",
        name:"医护人员管理",
        component:()=>import('../views/AddRecord.vue')
      },
    ]
  },
  {
    path: "/Index",
    name:"物资管理",
    component:Index,
    meta:true,
    children:[{
      path:"/MaterialManage",
      name:"疫情物资管理",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/MaterialManage.vue') 
    }
      ,{
        path:"/Waste",
        name:"医疗废物处理  ",
        component:()=>import(/* webpackChunkName:"AddMaterial" */ '../views/Waste.vue')
      }
  ]
  },
  {
    path: "/Index",
    name:"疫情报表管理",
    component:Index,
    meta:true,
    children:[{
      path:"/Local",
      name:"疫情每日汇报",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/Local.vue')
    },{
      path:"/Iden",
      name:"隔离人员状态",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/Iden.vue')
    },{
      path:"/Temperature",
      name:"每日体温上报",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/Temperature.vue')
    },{
      path:"/Disinfect",
      name:"每日消毒汇报",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/Disinfect.vue')
    }
    ]
  },

  {
    path: "/Index",
    name:"系统设置",
    component:Index,
    meta:true,
    children:[
      {
        path:"/User",
        name:"用户管理",
        component:()=>import('../views/User.vue')
      },
      {
        path:"/User",
        name:"医护人员管理",
        component:()=>import('../views/User.vue')
      },
      {
        path:"/RecordManage",
        name:"公告管理",
        component:() => import('../views/RecordManage.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
