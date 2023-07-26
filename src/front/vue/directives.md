---
title: vue中自定义指令
category:
  - Vue
tag:
  - 指令
date: 2023-07-26
---

::: tip 注册自定义指令
- 一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。
- 钩子函数会接收到指令所绑定元素作为其参数。
:::

## 起步
- 当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：
### 创建全局指令
```js
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})
```
```vue
<input v-focus />
```
### 单页面中
```vue
<script setup>
const vFocus = {
  mounted(el) {
    el.focus()
  }
}
</script>

<template>
  <div>
    <input v-focus/>
  </div>
</template>
```
### directives 注册
```js
const directives = {
    focus: {
        mounted(el) {
            el.focus()
        }
    }
}

const app = Vue.createApp({
    directives: directives,
    template: `
        <div>
            <input v-focus />
        </div>
    `
})
```
## 指令钩子
### 钩子函数
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {},
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```
### 钩子参数
- ```el```：指令绑定到的元素。这可以用于直接操作 DOM。
- ```binding```：一个对象，包含以下属性
  - ```value```： 传递给指令的值
  - ```oldValue```：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用
  - ```arg```：传递给指令的参数
  - ```modifiers```：一个包含修饰符的对象 
  - ```instance```：使用该指令的组件实例
  - ```dir```：指令的定义对象
- ```vnode```：代表绑定元素的底层 VNode
- ```prevNode```：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用
## 简化
- 如果只需要在```mounted```和```updated```上实现，可以直接用函数实现
```vue
<div v-color="color"></div>
```
```js
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})
```