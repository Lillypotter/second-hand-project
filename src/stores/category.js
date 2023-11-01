import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  //获取列表
  const categoryList = ref([])
  const getCategory = async()=>{
    const res= await getCategory();
    categoryList=res.data;
  }
  return {
    categoryList,
    getCategory
  }
})
