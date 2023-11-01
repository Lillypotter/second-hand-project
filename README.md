# vue-rabbit

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

Project Setup

```sh

npm install vue@latest
```

### 项目架构

vue3+elementPlus（通用型）+业务定制化组件

#### 1.定制elementPlus的主题色，通过sass

变量 SCSS允许使用变量来存储颜色、字体、尺寸等常用值,实现在整个样式表中重复使用,用自定义的颜色替换element中的默认颜色.

SCSS允许在一个选择器内嵌套另一个选择器,以减少代码的嵌套层级。

SCSS提供了混合器的功能，可以定义一组样式，并在需要的地方进行重用

#### 2.搭建通用型组件header+nav+footer

#### 3.虚拟一级列表的数据

首页，美食，服饰，电器，家居，药品，潮玩，卡券，租房

#### 4.固定导航栏

要求：浏览器在上下滚动的过程中，如果距离顶部的滚动距离大于78px，吸顶导航显示，小于78px隐藏

1.获取滚动距离

   用Vueuse插件,const {y} = useScroll(window)

2.用滚动距离来切换样式

fixed,top:0,bottom:0

#### 5.完成搜索，页面产品展示，物品发布，个人中心的版块
