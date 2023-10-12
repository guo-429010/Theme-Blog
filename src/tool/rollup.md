---
title: rollup
category:
  - 工具
tag:
  - rollup
date: 2023-10-11
---

::: tip 总览
Rollup 是一个用于 JavaScript 的模块打包工具，它将小的代码片段编译成更大、更复杂的代码
:::

## 安装
```sh
npm install --global rollup
```

## 基本使用
### 创建原始文件
- foo.js
```js
export default 'hello world';
```
- index.js
```js
import foo from './foo';

export default function () {
  console.log(foo);
}
```
### 默认打包
```sh
rollup index.js --file dist.js
```
- dist.js
```js
var foo = 'hello world';

function index () {
  console.log(foo);
}

export { index as default };
```
### 指定打包产物的类型
- `--format` 缩写 `-f`
- 可选值：`amd`、`cjs`、`es`、`iife`、`umd`、`system`
```sh
rollup index.js --file dist.js --format cjs
```
- dist.js
```js
'use strict';

var foo = 'hello world';

function index () {
  console.log(foo);
}

module.exports = index;
```
- 使用 `umd` 必须设置导出的名称
```sh
rollup index.js --file dist.js --format umd --name hello
```

## 命令
- 输入 `rollup --help` 查看帮助
- 输入 `rollup --version` 查看版本
- [命令](https://www.rollupjs.com/command-line-interface/)
```sh
-c, --config <filename>     ## 使用此配置文件
-d, --dir <dirname>         ## 用于块的目录（如果不存在，则打印到 stdout）
-e, --external <ids>        ## 排除模块 ID 的逗号分隔列表
-f, --format <format>       ## 输出类型（amd、cjs、es、iife、umd、system）
-g, --globals <pairs>       ## `moduleID:Global` 对的逗号分隔列表
-h, --help                  ## 显示此帮助消息
-i, --input <filename>      ## 输入（替代 <entry file>）
-m, --sourcemap             ## 生成源映射（`-m inline` 为内联映射）
-n, --name <name>           ## UMD 导出的名称
-o, --file <output>         ## 单个输出文件（如果不存在，则打印到 stdout）
-p, --plugin <plugin>       ## 使用指定的插件（可重复）
-v, --version               ## 显示版本号
-w, --watch                 ## 监视产物文件并在更改时重新构建
```

## 配置文件
- 创建 `rollup.config.js` 文件
```js
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'test-index'
  }
}
```
- 运行打包命令
  - `--bundleConfigAsCjs` 强制将配置转译为 CommonJS
```sh
rollup -c rollup.config.js --bundleConfigAsCjs
```
- 传递其它设置到配置文件
  - `--environment` 指定变量
```js
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: process.env.FORMAT,
    name: 'test-index'
  }
}
```
```sh
rollup -c rollup.config.js --bundleConfigAsCjs --environment FORMAT:umd
```
- 导出多个文件
```js
export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    }
  ]
}
```