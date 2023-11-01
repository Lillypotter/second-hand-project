<template>
  <div class="showcontainer">
    <el-row>
      <el-col
        v-for="(o, index) in useProduct.productList.list"
        :key="o"
        :span="7"
        :offset="1"
      >
        <el-card style="{ padding: '0px' }">
          <img
            :src="JSON.parse(useProduct.productList.list[index].pictureList)[0]"
            class="image"
          />
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button text class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useProductStore } from "../stores/product";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const useProduct = useProductStore();
//侦听器
watch(route, async (to, from) => {
  useProduct.getProductwp(to.query.searchValue);
});
onMounted(() => {
  if (route.query.searchValue) {
    //带参数请求
    useProduct.getProductwp(route.query.searchValue);
  } else {
    useProduct.getProduct();
  }
});
const currentDate = ref(new Date());
</script>

<style scoped lang="scss">
.showcontainer{
  min-height:500px;
  margin-top:55px;

  // display: flex;
  
  .el-row{
    // justify-content: space-around;
    .el-col-offset-1{
      margin-bottom: 4.1%;
      max-width:100%
    }
  }

}
.el-col-offset-1{
      margin-bottom: 4.1%;
      max-width:100%
    }
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}
</style>
