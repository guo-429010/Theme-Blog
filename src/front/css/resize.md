---
title: 分栏宽度拉伸
category:
  - Css
tag:
  - resize
  - 拖动
  - 拉伸
date: 2023-07-04
order: 1
---

::: normal-demo 示例
```html
<div class="column">
    <div class="column-left">
        <div class="resize-bar"></div>
        <div class="resize-line"></div>
        <div class="resize-save">
            CSS中有一个resize属性，如果一个元素的overflow属性值不是visible，则通过设置resize属性可以拉伸这个元素尺寸。
        </div>                                            
    </div>
    <div class="column-right">
        resize属性的拖拽bar和滚动条的拖拽bar是一个体系里面的东西，只需要对滚动条进行自定义，就能间接设置resize bar的尺寸。<br/>
        把这个拖拽区域藏在某一栏布局的后面，然后透出部分宽度可以用来拖拽
    </div>
</div>
```
```css
.column {
    overflow: hidden;
    width: 100%;
    border: 1px solid red;
}
.column-left {
    height: 200px;
    background-color: #fff;
    position: relative;
    float: left;
    background: #F5FFFA;
}
.column-right {
    height: 200px;
    padding: 16px;
    background-color: #F5F5DC;
    box-sizing: border-box;
    overflow: hidden;
}
.resize-save {
    position: absolute;
    top: 0; right: 5px; bottom: 0; left: 0;
    padding: 16px;
    overflow-x: hidden;
}
.resize-bar {
    width: 200px; 
    height: inherit;
    resize: horizontal;
    cursor: ew-resize;
    cursor: col-resize;
    opacity: 0;
    overflow: scroll;
}
/* 拖拽线 */
.resize-line {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    border-right: 2px solid #eee;
    border-left: 1px solid #bbb;
    pointer-events: none;
}
.resize-bar:hover ~ .resize-line,
.resize-bar:active ~ .resize-line {
    border-left: 1px dashed skyblue;
}
.resize-bar::-webkit-scrollbar {
    width: 200px; height: inherit;
}

@supports (-moz-user-select: none) {
    .resize-bar:hover ~ .resize-line,
    .resize-bar:active ~ .resize-line {
        border-left: 1px solid #bbb;
    }
    .resize-bar:hover ~ .resize-line::after,
    .resize-bar:active ~ .resize-line::after {
        content: '';
        position: absolute;
        width: 16px; height: 16px;
        bottom: 0; right: -8px;
        background-size: 100% 100%;
    }
}
```
:::