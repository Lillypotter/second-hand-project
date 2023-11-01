import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 配置elementplus采用sass样式配色系统
        ElementPlusResolver({importStyle:"sass"})
      ],
    }),
    vue(),
  ],
  server: {
    host: '0.0.0.0', //ip地址
    port: 8081 //端口号
    // open: true //启动后是否自动打开浏览器
  },
  // server: {
  //   // port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080', // 实际请求地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
        
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:
        `@use "@/styles/element/index.scss" as *;
         @use "@/styles/var.scss" as *;        
        `
      }
    }
  }
})
