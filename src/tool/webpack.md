---
title: webpack
category:
  - 工具
tag:
  - 前端构建工具
  - webpack
date: 2023-07-10
---

## 概念
::: tip webpack基本概念
本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

[官方文档](https://www.webpackjs.com/concepts/)
:::
### entry
入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
```js
module.exports = {
    entry: './src/index.js'
}
```
### output
output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```
### loader
webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
loader有两个属性:
- test: 识别出哪些文件会被转换
- use: 定义出在进行转换时，应该使用哪个 loader
```js
module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }]
  }
};
```
### plugin
插件可以实现打包优化，资源管理，注入环境变量
使用插件
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```
### mode
- development
- production
- none
```js
module.exports = {
  mode: 'production',
};
```