---
title: Koa框架的使用
category:
  - JavaScript
  - node.js
tag:
  - koa
date: 2023-08-17
---

## 简介
Koa 是一个轻量级的 Node.js Web 框架，用于构建可扩展、可维护的服务器端应用程序。Koa 并没有遵循传统的 MVC（Model-View-Controller）架构，而是采用了一种更加灵活和强大的基于生成器的架构。Koa 遵循了 Express.js 的核心思想，但是 Koa 更加简洁、更具可读性和扩展性。

Koa 的特性包括：

- 轻量级：Koa 的安装大小只有 Express.js 的 1/4，这使得 Koa 更加轻量级，易于部署。
- 生成器架构：Koa 采用基于生成器的架构，使得代码更加模块化、易于维护。
- 中间件：Koa 支持中间件，这使得 Koa 可以在请求处理之前或之后执行特定的操作。
- 错误处理：Koa 提供了一个强大的错误处理系统，可以捕获和处理错误。
- 路由：Koa 支持基于正则表达式的路由，可以轻松地创建复杂的 RESTful API。
- 模板引擎：Koa 支持 EJS、Handlebars 等流行的模板引擎，可以轻松地实现页面渲染。
- 集成工具：Koa 集成了一些常用的集成工具，如 Sequelize、Mongoose 等，可以简化数据库操作。
总之，Koa 是一款功能强大、轻量级的 Node.js Web 框架，适用于构建可扩展、可维护的服务器端应用程序。

## 使用
### 安装
```sh
npm install koa --save
```
### 创建一个 Koa 应用
- 访问```localhost:3000```，可以看到```Hello Koa```
```js
const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
})

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
});
```

## 中间件
- 当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件
- 当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为
### 执行顺序示例
```js
app.use(async (ctx, next) => {
  console.log('第一个执行');
  await next();
  console.log('第五个执行')
});

app.use(async (ctx, next) => {
  console.log('第二个执行');
  await next();
  console.log('第四个执行')
})

app.use(async (ctx, next) => {
  console.log('第三个执行')
})
```
### 中间件上下文
- ```ctx```：上下文对象，包含了请求对象和响应对象
```js
app.use(async (ctx) => {
  ctx.body = {
    req: ctx.request,
    res: ctx.response
  }
});
```
```json
{
  "req": {
    "method": "POST",
    "url": "/",
    "header": {
      "user-agent": "PostmanRuntime/7.32.3",
      "accept": "*/*",
      "postman-token": "50cff0e5-89dc-4d41-b5a3-d56ff8545234",
      "host": "localhost:3000",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
      "content-length": "0"
    }
  },
  "res": {
    "status": 200,
    "message": "OK",
    "header": {
      "content-type": "application/json; charset=utf-8"
    }
  }
}
```
### 路由
- 路由是 Koa 应用程序中的核心概念
- 路由决定了由谁(哪些中间件)处理请求以及处理请求的什么方法
- 路由由路由器(koa-router)提供
- 安装
```sh
npm i koa-router --save
```
- 引入
```js
const Router = require('koa-router');
const router = new Router();
```
- 使用
```js
router.get('/', async (ctx) => {
  ctx.body = 'Hello koa-router';
})

router.get('/about/:id', async (ctx) => {
  ctx.body = `This is about page, you id ${ctx.params.id}`;
})

app.use(router.routes());
```
- 路由前缀
```js
const userRouter = new Router({
  prefix: '/user'
})

userRouter.get('/:id', async (ctx) => {
  ctx.body = `This is user page, you id ${ctx.params.id}`;
})

app.use(userRouter.routes())
```
- 路由中间件
  - 在路由中使用err中间件，访问则抛出一个包含 status 属性错误的帮助方法
```js
const err = async (ctx, next) => {
  ctx.throw(401, 'Unauthorized');
  await next();
}

userRouter.get('/', auth, async (ctx) => {
  ctx.body = 'Hello user-router';
})
```
### 控制器
#### 获取请求参数
  - ctx.query
  - ctx.params
  - ctx.request.bdoy
- 获取body需要借助bodyParser
- 安装
```sh
npm i koa-bodyparser -save
```
- 使用
```js
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
```
#### 发送响应
```js
router.get('/', (ctx) => {
  ctx.set('Cache-Control', 'no-cache'); // 发送响应头
  ctx.status = 500; // 发送响应状态码
  ctx.body = '服务器出错了'; // 发送响应体
})
```