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