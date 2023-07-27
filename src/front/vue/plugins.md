---
title: 插件
category:
  - Vue
tag:
  - plugin
date: 2023-07-27
---

## 介绍
- 插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码
- 一个插件可以是一个拥有 ```install()``` 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 ```app.use()``` 的额外选项作为参数
```js
const myPlugin = {
    install(app, options) {
        console.log(app) // app实例
        console.log(options) // { name: '自定义插件' }
    }
}

app.use(myPlugin, {
    name: '自定义插件'
})
```
- 插件发挥作用的常见场景主要包括以下几种:
  1. 通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令
  2. 通过 app.provide() 使一个资源可被注入进整个应用
  3. 向 app.config.globalProperties 中添加一些全局实例属性或方法

## Provide / Inject
- 可以通过 ```provide``` 来为插件用户供给一些内容
```js
const myPlugin = {
    install(app, options) {
        app.provide('name', '自定义插件')
    }
}
```
- 通过```inject```访问
```vue
<script setup>
import { inject } from 'vue';

const name = inject('name')
</script>
```