---
title: vite
category:
  - 工具
tag:
  - 前端构建工具
  - vite
date: 2023-07-10
---

::: tip 总览
Vite是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：
- 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。
Vite 意在提供开箱即用的配置，同时它的 插件 API 和 JavaScript API 带来了高度的可扩展性，并有完整的类型支持。
:::

## 使用
### 创建vue2项目
- vite没有关于vue2的模板，需要自己创建
```sh
npm create vite@latest
```
- 模板选择`Vanilla`
- 安装依赖
```sh
npm install vue@2.6.14 -S
npm install vite-plugin-vue2 -D
```
- 进入项目，新建`vite.config.js`文件
```js
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [
    createVuePlugin()
  ]
}
```
- 删除原来的`main.js`文件
- 修改`index.html`文件
  -  `<script type="module" src="/src/main.js"></script>`
- 新建`src`目录
  - 新建`App.vue`文件
  - 新建`main.js`文件
  ```js
  import Vue from 'vue'
  import App from './App.vue'

  new Vue({
    el: '#app',
    render: h => h(App)
  }).$mount()
  ```
- 运行
```sh
npm run dev
```