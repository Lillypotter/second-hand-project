<script setup>
import api from '../apis/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const logout=()=>{
  api.logout({}) 
        .then((res) => {
          if (res.status_code === 1) {
            localStorage.setItem("adminName", "");
            localStorage.setItem("isLogin", false);
            router.push('/login')
          }
          console.log("res",res)
        })
        .catch((err) => {
          console.log(err);
        });
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="true">
          <li>
            <div class="el-dropdown-link">
              <a href="/mycenter"><i class="iconfont icon-user"></i>周杰伦</a>
            </div>
          </li>
          <li>
            <el-popconfirm title="是否确定退出登录?" @confirm="logout">
              <template #reference>
                <el-button >退出登录</el-button>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="/publish">物品发布</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  margin-right: 15px;
  
}

.app-topnav {
  //  display: block;
  //  height: 70px;
  //  margin-top:10px;
  .container {
    .el-button{
       background-color:#c6efe9
    }
    ul {
      display: flex;
      height: 53px;
      justify-content: flex-end;
      align-items: center;
    }
    li {
      list-style: none;
      a {
        padding: 0 15px;
        color: #222020;
        // line-height: 1;
        display: inline-block;
      }
      i {
        font-size: 14px;
        margin-right: 2px;
      }
      &:hover {
        color: $xtxColor;
      }
    }
    ~ li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>