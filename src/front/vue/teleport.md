---
title: Teleport传送门
category:
  - Vue
tag:
  - Teleport
date: 2023-07-26
---

:::tip 介绍
- ```<Teleport>``` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去
- ```<Teleport>``` 接收一个 ```to``` prop 来指定传送的目标。```to``` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象
:::

## 示例
- modal传送到了body下
```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```
## 禁用
```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```