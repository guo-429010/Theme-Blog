---
title: vite
category:
  - 工具
tag:
  - 前端构建工具
  - vite
date: 2023-07-10
---

::: tip 总览
Vite 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。
  Vite 意在提供开箱即用的配置，同时它的 插件 API 和 JavaScript API 带来了高度的可扩展性，并有完整的类型支持。
:::

## 使用

### 创建 vue2 项目

- vite 没有关于 vue2 的模板，需要自己创建

```sh
npm create vite@latest
```

- 模板选择`Vanilla`
- 安装依赖

```sh
npm install vue@2.6.14 -S
npm install vite-plugin-vue2 -D
```

- 进入项目，新建`vite.config.js`文件

```js
import { createVuePlugin } from "vite-plugin-vue2";

export default {
  plugins: [createVuePlugin()],
};
```

- 删除原来的`main.js`文件
- 修改`index.html`文件
  - `<script type="module" src="/src/main.js"></script>`
- 新建`src`目录

  - 新建`App.vue`文件
  - 新建`main.js`文件

  ```js
  import Vue from "vue";
  import App from "./App.vue";

  new Vue({
    el: "#app",
    render: (h) => h(App),
  }).$mount();
  ```

- 运行

```sh
npm run dev
```

### 引入 pritter

- 创建`.prettierrc`文件
  - 安装`Prettier - Code formatter`扩展
  ```json
  {
    "tabWidth": 2, // 缩进
    "semi": false, // 结尾分号
    "singleQuote": true, // 单引号
    "trailingComma": "none" // 行尾逗号
  }
  ```

### 项目中配置 eslint

- 安装依赖

```sh
npm install eslint -D
```

- 初始化 eslint

```sh
npx eslint --init
```

  - 选择模式

  ```sh
  You can also run this command directly using 'npm init @eslint/config'.
  ? How would you like to use ESLint? ...
    To check syntax only
  > To check syntax and find problems
    To check syntax, find problems, and enforce code style
  ```

  - 选择语言模块

  ```sh
  ? What type of modules does your project use? ...
  > JavaScript modules (import/export)
    CommonJS (require/exports)
    None of these
  ```

  - 选择语言框架

  ```sh
  ? Which framework does your project use? ...
    React
  > Vue.js
    None of these
  ```

  - 是否使用 ts

  ```sh
  ? Does your project use TypeScript? » No / Yes
  ```

  - 代码在哪里运行

  ```sh
  ? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
  √ Browser
  √ Node
  ```

  - 配置文件格式

  ```sh
  ? What format do you want your config file to be in? ...
  > JavaScript
    YAML
    JSON
  ```

  - 是否现在安装

  ```sh
  eslint-plugin-vue@latest
  ? Would you like to install them now? » No / Yes
  ```

  - 使用什么安装

  ```sh
  ? Which package manager do you want to use? ...
  > npm
    yarn
    pnpm
  ```

- 安装其它依赖

```sh
npm install vite-plugin-eslint -D
npm install @babel/core -D
npm install @babel/eslint-parser -D
```

- 配置 vite.config.js

```js
import eslintPlugin from "vite-plugin-eslint";

export default {
  plugins: [
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
  ],
};
```

- 创建 `.eslintignore` 配置忽略文件

- 设置 `lint` 命令

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .js,.vue --ignore-path .eslintignore --fix src"
  }
}
```

### 配置环境变量
- 环境变量
  - 在 `import.meta.env` 对象上暴露环境变量
```js
{ 
  BASE_URL: '/', // 部署应用时的基本 URL
  MODE: 'development', // 应用运行的模式
  DEV: true, // 应用是否运行在开发环境
  PROD: false, // 应用是否运行在生产环境
  SSR: false // 应用是否运行在 server 上
}
```
- 配置文件
```sh
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```
- 只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码
- 新建一个 `.env` 文件
  - 设置变量
    -  `VITE_KEY='vite_key'`
  - 获取变量
    - `console.log(import.meta.env.VITE_KEY)`
- 开发环境： 新建一个 `.env.development` 文件
- 生成环境： 新建一个 `.env.production` 文件
- 模式切换
  - 当执行 `vite` 时，它会自动加载 `.env.development`
  - 当执行 `vite build` 时，它会自动加载 `.env.production`
  - 当执行 `vite build --mode staging` 时，它会自动加载 `.env.staging`
  ```json
  "scripts": {
    "start:dev": "vite",
    "start:prod": "vite --mode production"
  }
  ```
- 运行 `npm run preview` 预览生产版本
```js
{
  BASE_URL: "/"
  DEV: false
  MODE: "production"
  PROD: true
  SSR: false
}
```