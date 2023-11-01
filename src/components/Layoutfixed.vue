<script setup>
import { onMounted, reactive,ref } from "vue";
import { useScroll } from '@vueuse/core'
const categoryList=ref([])
const res=[
    {
        name:'美食'
    },
    {
        name:'家居'
    },
    {
        name:'电器'
    },
    {
        name:'书本'
    },
    {
        name:'卡券'
    },
    {
        name:'潮玩'
    }
]
const {y} = useScroll(window)

import { Search } from '@element-plus/icons-vue'
import api from '../apis/index'
import { useRouter } from 'vue-router'

onMounted(()=>{
    categoryList.value=res
    console.log("categoryList",categoryList.value)
})
//搜索参数
const searchValue=ref('')
// 搜索方法
const router = useRouter()
const searchIdle=()=>{
  // console.log("search")
  // 用query携带参数
  router.push({path:'/show',query:{searchValue:searchValue.value}})
}
onMounted(()=>{
    categoryList.value=res
    console.log("categoryList",categoryList.value)
})

</script>

<template>
  <div class="app-header-sticky " :class="{show:y>78}" >
    
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">二手平台网站</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoryList" :key="item.name">
          <RouterLink to="/">{{item.name}}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <el-input clearable placeholder="搜物品..." v-model="searchValue" @keyup.enter.native="searchIdle">
          <template #append>
            <el-button :icon="Search" @click="searchIdle"/>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header-sticky {
  padding: 2rem;
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 状态1：往上平移自身高度+完全透明；
  transform: translate(-100%);
  opacity: 0;
  // 状态2：不平移+不透明；
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    justify-content: flex-end;
   
    .logo {
      width: 60px;
      flex:1;
      text-align: left;
      a {
        display: block;
        height: 132px;
        width: 100%;
        // text-indent:-9999px;
        // background: url('@/assets/images/logo/pgn') no-repeat center 18px ;
      }
    }
    .app-header-nav {
        list-style: none;
        display: flex;
        // justify-content: flex-end;
        flex:2;
        text-align: left;
        margin-top: 18px;
        li{
            font-size: 16px;
            margin-right: 14px;
        }
    }
    .search{
        margin-top: 18px;
        i{
            font-size: 16px;
            margin-right:2px
        }
    }
  }

}
</style>