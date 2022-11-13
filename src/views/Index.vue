<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>

<!--    <icon-svg name="user" ></icon-svg>-->
    <img src="../icons/svg/header.jpg" class="header"/>
    <el-container style="height: 100%; border: 1px solid #eee">

      <el-aside :style="{ width,height }">
        <el-menu router :default-active='$route.path' @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item  index="/EChart"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
          <el-submenu v-for="(item,index) in router" :index="index+''" :key="index">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :key="index2"
            >{{ item2.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="container">

        <el-main>
<!--          <Header />-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>
<script>

import Header from '../components/headers/index.vue'
export default {

  props:{
    width: {
      default:'auto'
    },
    height: {
      default: '600px'
    }
  },
  components: {
    Header
  },

  data() {
    return {
      currentMenu: '',
      router: "",
      isCollapse:false
    }
  },
  created() {
    this.router = this.$router.options.routes.filter(i => {
      return i.meta
    })
  },
  name: 'index',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}

</script>
<style>

.container {

  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  height: 600px;
}
.header{
  float: right;
  width:40px;
  border:1px solid #cbc2c2;
  border-radius:25px

}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}

</style>