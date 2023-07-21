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