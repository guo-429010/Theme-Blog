---
title: Koa文件上传并回显
category:
  - JavaScript
  - node.js
tag:
  - koa
date: 2023-08-21
---

## 上传
### 依赖安装
```sh
npm install koa-body
```
### 引入
```js
const { koaBody } = require('koa-body')
```
### 注册
- uploadDir
  - 文件上传的目录
- onFileBegin
  - name：字段名
  - file：文件对象
  - 回调函数，用于修改文件名
```js
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../uploads'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      const ext = path.extname(file.newFilename);
      file.filepath = path.join(__dirname, '../uploads/') + Date.now() + ext;
    }
  }
}))
```
### 使用
```js
router.post('/upload', ctx => {
  const file = ctx.request.files.file
})
```
## 回显
### 依赖安装
- 静态资源中间件
```sh
npm install koa-static
```
### 引入
```js
const koaStatic = require('koa-static')
```
### 注册
- 配置文件路径
- 配置项
  - maxage
    - 浏览器缓存时间
  - hidden
    - 是否传输隐藏文件,默认：false
  - index
    - 默认文件名
  - gzip
    - 是否支持gzip压缩
  - defer
    - 是否延迟传输
  - setHeaders
    - 设置响应头
```js
app.use(koaStatic(path.join(__dirname, '../uploads')), { 
  maxAge: 60
})
```
### 使用
- 访问```http://localhost:3000/${fileName}```
- 上传成功后返回文件地址
```js
router.post('/upload', ctx => {
  const file = ctx.request.files.file
  const basename = path.basename(file.filepath)
  ctx.body = {
    url: `${ctx.origin}/${basename}`
  }
})
```