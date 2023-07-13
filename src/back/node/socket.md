---
title: 搭建聊天服务器
category:
  - JavaScript
  - node.js
tag:
  - socket
date: 2023-07-13
---

## [socket.io文档](https://socket.io/zh-CN/)

::: tip 已实现功能
- 上线提醒
- 离线提醒
- 信息发送,广播
:::

## 依赖
```json
"dependencies": {
    "express": "^4.18.2",
    "moment": "^2.29.4",
    "socket.io": "^4.7.1"
}
```

## 代码
```js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const moment = require("moment");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://admin.guo123.top'
    }
});

io.on("connection", socket => {
    const userInfo = socket.handshake.query
    console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + `：系统提示：用户${userInfo.userName}上线了`)
    socket.broadcast.emit('login-remind', `系统提示：用户${userInfo.userName}上线了`)
    socket.on('disconnect', () => {
        console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + `：系统提示：用户${userInfo.userName}离开了`)
        socket.broadcast.emit('logout-remind', `系统提示：用户${userInfo.userName}离开了`)
    })
    socket.on('send-message', (msg, callback) => {
        console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + `：收到来自${userInfo.userName}的消息：${msg.message}`)
        if(msg.type == 0) {
            msg.message = msg.message.replace(/(\n)/g, '<br />')
        }
        const MessageObj = {
            userId: userInfo.userId,
            userName: userInfo.userName,
            avatar: userInfo.avatar,
            message: msg.message,
            type: msg.type,
            time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        }
        socket.broadcast.emit('receive-message',MessageObj)
        callback({
            code: 200,
            status: "发送成功",
            MessageObj
        })
    })
});

httpServer.listen(8083);
```