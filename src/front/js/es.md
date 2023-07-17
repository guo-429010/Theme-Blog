---
title: ECMAScript
icon: es6
category:
  - JavaScript
tag:
  - ECMAScript
date: 2023-06-02
---
## 简介
- ECMAScript 是 JavaScript 语言的规则
- 2015年正式发布的ECMAScript6（2015）已经成为了JavaScript这门语言的下一代标准
## ECMAScript2015(ES6)
## ECMAScript2016(ES7)
## ECMAScript2017(ES8)
## ECMAScript2018(ES9)
## ECMAScript2019(ES10)
## ECMAScript2020(ES11)
## ECMAScript2021(ES12)
## ECMAScript2022(ES13)
### 正则表达式匹配索引
添加了一个特殊的标志 d，通过使用它，正则表达式 API 将返回一个二维数组作为名索引的键。它包含每个匹配项的开始和结束索引。如果在正则表达式中捕获了任何命名组，它将在 indices.groups 对象中返回它们的开始/结束索引， 命名的组名将是它的键。
```js
const expr = /a+(?<NAME>b+)+c/d;
const result = expr.exec("aaabbbc")
console.log(result)
```
![结果](../../.vuepress/public/assets/images/es2022_01.png)
### Top-level await
- 顶层await解决在按需加载的场景下， Promise 方式链式调用麻烦的问题
```js
// users.js
export const users = await fetch('/users/lists');

// usage.js
import { users } from "./users.js";
// ✅ the module will wait for users to be fullfilled prior to executing any code
```
### Array.at()
```js
const arr = [1,2,3,4,5,6]

arr.at(0) // 1

arr.at(-1) // 6
```
### Object.hasOwn()
```js
const obj = {
    name: 'admin'
}
Object.hasOwn(obj, "name") // true
```
### Error Cause
error cause 为 Error 构造器引入了第二个参数，该参数是一个带有 cause 属性的对象，可以携带底层错误的信息，而上层错误的信息由 Error 构造器的第一个参数提供。error cause 有助于进行错误链的跟踪，保留抛出错误的上下文信息。
```js
function fetchData(url){
  return fetch(url).catch(err => {
    throw new Error(`can't fetch data from ${url}`,{cause:err})
  })
}
(async function(){
  try {
    await fetchData('x:x')
  } catch(e) {
    console.log(e)
    console.log('Cause by',e.cause)
  }
})()
```
### Class Fields
- 使用“ # ”创建私有字段,私有方法
```js
class User {
    name = "张三"
    #age = 18

    getName() {
        console.log('姓名')
    }
    
    #getAge() {
        console.log('年龄')
    }
}

const user = new User()
user.name // 张三
user.age // undefined
user.getName() // 姓名
user.getAge() // user.getAge is not a function
```
### Class Static Block
- 可以在任何类中包含静态块，它们将只运行一次，并且是装饰或执行类静态端的某些字段初始化的好方法
```js
class A {
  static {
    console.log('启动')
  }
}
```
## ECMAScript2023(ES14)
### 从后到前遍历数组
- findLast() 会返回第一个查找到的元素，如果没有找到，就会返回 undefined；
- findLastIndex() 会返回第一个查找到的元素的索引。如果没有找到，就会返回 -1；
```js
const array = [{v: 1}, {v: 2}, {v: 3}, {v: 4}, {v: 5}];

array.findLast(elem => elem.v > 3); // {v: 5}
array.findLastIndex(elem => elem.v > 3); // 4
array.findLastIndex(elem => elem.v > 5); // undefined
```
### toSorted
- 复制原数组，然后对新数组排序，并返回新数组
```js
const array = [3, 2, 1];
const sortedArray = array.toSorted();
console.log(array); // [3, 2, 1] 原数组不变 
console.log(sortedArray); // [1, 2, 3]
```
### toReversed
- 复制数组原数组，对新数组颠倒顺序，并返回新数组
```js
const original = [1, 2, 3, 4];
const reversed = original.toReversed();
console.log(original);  // [ 1, 2, 3, 4 ] 原数组不变
console.log(reversed);  // [ 4, 3, 2, 1 ]
```
### toSpliced
- 返回一个新数组，并在给定的索引处删除或替换了一些元素
```js
 const original = ["Jan", "Mar", "Apr", "May"];
  // 在索引 1 处添加一个元素
  const spliced = months.toSpliced(1, 0, "Feb");
  console.log(spliced); // ["Jan", "Feb", "Mar", "Apr", "May"]
  console.log(original); // ["Jan", "Mar", "Apr", "May"]  原数组不变
```
### with
- width(index, value) 对指定索引的值进行修改，并返回新数组
```js
const arr = [1,2,3,4,5]
const newArr = arr.with(2,100)
console.log(newArr) // [1, 2, 100, 4, 5]
console.log(arr) // [1, 2, 3, 4, 5] 原数组不变
```
### WeakMap 支持 Symbol 作为键
```js
const weak = new WeakMap()
const key = Symbol("ggb")
weak.set(key, "我是猪猪侠")
console.log(weak.get(key)) // 我是猪猪侠
```