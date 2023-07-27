---
title: 组合式API
category:
  - Vue
tag:
  - setup
date: 2023-07-27
---

## setup()
- ```setup()``` 钩子是在组件中使用组合式 API 的入口
### 基本使用
```vue
<script>
import { ref } from 'vue'

export default {
  props: {
      title: String
  },
  setup(props, context) {
    const count = ref(0)
    
    console.log(props.title)

    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs)

    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots)

    // 触发事件（函数，等价于 $emit）
    console.log(context.emit)

    // 暴露公共属性（函数）
    console.log(context.expose)
    
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>
```
### 通过 ```<script setup>```使用 
```vue
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String
})

const count = ref(0)
</script>
```

## 响应式核心Api
- ```ref```和```reactive```原理：通过```proxy```对数据进行封装，当数据变化时，触发模板等内容的更新
### ref()
- 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 ```.value```
- 处理基础类型的数据
```js
const title = ref('标题')
console.log(title.value) 
```
### reactive()
- 返回一个对象的响应式代理
- 处理非基础类型的数据
```js
const obj = reactive({
  name: 'niuma'
})

console.log(obj) // { name: 'niuma' }
```
### computed()
- 接受一个 getter 函数，返回一个只读的响应式 ref 对象
- 该 ref 通过 ```.value``` 暴露 getter 函数的返回值。
- 它也可以接受一个带有 ```get``` 和 ```set``` 函数的对象来创建一个可写的 ref 对象 

只读的
```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```
可读写
```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```
### watch()
- 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数
- 详细信息：
  - 第一个参数是要监听的值
  - 第二个参数是发生变化时要调用的回调函数
  - 第三个可选的参数是一个对象：
    1. ```immediate```：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
    2. ```deep```：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考深层侦听器。
    3. ```flush```：调整回调函数的刷新时机。参考回调的刷新时机及 watchEffect()。
    4. ```onTrack / onTrigger```：调试侦听器的依赖。参考调试侦听器。
#### 监听ref类型的值
```js
const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
```
#### 监听reactive类型的值
```js
const obj = reactive({
  name: 'niuma'
})

watch(
  () => obj.name, 
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  }
)
```
#### 监听多个值
```js
watch(
  [
    () => obj.name,
    () => obj.age
  ],
  (
    [newName, newAge],
    [oldName, oldAge]
  ) => {
    console.log(newName, oldName)
    console.log(newAge, oldAge)
  }
)
```
### watchEffect()
- 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
- 不需要传递需要监听的值，自动会感知代码依赖
```js
const count = ref(0)

watchEffect(() => console.log(count.value)) // -> 输出 0

count.value++ // -> 输出 1
```
### readonly()
- 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理
- 对任何嵌套属性的访问都将是只读的
```js
const newObj = readonly(obj)
console.log(newObj)
newObj.name = 'newName' // Set operation on key "name" failed: target is readonly
```

## 响应式工具Api
### toRef()
- 可以将值、refs 或 getters 规范化为 refs
- 双向 ref，会与源属性同步
```js
const nameRef = toRef(obj, 'name')
nameRef.value = 'new'
console.log(obj.name) // new
```
### toRefs()
- 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref
```js
const obj = reactive({
    name: 'niuma'
})

const { name } = toRefs(obj) // { name: ObjectRefImpl }
console.log(name.value) // niuma

setTimeout(() => {
    name.value = 'hello'
    console.log(name.value) // hello
}, 2000);
```
## 依赖注入
### provide()
- 提供一个值，可以被后代组件注入
- ```provide()``` 接受两个参数：
  1. 要注入的 key，可以是一个字符串或者一个 symbol
  2. 要注入的值
```js
import { provide } from 'vue'

provide('name', 'GGB')
```
### inject()
- 注入一个由祖先组件或整个应用提供的值
- 第一个参数是注入的 key
- 第二个参数是可选的，在没有匹配到 key 时使用的默认值
```js
import { inject } from 'vue'

const name = inject('name')
console.log(name) // GGB
```
## 生命周期函数
[更多信息](https://cn.vuejs.org/api/composition-api-lifecycle.html)
### onMounted()
注册一个回调函数，在组件挂载完成后执行
### onUpdated()
注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用
### onUnmounted()
注册一个回调函数，在组件实例被卸载之后调用
### onBeforeMount()
注册一个钩子，在组件被挂载之前被调用
### onBeforeUpdate()
注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用
### onBeforeUnmount()
注册一个钩子，在组件实例被卸载之前调用
### onErrorCaptured()
注册一个钩子，在捕获了后代组件传递的错误时调用
### onRenderTracked() 
注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用，仅在开发模式下可用
### onRenderTriggered()
注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用，仅在开发模式下可用