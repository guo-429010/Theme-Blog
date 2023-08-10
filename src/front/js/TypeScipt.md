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
  - 指定了第一项为数字且未指定其它项时，其它项会自动递增
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
- 常量枚举
  - 可以避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问
```ts
const enum Color {
  Red,
  Green,
  Blue
}
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
### 类型推论
- 编译器能够根据变量的初始值推断出它的类型
```ts
let someValue = "this is a string";
```
### 联合类型
- 表示取值可以为多种类型中的一种
```ts
let someValue: string | number;
someValue = "123";
someValue = 123;
```
### 类型保护
- 用来检查值的类型是否符合预期
- 类型保护有两种方式：
  - typeof
  - instanceof
    - 通过构造函数来细化类型
    - 右侧为一个构造函数
```ts
function getLength(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  }
  else {
    return input.toString().length;
  }
}
```
```ts
class Foo {
  foo = 123;
}

class Bar {
  bar = 456;
}

function get(arg: Foo | Bar) {
  if(arg instanceof Foo) {
    return arg.foo;
  }else{
    return arg.bar
  }
}

console.log(get(new Foo())) // 123
console.log(get(new Bar())) // 456
```
### 类型别名
- 给一个类型起个新名字
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  }
  else {
    return n();
  }
}

console.log(getName("niu"))
console.log(getName(() => "ggb"))
```
### 字面量类型
- 表示一组可能的值
```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";

let go: Easing = 'ease-out'
```
### 交叉类型
- 表示一个对象拥有所有类型的成员
```ts
interface IName {
  name: string
}

type IPerson = IName & {
  age: number
}

let person: IPerson = {
  name: 'ggb',
  age: 18
}
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
### 类和接口
- 在类中实现接口
```ts
interface Swich {
  swichRadio(): boolean;
}

class Open implements Swich {
  swichRadio() {
    return true;
  }
}

class Close implements Swich {
  swichRadio() {
    return false;
  }
}
```
- 继承
```ts
interface Swich {
  swichRadio(): boolean;
}

interface Check extends Swich {
  checkRaio(): boolean;
}

class Open implements Check {
  swichRadio() {
    return true;
  }
  checkRaio() {
    return false;
  }
}
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

function reverse(x: any): void {
  console.log(x);
}

reverse("abc")
reverse(123)
```
## Class
- 类是对象的模板，使用```class```关键字来定义
### 继承
```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(length: number) {
    console.log(`${this.name}移动了${length}米`)
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  bark() {
    console.log('汪汪汪')
  }
  moves(val: number) {
    super.move(val) // 调用父类方法
  }
}

const dog = new Dog('小狗')
dog.bark() // 汪汪汪
dog.move(10) // 小狗移动了10米
dog.moves(100) // 小狗移动了100米
```
### 修饰符
- public 公有，默认修饰符
- private 私有
  - 不能在声明它的类的外部访问
- protected 受保护
  - 只能在该类和其子类中访问
- readonly 只读
```ts
class User {
  public name: string;
  private age: number;
  protected gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const user = new User("John", 25, "male");
user.age; // Error：属性“age”为私有属性，只能在类“User”中访问。
user.gender;// Error：属性“gender”受保护，只能在类“User”及其子类中访问。

class Admin extends User {
  readonly sex: string;
  constructor(name: string, age: number, gender: string, sex: string) {
    super(name, age, gender, sex);
  }
  public getGender() {
    return this.gender;
  }
}

const admin = new Admin('admin', 18, 'male', '男');
console.log(admin.getGender()); // 'male'
console.log(admin.gender); // Error：属性“gender”受保护，只能在类“User”及其子类中访问。
admin.sex = '女'; // Error：无法为“sex”赋值，因为它是只读属性。
```
- static 静态属性
  - 存在于类本身，而不是类的实例
```ts
class Role {
  static option = {
    0: 'admin',
    1: 'user'
  }
  public getRole(val: number) {
    return Role.option[val];
  }
}

let r1 = new Role()
console.log(r1.getRole(0)) // 'admin'
console.log(r1.getRole(1)) // 'user'
console.log(Role.option) // { '0': 'admin', '1': 'user' }
```
- 抽象类
  - 抽象类是供其他类继承的基类，不能直接被实例化
  - 抽象类中的抽象方法必须在派生类中实现
  - ```abstract```关键字是用于定义抽象类和在抽象类内部定义抽象方法
```ts
abstract class Animal {
  abstract  getName(): string;
}

class Dog extends Animal {
  getName() {
    return 'dog';
  }
}

class Pig extends Animal {
  getName() {
    return 'pig';
  }
}

let dog = new Dog()
let pig = new Pig()
console.log(dog.getName(),pig.getName()) // dog pig
```
## 泛型 
- 泛型：定义一个通用类型，让类型参数在代码中占位，在运行时再指定具体的类型
- 使用泛型变量创建泛型函数
```ts
function echo<T>(arg: T): T {
  return arg;
}

const result = echo(true)

function swap<T,U>(arguments: [T,U]): [U,T] {
  return [arguments[1], arguments[0]];
}

const result2 = swap(['string', 123])
```
### 泛型约束
- 泛型约束：对泛型变量的使用进行限制，比如对泛型变量添加一些约束，使其只能用于某些类型
```ts
interface ILength {
  length: number
}

function echoWithArr<T extends ILength>(arr: T): T{
  console.log(arr.length)
  return arr
}

const arrs = echoWithArr([1,2,3]) // 3
const str = echoWithArr('string') // 6
const obj = echoWithArr({ length: 1 }) // 1
```
### 泛型类
```ts
class Gen<T> {
  value: T;
  get(): T {
    return this.value
  }
  set(item: T) {
    this.value = item
  }
}

const g = new Gen<string>()
g.set("hello")
console.log(g.get()) // hello
```
### 泛型接口
```ts
interface IMap<T,U> {
  key: T,
  value: U
}

const map1: IMap<string, number> = {
  key: 'a',
  value: 1
}

const map2: IMap<number, number[]> = {
  key: 10,
  value: [1,2,3]
}
```