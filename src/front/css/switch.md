---
title: 独特风格开关
category:
  - Css
tag:
  - checkbox
  - switch
date: 2023-06-02
star: true
---

## 凸起开关
- 这是一个纯css实现的现实风格开关
::: normal-demo 开关演示

```html
<label class="rocker rocker-small">
    <input type="checkbox">
    <span class="switch-left">Yes</span>
    <span class="switch-right">No</span>
</label>
```

```css
.rocker {
  display: inline-block;
  position: relative;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #888;
  width: 7em;
  height: 4em;
  overflow: hidden;
  border-bottom: 0.5em solid #eee;
}

.rocker-small {
  font-size: 0.75em;
  margin: 1em;
}

.rocker::before {
  content: "";
  position: absolute;
  top: 0.5em;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  border: 0.5em solid #eee;
  border-bottom: 0;
}

.rocker input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-left,
.switch-right {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  width: 3em;
  transition: 0.2s;
  user-select: none;
}

.switch-left {
  height: 2.4em;
  width: 2.75em;
  left: 0.85em;
  bottom: 0.4em;
  background-color: #ddd;
  transform: rotate(15deg) skewX(15deg);
}

.switch-right {
  right: 0.5em;
  bottom: 0;
  background-color: #bd5757;
  color: #fff;
}

.switch-left::before,
.switch-right::before {
  content: "";
  position: absolute;
  width: 0.4em;
  height: 2.45em;
  bottom: -0.45em;
  background-color: #ccc;
  transform: skewY(-65deg);
}

.switch-left::before {
  left: -0.4em;
}

.switch-right::before {
  right: -0.375em;
  background-color: transparent;
  transform: skewY(65deg);
}

input:checked + .switch-left {
  background-color: #0084d0;
  color: #fff;
  bottom: 0px;
  left: 0.5em;
  height: 2.5em;
  width: 3em;
  transform: rotate(0deg) skewX(0deg);
}

input:checked + .switch-left::before {
  background-color: transparent;
  width: 3.0833em;
}

input:checked + .switch-left + .switch-right {
  background-color: #ddd;
  color: #888;
  bottom: 0.4em;
  right: 0.8em;
  height: 2.4em;
  width: 2.75em;
  transform: rotate(-15deg) skewX(-15deg);
}

input:checked + .switch-left + .switch-right::before {
  background-color: #ccc;
}

input:focus + .switch-left {
  color: #333;
}

input:checked:focus + .switch-left {
  color: #fff;
}

input:focus + .switch-left + .switch-right {
  color: #fff;
}

input:checked:focus + .switch-left + .switch-right {
  color: #333;
}
```

:::

## 带动画的单选
- 用css将checkbox改造成单选眼睛框，用animation添加动画
::: normal-demo 单选演示

```html
<label class="container">
  <input checked="checked" type="checkbox">
  <div class="checkmark"></div>
</label>
```

```css
.container input {
 position: absolute;
 opacity: 0;
 cursor: pointer;
 height: 0;
 width: 0;
}

.container {
 display: block;
 position: relative;
 cursor: pointer;
 font-size: 20px;
 user-select: none;
}

.checkmark {
 position: relative;
 top: 0;
 left: 0;
 height: 1.4em;
 width: 1.4em;
 border: 2px solid #2196F3;
 border-radius: 1rem 0rem 1rem;
 transform: rotate(45deg);
 transition: all .5s ease-in-out;
}

.container input:checked ~ .checkmark {
 box-shadow: 0px 0px 20px 3px #2196F3;
 border-radius: 1rem 0rem 1rem;
 background-color: #2195f31f;
}

.checkmark:after {
 content: "";
 position: absolute;
 display: none;
}

.container input:checked ~ .checkmark:after {
 display: block;
}

.container .checkmark:after {
 left: 0.35em;
 top: 0.20em;
 width: 0.25em;
 height: 0.5em;
 border: solid #2196F3;
 border-width: 0 0.15em 0.15em 0;
 transform: rotate(-5deg);
 animation: upAnimate 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes upAnimate {
 from {
  transform: translate(-20px, -20px) rotate(-5deg);
  opacity: 0;
 }

 to {
  transform: translate(0, 0) rotate(-5deg);
  opacity: 1;
 }
}
```

:::