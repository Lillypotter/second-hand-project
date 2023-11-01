import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '../apis/index'
// const global = appContext.config.globalProperties
export const useProductStore = defineStore('product', () => {
  //获取列表
  const productList = ref([])
  //获取方法
  const getProduct = async()=>{
    const res= await api.findIdleTiem({
      page: 1,
      nums:8});
    productList.value=res.data;
  }
  const getProductwp=async(findValue)=>{
    // console.log(findValue)
    const res= await api.findIdleTiem({
      page: 1,
      nums:8,
      findValue: findValue
    });
    productList.value=res.data;
  }
  return {
    productList,
    getProductwp,
    getProduct
  }
})
