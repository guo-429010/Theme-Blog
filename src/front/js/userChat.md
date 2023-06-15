---
title: 在线聊天页面
category:
  - JavaScript
tag:
  - 类
date: 2023-06-15
description: 使用类实现聊天室的用户列表显示，聊天记录渲染，发送信息
---

## 目标
- 左侧选择用户
- 右侧显示聊天记录
- 发送信息

## 基本布局和样式
```html
<head>
    <style>
        * {
            box-sizing: border-box;
        }
        html, body{
            margin: 0;
            padding: 0;
        }
        ul, li{
            list-style: none;
        }
        body {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e7e7e7;
        }
        .chat-container{
            width: 1000px;
            height: 600px;
            border-radius: 20px;
            display: flex;
            overflow: hidden;
            background-color: #423c3c;
        }
        .chat-user-list{
            width: 20%;
            height: 100%;
            background: #55acee;
        }
        .chat-user-list-title{
            padding: 12px 0;
            font-size: 20px;
            font-weight: bold;
            color: white;
            text-align: center;
        }
        .chat-user-list-content{
            height: calc(100% - 50px);
            padding: 12px 26px;
            overflow-y: auto;
        }
        .chat-user-list-content li {
            width: 100%;
            height: 36px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
        }
        .chat-user-list-content .current{
            color: aquamarine;
        }
        .chat-content{
            width: 80%;
        }
        .chat-content-top{
            width: 100%;
            padding: 12px 0;
            font-size: 20px;
            font-weight: bold;
            color: white;
            text-align: center;
            border-bottom: 1px solid #55acee;
        }
        .chat-content-log {
            width: 100%;
            height: calc(100% - 170px);
            display: flex;
            flex-direction: column;
            padding: 10px 15px;
            overflow-y: auto;
        }

        .putaway {
            display: flex;
            justify-content: flex-start;
            padding-top: 10px;
        }

        .putaway p {
            background-color: rgb(0, 140, 255);
        }

        .sender {
            display: flex;
            justify-content: flex-end;
            padding-top: 10px;
        }

        .sender p {
            background-color: rgb(10, 187, 69);
        }

        .putaway p,
        .sender p {
            display: inline-block;
            padding: 4px 12px;
            font-size: 16px;
            border-radius: 4px;
            color: white;
            max-width: 60%;
        }

        .chat-content-input-container {
            width: 100%;
            height: 120px;
            background-color: white;
            padding: 12px 24px;
            position: relative;
        }

        .chat-content-input-container textarea {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 16px;
            background-color: transparent;
            outline: none;
            resize: none;
        }

        .chat-content-input-container button {
            position: absolute;
            right: 46px;
            bottom: 20px;
            background: #4caf50;
            color: white;
            border: none;
            font-size: 16px;
            border-radius: 8px;
            padding: 6px 26px;
            cursor: pointer;
        }

        .chat-content-input-container button:hover {
            background-color: #85d688;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-user-list">
            <div class="chat-user-list-title">
                用户列表
            </div>
            <div class="chat-user-list-content">

            </div>
        </div>
        <div class="chat-content">
            <div class="chat-content-top">
                用户名
            </div>
            <div class="chat-content-log">

            </div>
            <div class="chat-content-input-container">
                <textarea rows="5" placeholder="请输入消息" autofocus id="input"></textarea>
                <button onclick="sendMessage()">发送</button>
            </div>
        </div>
    </div>
</body>
```

## 侧栏用户列表
### 用户类
```js
class User {
    constructor(user) {
        this.username = user.name
        this.phone = user.phone
        this.isCurrent = false
    }
    selectUser(index) {
        this.isCurrent = true
    }
    removeUser(index) {
        this.isCurrent = false
    }
}
```

### 用户列表类
```js
class UserList {
    constructor(arr) {
        let userList = []
        for(let item of arr) {
            userList.push(new User(item))
        }
        this.userList = userList
        this.userListDom = document.querySelector('.chat-user-list-content')
        this.chatHeaderName = document.querySelector('.chat-content-top')
    }
    createHtml() {
        var html = ''
        for(let [index,item] of this.userList.entries()) {
            html += `
                <li onclick="userSwitch(${index})">${item.username}</li>
            `
        }
        this.userListDom.innerHTML = html
        this.selectUser(0)
    }
    selectUser(index) {
        let userDom = this.userListDom.children[index]
        if(this.userList[index].isCurrent) return
        this.userList[index].selectUser()
        userDom.classList.add('current')
        this.chatHeaderName.textContent = this.userList[index].username
        for(let [i,e] of this.userList.entries()){
            if(i == index) {
                continue
            }else{
                this.removeUser(i)
            }
        }
    }
    removeUser(index) {
        let userDom = this.userListDom.children[index]
        this.userList[index].removeUser()
        userDom.classList.remove('current')
    }
}
```

### 生成
- 渲染用户列表
```js
const userArr = [
    { name: '牛马',phone: '16632225555' },
    { name: '张三',phone: '19966662222' }
]
var userList = new UserList(userArr)
userList.createHtml()
```
- 点击事件
```js
function userSwitch(index) {
    userList.selectUser(index)
}
```

## 聊天区
### 聊天类
```js
class Chat {
    constructor(arr) {
        this.list = arr
        this.dom = document.querySelector('.chat-content-log')
        this.input = document.getElementById('input')
    }
    createHtml() {
        for(let item of this.list) {
            this.addChatLog(item)
        }
        this.sendSuccess()
    }
    addChatLog(item) {
        if (item.phone == '123456') {
            type = 'sender'
        } else {
            type = 'putaway'
        }
        html += `
            <div class="${type}">
                <p>${item.text}</p>
            </div>
        `
        this.dom.innerHTML = html
    }
    sendSuccess() {
        this.dom.scrollTop = this.dom.scrollHeight
        this.input.value = ''
        this.input.focus()
    }
}
```
### 功能实现
```js
const messageList = [
    { phone: '123456', text: '你好' },
    { phone: '555', text: 'Hello' }
]
var chat = new Chat(messageList)
chat.createHtml()
function sendMessage() {
    const value = chat.input.value
    if(value.trim() == '') return
    chat.addChatLog({
        phone: '123456',
        text: value
    })
    chat.sendSuccess()
}
```