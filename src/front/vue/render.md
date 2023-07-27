---
title: 使用render函数渲染节点
category:
  - Vue
tag:
  - render
date: 2023-07-27
---

::: tip 介绍
- ```render``` 是用于编程式地创建组件虚拟 DOM 树的函数
- ```render``` 是字符串模板的一种替代，可以使你利用 JavaScript 的丰富表达力来完全编程式地声明组件最终的渲染输出
:::

## 基本用法
### 创建 Vnodes
- Vue 提供了一个 h() 函数用于创建 vnodes：
- ```h()``` 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。这个名字来源于许多虚拟 DOM 实现默认形成的约定。一个更准确的名称应该是 ```createVnode()```，但当你需要多次使用渲染函数时，一个简短的名字会更省力。
```js
const vnode = h(
    'div', // 标签
    {}, // props
    [] // children
)
```
### 示例
在main.js中创建一个组件，由render渲染
- 在这里```$slots```表示父组件所传入插槽的对象,每一个插槽都在 ```this.$slots``` 上暴露为一个函数，返回一个 ```vnode``` 数组，同时 key 名对应着插槽名。默认插槽暴露为 ```this.$slots.default()```。
```js
app.component('my-render', {
    render() {
        return h(
            'div',
            {},
            this.$slots.default(),
            h(
                'p',
                {
                    class: 'title',
                    style: {
                        color: 'red'
                    },
                    innerHTML: 'Hello'
                }
            )
        )
    }
})
```
使用
```vue
<my-render>
    使用render
</my-render>
```
渲染结果
```html
<div> 
    使用render 
    <p class="title" style="color: red;">
        Hello
    </p>
</div>
```