---
title: 响应式布局
category:
  - Css
tag:
  - 媒体查询
  - 响应断点
  - 栅格
  - bootstrap
date: 2023-07-10
order: -7
---

## 媒体查询
### 1. 媒体类型
- all：适用于所有设备
- print：适用于在打印预览模式
- screen：主要用于屏幕
- speech：主要用于语音合成器
### 2.媒体特性
- 描述了user agent、输出设备，或是浏览器环境的具体特征
- width: viewport的家度
- height: viewport的高度
- aspect-ratio: viewport的宽高比
- orientation: viewport的旋转方向
### 3.逻辑操作符
- 逻辑操作符 (logicaloperators) not, and,和 only可用于联合构造复杂的媒体查询
- and: 用于将多个媒体查询规则组合成单条媒体查询
- not: 用于否定媒体查询，如果不满足这个条件则返回true，否则返回false
- only: 用于旧版浏览器识别媒体类型使用
- 逗号: 用于将多个媒体查询合并为一个规则
### 4.link标签方式
- 通过media属性设置媒体查询类型和媒体特性
```css
<link rel="stylesheet" href="" media="" />
```
### 5.编写位置及顺序
- 添加到样式表的底部，对CSS进行优先级的覆盖
- 移动端 -> PC端的适配原则: min-width从小到大
- PC端 -> 移动端的适配原则: max-width从大到小
### 6.响应断点（阈值）的设定
- Extra small < 576px
- Small > 576px，-sm
- Medium >768px，-md
- Large > 992px，-lg
- X-Large>1200px，-xl
- XX-Large ≥1400px，-xxl
```css
.box {

}
@media (min-width: 576px) {
    .box-sm {

    }
}
@media (min-width: 768px) {
    .box-md {

    }
}
@media (min-width: 992px) {
    .box-lg {

    }
}
@media (min-width: 1200) {
    .box-xl {

    }
}
@media (min-width: 1400) {
    .box-xxl {

    }
}
```
### 7.响应式栅格系统
- 栅格布局 + 断点设定
```css
grid-area: auto / auto / auto / span 1;
@media (min-width: 576px) {
    grid-area: auto / auto / auto / span 2;
}
@media (min-width: 768px) {
    grid-area: auto / auto / auto / span 3;
}
@media (min-width: 992px) {
    grid-area: auto / auto / auto / span 4;
}
@media (min-width: 1200) {
    grid-area: auto / auto / auto / span 5;
}
@media (min-width: 1400) {
    grid-area: auto / auto / auto / span 6;
}
```
## 响应式交互实现
### 利用 :checked 伪类
::: normal-demo 使用checked点击实现
```html
<label for="menu">
    <span>
        菜单
    </span>
</label>
<input id="menu" type="checkbox"/>
<ul>
    <li>Lorem, ipsum dolor.</li>
    <li>Nemo, omnis perspiciatis?</li>
    <li>Aspernatur, debitis minima!</li>
</ul>
```
```css
ul {
    display: none;
}
input {
    display: none;
}
input:checked + ul {
    display: block;
}
@media screen and (min-width: 700px) {
    ul {
        display: block;
    }

}
```
:::
### 利用 JavaScript 脚本
::: normal-demo 使用js点击实现
```html
<span id="menu">菜单</span>
<ul id="ulBox">
    <li>Lorem, ipsum dolor.</li>
    <li>Nemo, omnis perspiciatis?</li>
    <li>Aspernatur, debitis minima!</li>
</ul>
```
```css
ul {
    display: none;
}
@media screen and (min-width: 700px) {
    ul {
        display: block;
    }
}
```
```js
const menu = document.getElementById('menu')
const ul = document.getElementById('ulBox')
menu.addEventListener('click', () => {
    // if(document.body.clientWidth > 700) return
    ul.style.display =  ul.style.display == 'block' ? 'none' : 'block'
})
```
:::
## 响应式框架Bootstrap
- Bootstrap是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的WEB项目。
- Bootstrap框架是基于jquery库来设计的，所以除了在html文件中引入Bootstrap相关文件外，还需要引入jquery.js文件，并需要确保文件的引入顺序，具体引入方式如下：
```html
<link rel="stylesheet" href="./bootstrap.css">
<script src="./jquery.js"></script>
<script src="./bootstrap.js"></script>
```
- [更多信息](https://getbootstrap.com/)