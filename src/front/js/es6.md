---
title: ECMAScript 6
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