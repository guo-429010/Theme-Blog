---
title: 使用vite自动生成vue路由
category:
  - Vue
tag:
  - vite
date: 2023-07-18
---

::: tip 全新的路由组织方式
- 以往编写路由都需要手动编写router.js代码，其实很多代码是重复的
- 新的方案根据文件夹目录结构自动生成
- 文件夹下的 index.vue -> /
:::

## 初始化项目
### 构建
```js
npm init vue@latest
```
![项目构建](../../.vuepress/public/assets/images/vue_001.png)
### 运行
```js
npm run dev
```
![项目运行](../../.vuepress/public/assets/images/vue_002.png)
### 项目结构
- 一个文件夹对应一个路由
- page.js用来填写配置信息
```js
export default {
    title: ''
}
```
![项目结构](../../.vuepress/public/assets/images/vue_003.png)

## Glob导入
- Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块
- 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk
### 获取路由相关配置
```js
const pages = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default'
})
const pageComps = import.meta.glob('../views/**/index.vue')
```
- pages
```js
{
    "../views/page.js": {
        "title": "主页"
    },
    "../views/pageOne/page.js": {
        "title": "页面一"
    },
    "../views/pageTwo/page.js": {
        "title": "页面二"
    }
}
```
- pageComps

![pageComps](../../.vuepress/public/assets/images/vue_004.png)
### 生成路由
```js
const routes = Object.entries(pages).map(([path,meta]) => {
  const pathJSPath = path
  path = path.replace('../views','').replace('/page.js','') || '/'
  const name = path.split('/').filter(Boolean).join('-') || 'index'
  const comPath = pathJSPath.replace('page.js','index.vue')
  return {
    path,
    name,
    component: pageComps[comPath],
    meta
  }
})
```

![routes](../../.vuepress/public/assets/images/vue_005.png)

::: warning 总结
通过以上代码已经实现路由自动生成，但该方式不能生成嵌套路由
:::

## 嵌套路由实现
### 修改page.js
```js
export default {
  // 标题
  title: '',
  // 路由层级
  index: 0,
  // 是否存在子路由
  isChild: true,
  // 父级路由的path
  parent: ''
}
```
### 创建生成路由对象方法
```js
const initObj = (path, meta) => {
  const pathJSPath = path
  path = path.replace('../views', '').replace('/page.js', '') || '/'
  const name = path.split('/').filter(Boolean).join('-') || 'index'
  const comPath = pathJSPath.replace('page.js', 'index.vue')
  const value = {
      path,
      name,
      component: pageComps[comPath],
      meta
  }
  if(meta.isChild) {
    value.children = []
  }
  return value
}
```
### 对pages进行排序
```js
// 创建map对象
const sortPages = new Map()
// 根据index排序
const sortKey = Object.keys(pages).sort((a, b) => pages[a].index - pages[b].index)
// 添加到map
sortKey.forEach(key => {
  sortPages.set(key, pages[key])
})
```
### 遍历
```js
const routes = []
for(let [path, meta] of sortPages.entries()) {
  // 第一层路由直接添加
  if(meta.index == 0) {
    routes.push(initObj(path,meta))
  }
  // 第二层路由先获取上级节点
  if(meta.index == 1) {
    const parentIndex = routes.findIndex(item => item.path == meta.parent)
    if(parentIndex != -1) {
      routes[parentIndex].children.push(initObj(path,meta))
    }
  }
  // 根据meta.parent获取父节点信息，重复第二层的操作
  if(meta.index == 2) {
    const page = pages[`../views${meta.parent}/page.js`]
    const oneParentIndex = routes.findIndex(item => item.path == page.parent)
    const twoParentIndex = routes[oneParentIndex].children.findIndex(item => item.path == meta.parent)
    if(twoParentIndex != -1) {
      routes[oneParentIndex].children[twoParentIndex].children.push(initObj(path,meta))
    }
  }
}
```
### 文件结构
![文件结构](../../.vuepress/public/assets/images/vue_006.png)
### 生成效果
![路由结构](../../.vuepress/public/assets/images/vue_007.png)