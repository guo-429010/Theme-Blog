---
title: 独特的输入框
category:
  - Css
tag:
  - input
date: 2023-06-05
star: 62
order: -1
---

## 输入框No.1
- 输入框聚焦出现label和底部蓝色线条
- 使用required结合.input-field:valid让输入框有值的时候保持label和底部线条的显示
- pattern="\S+.*"：若输入框只输入空格，则验证失败
::: normal-demo 演示

```html
<div class="input-container">
  <input placeholder="请输入用户名" class="input-field" type="text" required pattern="\S+.*">
  <label for="input-field" class="input-label">UserName</label>
  <span class="input-highlight"></span>
</div>
```

```css
.input-container {
  position: relative;
  margin: 20px;
}

.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  caret-color: #007bff;
  background-color: transparent;
  box-sizing: border-box;
}

.input-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: rgba(204, 204, 204, 0);
  pointer-events: none;
  transition: all 0.3s ease;
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #007bff;
  transition: all 0.3s ease;
}

.input-field:focus + .input-label,
.input-field:valid + .input-label {
  top: -20px;
  font-size: 12px;
  color: #007bff;
}

.input-field:focus + .input-label + .input-highlight,
.input-field:valid + .input-label + .input-highlight {
  width: 100%;
}
```
:::