import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'

const app = createApp(App)
import api from '@/apis/index.js';
app.config.globalProperties.$api = api;

//用户信息
let globalData={
    userInfo:{
        nickname:''
    }
};
app.config.globalProperties.$globalData=globalData;

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
