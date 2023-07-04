---
title: 弹性布局
category:
  - Css
tag:
  - flex
date: 2023-06-16
star: 81
order: -4
---

:::tip 前言
flex是一种CSS布局属性，用于在父元素中排列子元素，使其在容器中居中对齐、等宽或根据权重分配空间。
[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
:::
## flex容器
- 创建: 将一个容器的display属性值改为 ==flex== 或者 ==inline-flex==
- 元素排列为一行 (flex-direction 属性的初始值是 row)。
- 元素从主轴的起始线开始。
- 元素不会在主维度方向拉伸，但是可以缩小。
- 元素被拉伸来填充交叉轴大小。
- flex-basis 属性为 auto。
- flex-wrap 属性为 nowrap。
- 元素呈线形排列，并且把自己的大小作为主轴上的大小。
- 如果有太多元素超出容器，它们会溢出而不会换行。
- 如果一些元素比其他元素高，那么元素会沿交叉轴被拉伸来填满它的大小。
## flex基础
主轴(main axis)由 flex-direction 定义，交叉轴(cross axis)垂直于它，flexbox的特性是沿着主轴或交叉轴对齐之中的元素
### flex-direction
- flex-direction: row; 左 -> 右
- flex-direction: row-reverse; 右 -> 左
- flex-direction: column; 上 -> 下
- flex-direction: column-reverse; 下 -> 上
### flex-wrap
- flex-wrap: nowrap; 缩小以适应容器
- flex-wrap: wrap; 子元素换行显示
### flex-flow
- 可以将两个属性 flex-direction 和 flex-wrap 组合为简写属性 flex-flow
- 第一个指定的值为 flex-direction
- 第二个指定的值为 flex-wrap
### 主轴对齐
#### justify-content
- flex-start 从容器的起始线排列
- flex-end 从终止线开始排列
- center 在中间排列 
- space-around 把元素排列好之后的剩余空间拿出来，平均分配到元素之间
- space-between 使每个元素的左右空间相等
- space-evenly 均匀排列每个元素，间隔相等
### 交叉轴对齐
#### align-content
当只有一行情况下不生效
- stretch 默认
- flex-start
- flex-end
- center
- space-around
- space-between
- space-evenly
#### align-items
- stretch 默认
- flex-start
- flex-end
- center
- baseline 向基线对齐
## flex子项
### flex-grow
- 默认值是0，表示flex容器空间剩余时，元素的扩展比例
- flex-grow: 1; 当比例值大于等于1,将占满剩余所有空间,如果有多个子项，则会将剩余空间分成多份进行分配
- flex-grow: 0.5; 自身+剩余空间的50%
- [更多信息](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)
::: normal-demo 示例
```html
<div class="main1">
  <div class="content"></div>
  <div class="content">flex-grow: 1;</div>
  <div class="content"></div>
</div>
<div class="main2">
  <div class="content"></div>
  <div class="content">flex-grow: 0.5;</div>
  <div class="content"></div>
</div>
<div class="main3">
  <div class="content">flex-grow: 1;</div>
  <div class="content">flex-grow: 2;</div>
  <div class="content">flex-grow: 3;</div>
</div>
<div class="main4">
  <div class="content">flex-grow: 0.5;</div>
  <div class="content">flex-grow: 0.5;</div>
  <div class="content">flex-grow: 1;</div>
</div>
```
```css
.main1 , .main2, .main3, .main4 {
  width: 100%;
  height: 80px;
  display: flex;
}
.content {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: 0 5px;
  background: pink;
}
.main1 div:nth-of-type(2) {
  flex-grow: 1;
}
.main2 div:nth-of-type(2) {
  flex-grow: 0.5;
}
.main3 div:nth-of-type(1) {
  flex-grow: 1;
}
.main3 div:nth-of-type(2) {
  flex-grow: 2;
}
.main3 div:nth-of-type(3) {
  flex-grow: 3;
}
.main4 div:nth-of-type(1) {
  flex-grow: 0.5;
}
.main4 div:nth-of-type(2) {
  flex-grow: 0.5;
}
.main4 div:nth-of-type(3) {
  flex-grow: 1;
}
```
:::
### flex-shrink
- 默认值是1，表示flex容器空间不足时，元素的收缩比例
- 1: 自动收缩，跟容器大小相同
- 0.5：收缩超出空间的50%
- [更多信息](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)
::: normal-demo 示例
```html
<div class="main1">
  <div class="content">flex-shrink: 0.5;</div>
</div>
<div class="main2">
  <div class="content">flex-shrink: 1;</div>
  <div class="content">flex-shrink: 2;</div>
</div>
```
```css
.main1, .main2 {
  width: 60%;
  margin-bottom: 10px;
  border: 1px solid red;
  display: flex;
}
.content {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: pink;
}
.content:nth-of-type(2) {
  background: LavenderBlush;
}
.main1 div {
  width: 200%;
  flex-shrink: 0.5;
}
.main2 div:nth-of-type(1) {
  flex-shrink: 1;
}
.main2 div:nth-of-type(2) {
  flex-shrink: 2;
}
```
:::
### flex-basis
- 默认值是auto，指定了flex元素在主轴方向上的初始大小
- 可选值: auto 大小 百分比
- [更多信息](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)
::: normal-demo 示例
```html
<div class="main">
  <div class="content">水平方向</div>
</div>
<div class="main">
  <div class="content">垂直方向</div>
</div>
```
```css
.main {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  border: 1px solid red;
  display: flex;
}
.main:nth-child(1) {
  flex-direction: row;
}
.main:nth-child(2) {
  flex-direction: column;
}
.content {
  width: 100px;
  height: 100px;
  text-align: center;
  background: pink;
  flex-basis: 200px;
}
```
:::
### flex
- flex-grow,flex-shrink,flex-basis的简写
- 设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间
- initial: 元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器。相当于将属性设置为"flex: 0 1 auto"
- auto: 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto"
- none: 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"
- [更多信息](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
### order
- 默认值是0，改变一个flex子项的排序位置
- [更多信息](https://developer.mozilla.org/zh-CN/docs/Web/CSS/order)
::: normal-demo 排序demo
```html
<div class="main">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>
```
```css
.main {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.main div {
  width: 50px;
  height: 50px;
  background: pink;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
}
.main div:nth-of-type(1) {
  order: 5;
}
.main div:nth-of-type(2) {
  order: 3;
}
.main div:nth-of-type(3) {
  order: 2;
}
.main div:nth-of-type(4) {
  order: 1;
}
.main div:nth-of-type(5) {
  order: 4;
}
```
:::
### align-self
- 默认值是auto，控制单独某一个flex子项的垂直对齐方式
- auto: 和父元素的align-items值一样
- [更多信息](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self)
::: normal-demo 更改子项垂直对齐方式
```html
<div class="main">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```
```css
.main {
  width: 100%;
  display: flex;
}
.main div {
  width: 50px;
  height: 50px;
  background: pink;
  margin: 0 10px;
  text-align: center;
}
.main div:nth-of-type(2) {
  height: 20px;
  align-self: flex-end;
}
.main div:nth-of-type(3) {
  height: 20px;
  align-self: center;
}
.main div:nth-of-type(4) {
  height: 20px;
  align-self: flex-start;
}
```
:::
## flex案例
### 子项分组布局
- 使用margin-right: auto;自动占满剩余空间
::: normal-demo 模拟导航栏布局方案
```html
<div class="main">
  <div /><div /><div /><div /><div /><div /><div />
</div>
```
```css
.main {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
}
.main div {
  width: 50px;
  height: 50px;
  background: pink;
  border-radius: 50%;
  margin-right: 10px;
}
.main div:nth-of-type(2) {
  margin-right: auto;
}
.main div:nth-of-type(5) {
  margin-right: auto;
}
```
:::
### 溢出项布局
::: normal-demo 溢出导航条案例
```html
<div class="main">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
  <div>10</div>
  <div>11</div>
  <div>12</div>
</div>
```
```css
.main {
  width: 360px;
  height: 100px;
  margin: auto;
  background: #DDA0DD;
  display: flex;
  align-items: center;
  overflow-y: auto;
}
.main div {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: pink;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
}
.main div:last-child {
  margin-right: 0;
}
```
:::
### 轮播图
![img](https://guo123.top/api/image/file/wallhaven-001.jpg)
![img](https://guo123.top/api/image/file/wallhaven-002.jpg)
![img](https://guo123.top/api/image/file/wallhaven-003.jpg)