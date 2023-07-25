---
title: vue中组件的使用
category:
  - Vue
tag:
  - 组件
  - props
  - emit
  - 插槽
date: 2023-07-20
---

## 起步
### 创建
- vue2
```vue
<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '创建的组件'
        }
    }
}
</script>
```
- vue3
```vue
<script setup>
defineProps({
    num: {
        required: true,
        type: Number,
        validator(value) {
            return value > 99
        }
    }
})
</script>

<template>
  <div>
    传入的num为：{{ num }}
  </div>
</template>
```
- js
```js
export default { 
    data() {
        return { 
            msg: '创建的组件'
        }
    },
    template: `
    <div>{{ msg }}</div>
    `
}
```
### 使用
- vue2
```vue
<template>
  <div id="app">
    <MyComponent />
  </div>
</template>

<script>
import MyComponent from './components/MyComponent.vue';
export default {
  name: 'App',
  components: {
    MyComponent
  }
}
</script>
```
- vue3
```vue
<script setup>
import MyComponent from '../../components/MyComponent.vue';
</script>

<template>
  <div>
    <my-component :num="100"/>
  </div>
</template>
```
### 全局注册
- vue3
```js
import MyComponentA from './components/MyComponentA.vue';
import MyComponentB from './components/MyComponentB.vue';

app
.component('MyComponentA', MyComponentA)
.component('MyComponentB', MyComponentB)
.component('MyComponentC', {
    props: {
        num: {
            type: Number,
            validator(value) {
                return value < 1000
            },
            default: () => {
                return 100
            }
        }
    },
    template: `<div>{{ num }}</div>`
}
```
- vue2
```js
import Test from './components/Test.vue';

Vue.component('Test', Test)
```
## props
### 声明
```js
export default {
    props: ['a','b','c']
}
```
```js
export default {
    props: {
        a: [String, Number],
        b: Array,
        c: Object
    }
}
```
```js
export default {
    props: {
        a: {
            type: Number
        }
    }
}
```
### 效验
- type: 类型检查
- required: 是否必传
- validator(value) {} 自定义类型校验函数
- Boolean类型的值默认为true，其余默认为undefined

## 透传 Attributes
- 透传是指传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。最常见的例子就是 class、style 和 id。
### 父组件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
    <style>
        .container{
            background-color: #ccc;
        }
    </style>
</head>
<body>
    <div id="app">
        <demo 
            :value="value" 
            test="测试子组件是否可以获取" 
            @handleClick="handleClick" 
            class="container" 
            style="font-size: 20px;"
        />
    </div>
</body>
</html>
```
```js
const app = Vue.createApp({
    data () {
      return {
        value: '父组件传的值'
      }
    },
    methods: {
      handleClick() {
        alert('父组件的方法')
      }
    }
});

const vm = app.mount('#app')
```
### 子组件
```js
app.component('demo', {
  inheritAttrs: false,
  template: `<div>
    {{$attrs.value}} 
    <button v-on:click="$attrs.onHandleclick">按钮</button>
  </div>`,
  created () {
    console.log(this.$attrs)
  }
})
```
### 效果
- html结构为
```html
<div 
test="测试子组件是否可以获取" 
class="container" 
value="父组件传的值" 
style="font-size: 20px;"
>
	父组件传的值 
	<button>按钮</button>
</div>
```
- 控制台打印的$attrs
```js
{
    value: "父组件传的值",
    test: "测试子组件是否可以获取",
    class: "container",
    style: {
        font-size: "20px"
    },
    onHandleclick: f() {
	length: 0,
        name: "bound handleClick"
    }
}
```
- 如果不想要一个组件自动地继承 attribute，可以在组件选项中设置 inheritAttrs: false。则html结构为
```html
<div>
	父组件传的值 
	<button>按钮</button>
</div>
```

## 事件
### 声明
- vue3
```vue
<script setup>
const emit = defineEmits([
  'myClick'
])

const handleEmit = () => {
  emit('myClick', "点击了子组件")
}
</script>
```
- vue2
```js
this.$emit('myClick', 100)
```
### 监听
- vue3
```vue
<script setup>
import MyComponent from '../../components/MyComponent.vue';

const myClick = e => {
  console.log(e)
}
</script>

<template>
  <div>
    <my-component :num="100" @my-click="myClick"/>
  </div>
</template>
```
- vue2
```vue
<template>
  <div>
    // vue2中事件不支持自动化的大小写转换，不能写成 @my-click
    <Test :my-num="999" @myClick="emitClick"/>
  </div>
</template>

<script>
export default {
  methods: {
    emitClick(e) {
      console.log(e)
    }
  }
}
</script>
```
### 校验
```js
const emit = defineEmits({
  // 不需要校验
  click: null,
  // 校验值是否存在
  myClick: (val) => {
    if(val) {
      return true
    }else{
      return false
    }
  }
})
```

## 双向绑定
### v-model的参数
- vue2
```vue
<MyComponents v-model="isShow" />
```
```vue
<template>
  <div>
    {{ value }}
    <button @click="$emit('input',false)">++</button>
  </div>
</template>

<script>
export default {
  props: ['value']
}
</script>
```
- vue3
```vue
<MyComponents v-model="isShow" />
```
```vue
<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div>
    {{ modelValue }}
    <button @click="close">关闭</button>
  </div>
</template>
```
### 多个v-model
```vue
<Counter v-model:count1="count1" v-model:count2="count2"/>
```
```vue
<script setup>
import { computed } from "vue"

const props = defineProps(['count1', 'count2'])
const emit = defineEmits(['update:count1', 'update:count2'])

const num1 = computed({
  get() {
    return props.count1
  },
  set(value) {
    emit('update:count1', value)
  }
})

const num2 = computed({
  get() {
    return props.count2
  },
  set(value) {
    emit('update:count2', value)
  }
})

const update1 = () => {
  num1.value++
}
const update2 = () => {
  num2.value++
}
</script>

<template>
  <div>
    {{ num1 }} || {{ num2 }}
    <button @click="update1">修改count1的值</button>
    <button @click="update2">修改count2的值</button>
  </div>
</template>
```
### v-model修饰符
```vue
<MyComponents v-model.capitalize="isShow" />
```
```vue
<script setup>
const props = defineProps({
  modelValue: Boolean,
  modelModifiers: {
    default: () => ({})
  }
})
console.log(props.modelModifiers) // {capitalize: true}

const emit = defineEmits(['update:modelValue'])

function initVal() {
  if(props.modelModifiers.capitalize) {
    // 执行相关操作
    value = xxxx
  }
  emit('update:modelValue', value)
}
</script>
```
### 带参数的修饰符
```vue
<UserName v-model:first-name.capitalize="first" v-model:last-name.uppercase="last" />
```
```vue
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```
## 插槽
### 设置插槽
- slot 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染
```vue
<button>
  <slot></slot>
</button>
```
- 使用
```vue
<FancyButton>
  自定义按钮文字
</FancyButton>
```
- 最终结果
```html
<button> 自定义按钮文字 </button>
```
### 作用域
- 插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的
- 插槽内容无法访问子组件的数据
- Vue 模板中的表达式只能访问其定义时所处的作用域
### 默认内容
- 在外部没有提供任何内容的情况下，可以为插槽指定默认内容
- 父组件提供内容则取代默认内容
```vue
<button>
  <slot>
    默认描述文字
  </slot>
</button>
```
### 具名插槽
- 带 name 的插槽被称为具名插槽 (named slots)。没有提供 name 的 ```<slot>``` 出口会隐式地命名为“default”
- 要为具名插槽传入内容，需要使用一个含 v-slot 指令的 ```<template>``` 元素，并将目标插槽的名字传给该指令：
- v-slot 有对应的简写 ```#```，因此 ```<template v-slot:header>``` 可以简写为 ```<template #header>```
子组件的模板结构
```vue
<template>
  <div>
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <slot name="footer"></slot>
    </footer>
  </div>
</template>
```
父组件使用
```vue
<Component>
  <template v-slot:header>
    这里是头部
  </template>
    这里是内容
  <template v-slot:footer>
    这里是底部
  </template>
</Component>
```
渲染结果
```html
<div>
  <header> 
    这里是头部 
  </header>
  <main> 
    这里是内容 
  </main>
  <footer> 
    这里是底部 
  </footer>
</div>
```
### 作用域插槽
- 可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes, 让子组件在渲染时将一部分数据提供给插槽
```vue
<div>
  <slot v-for="item in list" :item="item" />
</div>
```
- 通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 props 对象：
```vue
<Component v-slot="slotProps">
  <p>{{ slotProps.item }}</p>
</Component>
```
- 可以使用解构
```vue
<Component v-slot="{ item }">
  <p>{{ item }}</p>
</Component>
```
### 具名作用域插槽
- 向具名插槽中传入 props：
```vue
<div>
  <slot name="header" message="我来组成顶部" />
  <slot message="我来组成内容" />
  <slot name="footer" message="我来组成底部" />
</div>
```
- 同时使用了具名插槽与默认插槽，则需要为默认插槽使用显式的 ```<template>``` 标签
```vue
<Component>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="{ message }">
    {{ message }}
  </template>
</Component>
```
### 异步组件
- defineAsyncComponent方法接收一个返回 Promise 的加载函数
- 组件将在五秒后出现
```js
app.component('HelloComponent', defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(import('./components/Dialog.vue'))
    }, 5000)
  })
}))
```
- 父组件定义
```js
import { defineAsyncComponent } from 'vue';
const HelloComponent = defineAsyncComponent(() => 
  import('../../components/Dialog.vue')
)
```
- 全局注册
```js
app.component('HelloComponent', defineAsyncComponent(() => 
  import('./components/Dialog.vue')
))
```
- 加载与错误状态
```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```