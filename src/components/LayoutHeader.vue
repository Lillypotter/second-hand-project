<script setup>
import { onMounted, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useScroll } from "@vueuse/core";
const { y } = useScroll(window);
const categoryList = ref([]);
const res = [
  {
    name: "数码",
  },
  {
    name: "家电",
  },
  {
    name: "户外",
  },
  {
    name: "图书",
  },
  {
    name: "其他",
  },
];
//搜索参数
const searchValue = ref("");
// 搜索方法
const router = useRouter();
const searchIdle = () => {
  // console.log("search")
  // 用query携带参数
  router.push({ path: "/show", query: { searchValue: searchValue.value } });
};
onMounted(() => {
  categoryList.value = res;
  console.log("categoryList", categoryList.value);
});
const handleNav = (item) => {
  console.log("item", item.name);
  router.replace({path: "/show", query: { searchValue: item.name} });
};

</script>

<template>
  <header :class="y > 78 ? 'app-header-fiexed' : 'app-header'">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/show">二手平台网站</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/show">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoryList" :key="item.name">
          <div @click="handleNav(item)">{{ item.name }}</div>
        </li>
      </ul>
      <div class="search">
        <el-input
          clearable
          placeholder="搜物品..."
          v-model="searchValue"
          @keyup.enter.native="searchIdle"
        >
          <template #append>
            <el-button :icon="Search" @click="searchIdle" />
          </template>
        </el-input>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header-fiexed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: block;
  z-index: 9999;
  height: 80px;
  .container {
    display: flex;
    justify-content: flex-end;

    .logo {
      width: 60px;
      flex: 1;
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
      flex: 2;
      text-align: left;
      margin-top: 18px;
      color: $xtxColor;
      li {
        font-size: 16px;
        margin-right: 14px;
      }
    }
    .search {
      margin-top: 18px;
      i {
        font-size: 16px;
        margin-right: 2px;
      }
    }
  }
}

.app-header {
  height: 80px;
  border-bottom: $xtxColor solid 5px;
  margin-bottom: 15px;
  .container {
    display: flex;
    justify-content: flex-end;

    .logo {
      width: 60px;
      flex: 1;
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
      flex: 2;
      text-align: left;
      margin-top: 18px;
      color: $xtxColor;
      li {
        font-size: 16px;
        margin-right: 14px;
      }
    }
    .search {
      margin-top: 18px;
      i {
        font-size: 16px;
        margin-right: 2px;
      }
    }
  }
}
</style>