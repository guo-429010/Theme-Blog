---
title: 基础布局
category:
  - Css
tag:
  - 盒模型
  - 浮动
  - BFC
  - position
date: 2023-06-05
star: 80
order: -3
---

## 盒子模型
### 标准盒模型
在标准模型中，如果你给盒设置width 和height，实际设置的是content box。padding和border再加上设置的宽高一起决定整个盒子的大小。
### 怪异盒模型
在怪异模型中，所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。
### box-sizing
```css
box-sizing: content-box; // width、height -> content
box-sizing: border-box; // width、height -> content + padding + border
```
## 浮动
- 当元素被浮动时，会脱离文档流，根据float的值向左或向右移动，直到它的外边界碰到父元素的内边界或另一个浮动元素的外边界为止，是CSS布局中实现左右布局的一种方式。
- 文档流是元素在Web页面上的一种呈现方式，按照出现的先后顺序进行排列。
### 创建浮动
::: normal-demo 原布局
```html
<div class="box">
    <div class="one"></div>
    <div class="two"></div>
</div>
```
```css
.box{
    border: 1px solid #000;
}
.one{
    width: 100px;
    height: 100px;
    background-color: pink;
}
.two{
    width: 50px;
    height: 50px;
    background-color: tomato;
}
```
:::
::: normal-demo 粉盒子添加左浮动
```html
<div class="box">
    <div class="one"></div>
    <div class="two"></div>
</div>
```
```css
.box{
    border: 1px solid #000;
}
.one{
    width: 50px;
    height: 50px;
    background-color: pink;
    float: left;
}
.two{
    width: 100px;
    height: 100px;
    background-color: tomato;
}
```
:::
::: normal-demo 橙盒子添加右浮动
```html
<div class="box">
    <div class="one"></div>
    <div class="two"></div>
</div>
```
```css
.box{
    border: 1px solid #000;
}
.one{
    width: 50px;
    height: 50px;
    background-color: pink;
    float: left;
}
.two{
    width: 100px;
    height: 100px;
    background-color: tomato;
    float: right;
}
```
:::
### 清除浮动
- clear属性
```css
clear: left;
clear: right;
clear: both;
```
- [BFC](#bfc块级格式化上下文)
```css
overflow: hidden;
display: inline-block;
position: absolute;
position: fixed;
display: table-cell;
display: flex;
```
- 空标签
```html
<div class="box">
    <div class="one"></div>
    <div style="clear:both;"/>
    <div class="two"></div>
</div>
```
- clearfix::after{}
```css
.box::after{
    content: "";
    clear: both;
    display: block;
}
```
### 特性
- 浮动只会影响后续的盒子
- 文本不会被浮动元素覆盖
- 具备内联盒子特性，宽度由内容决定
- 具备块级盒子特性，支持所有样式
- 当内容超出会自动换行
## 定位
position属性用于指定一个元素在文档中的定位方式
### relative-相对定位
- 相对定位的元素是在文档中的正常位置偏移给定的值
- 不影响其他元素布局
- 相对于自身进行偏移
### absolute-绝对定位
- 绝对定位的元素脱离了文档流，绝对定位元素不占据空间
- 具备内联盒子特性，宽度由内容决定
- 具备块级盒子特性，支持所有样式
- 绝对定位元素相对于最近的非static祖先元素定位。当这样的祖先元素不存在时，则相对于可视区定位
### static-静态定位
- HTML 元素默认情况下的定位方式为 static 
- 静态定位的元素不受 top、bottom、left 和 right 属性的影响。 
- position: static;的元素不会以任何特殊方式定位,它始终根据页面的正常流进行定位
### sticky-黏性定位
- 粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位
### fixed-固定定位
- 固定定位与绝对定位相似，但是会固定在可视区中
- 具备内联盒子特性，宽度由内容决定
- 具备块级盒子特性，支持所有样式
- 不会受到祖先元素影响
## BFC块级格式化上下文
### 概念
- BFC即Block FormattingContexts(块级格式化上下文)，它是W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
- 具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。
- 通俗一点来讲，可以把BFC理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
### 触发条件
- float的值不是none
- position的值不是static或者relative
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex
- overflow的值不是visible
### 应用
- 解决传递和叠加，让盒子形成一个独立的容器，无论子元素如何都不影响外面的元素。
- 解决高度塌陷问题，不管里面子元素是否浮动，都不会因为脱离文档流对容器高度造成影响。
- 在现代布局flex和grid中，是默认自带BFC规范的，所以可以解决非BFC盒子的一些问题，这就是为什么flex和grid能成为更好的布局方式原因之一。