---
title: TypeScript
icon: "/assets/icon/typescript.png"
category:
  - TypeScript
tag:
  - TypeScript
date: 2023-08-07
---

::: tip 指引
- TypeScript 是 JavaScript 的一个超集，支持 ECMAScript 6 标准
- TypeScript 是一种给 JavaScript 添加特性的语言扩展
- [文档](https://www.tslang.cn/docs/handbook/basic-types.html)
- 优势
  - 更易理解
  - 效率更高
  - 减少错误
- 缺点
  - 需要学习
  - 需要编译
:::

## 开始
### 安装
```sh
npm install -g typescript
```
### 查看版本
```sh
tsc -v
```
### 编译
```sh
tsc 文件名.ts
```
### 编译并运行
::: code-tabs

@tab cmd

```sh
tsc 文件名.ts && node 文件名.js 
```

@tab PowerShell

```sh
tsc 文件名.ts; node 文件名.js
```

:::

## 类型
### Any
- 任意类型，可以赋予任意类型的值
```ts
let x: any;
x = 1;
x = "string";
x = true;
x = [1, 2, 3];
x = {}
```
### Number
```ts
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制
```
### String
```ts
let name: string = "bob";
```
### Boolean
```ts
let isDone: boolean = false;
```
### Array
```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```
### Tuple
- 元组：数量和类型有限的数组
```ts
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```
- 可以使用```push()```，但是类型必须保持一致
```ts
let user: [string, number] = ['name', 10]
user.push(100) // OK
user.push(true) // 类型“boolean”的参数不能赋给类型“string | number”的参数
```
### Enum
- 枚举类型,定义数值集合
- 默认值：从0开始编号
```ts
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;
console.log(c) // 1
```
- 手动赋值
```ts
enum Color {
  Red = '#FF0000',
  Green = '#008000',
  Blue= '#0000FF'
}
let c: Color = Color.Green;
console.log(c) // #008000
```
### Void
- 表示没有任何返回值的函数
```ts
function get(): void {
  return undefined;
}
```
### Null
- 空对象引用，表示什么都没有
```ts
let u: null = null;
```
### Undefined
- 未定义，表示未赋值
```ts
let u: undefined = undefined;
```
### Never
- 表示的是那些永不存在的值的类型
- never 类型的变量只能被 never 类型所赋值
- 抛出异常或无限循环
```ts
let x: never;

x = (() => {
  throw new Error("");
})()

function error(): never {
  throw new Error("");
}

function loop(): never {
  while (true) { }
}
```
### Object
- 表示非原始类型，也就是除 number，string，boolean，symbol，null，undefined 外的类型
```ts
let o: object = {};
```
### 类型断言
- 手动指定一个值的类型，即允许变量从一种类型更改为另一种类型
- 语法：
  - `<类型>值`
  - `值 as 类型`
```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

## 接口
- 接口（Interfaces）是对象间相互通信的约定，它定义了对象的结构，描述了对象的行为
- 接口定义了对象的结构，描述了对象的行为，接口可以被类，枚举和命名空间实现
- 接口只描述对象的结构，不描述对象的行为
### 定义和使用
```ts
interface Person {
  name: string;
  age: number;
}

let p1: Person = {
  name: 'Bob',
  age: 30
}
```
### 可选属性
- 在可选属性的后面加一个```?```符号
```ts
interface Person {
  name: string;
  age?: number;
}
```
### 只读属性
- 在只读属性前面添加```readonly```来指定只读属性
```ts
interface Person {
  readonly name: string;
  age?: number;
}

let p1: Person = {
  name: 'Bob'
}

p1.name = 'Alice' // 无法为“name”赋值，因为它是只读属性。
```
## 函数
- 函数的参数类型示例
```ts
function add(x: number, y: number): number {
  return x + y;
}
add(1, 2)
```
- 函数的类型实例
```ts
interface Sum {
  (x: number, y: number): number
}

let add: Sum = (x: number, y: number) => x + y
```
### 可选参数
- 函数的参数是可选的，在参数名后添加```?```符号
```ts
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
```
### 默认参数
- 函数的参数可以默认指定，在参数名后添加```=```符号
```ts
function buildName(firstName: string, lastName: string = 'Smith'): string {
  return firstName + ' ' + lastName;
}
```
### 剩余参数
- 函数的参数可以指定为剩余参数，在参数名后添加```...```符号
```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ');
}
```
### 函数重载
- 函数重载是函数的一种特殊重用方式，它允许一个函数接受不同数量或类型的参数时，作出不同的处理
- 为同一个函数提供多个函数类型定义来进行函数重载
- 函数重载的定义
```ts
function reverse(x: number): number;
function reverse(x: string): string;
```