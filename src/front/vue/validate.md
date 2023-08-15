---
title: vue3+ts自定义表单验证
category:
  - Vue
  - TypeScript
tag:
  - 表单验证
date: 2023-08-15
---

::: tip 轻松实现表单验证
- 抽离组件
- 自定义效验规则
- 校验逻辑与数据绑定
:::

## 自定义输入框组件
### 创建验证规则接口并导出
- type：验证类型
- message：错误提示信息
```ts
interface RuleProp {
  type: 'required' | 'email' | 'password';
  message: string;
}
export type RulesProp = RuleProp[]
```
### 正则表达式效验规则
- 邮箱
- 密码
```ts
const emailReg = /^[A-Za-z0-9]+([-._][A-Za-z0-9]+)*@[A-Za-z0-9]+(-[A-Za-z0-9]+)*(\.[A-Za-z]{2,6}|[A-Za-z]{2,4}\.[A-Za-z]{2,3})$/
const passwordReg = /^[a-zA-Z]\w{5,17}$/
```
### 数据绑定
- 绑定规则
- 绑定值
- @blur: 失去焦点时触发
- @input: 输入时触发
- ```$attrs```绑定父组件的其它属性
  - ```inheritAttrs: false```禁用透传 
```vue
<input
  :class="{ 'is-invalid': inputRef.error }"
  :value="inputRef.val"
  @blur="validateInput"
  @input="updateValue"
  v-bind="$attrs"
/>
<span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
```

```ts
const props = defineProps({
  rules: Array as PropType<RulesProp>, 
  modelValue: String
})
```
### 事件绑定
- 输入框的值
```ts
const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  inputRef.val = targetValue
  emit('update:modelValue', targetValue)
}
```
- 使用```Array.every()```遍历rules，判断是否通过
```ts
const validateInput = (): boolean => {
  if (props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = inputRef.val.trim() !== ''
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        case 'password':
          passed = passwordReg.test(inputRef.val)
          break
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}
```
## 自定义表单组件
- 使用默认插槽接收input
- 预留可以自定义的submit按钮
```html
<form class="validate-form-container">
  <slot name="default"></slot>
  <div @click.prevent="submitForm">
    <slot name="submit">
      <button type="submit">提交</button>
    </slot>
  </div>
</form>
```
### 使用mitt实现组件通信
- 安装mitt
```sh
npm install --save mitt
```
- 创建实例
```ts
import mitt from 'mitt'

export const emitter = mitt()
```
- 输入框组件引入并发送事件
```ts
import { emitter } from './ValidateForm.vue'

onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})
```
- 监听事件并发送
```ts
let funcArr: ValidateFunc[] = []
const submitForm = () => {
  const result = funcArr.map(func => func()).every(result => result)
  emit('form-submit', result)
}
const callback = (func: ValidateFunc) => {
  funcArr.push(func)
}
emitter.on('form-item-created', callback as () => void)
onUnmounted(() => {
  emitter.off('form-item-created')
  funcArr = []
})
```
## 在单文件中使用
### 引入组件
```ts
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
```
### 注册组件
```vue
<ValidateForm class="px-4" @form-submit="onFormSubmit">
  <div class="mb-3">
    <label class="form-label">邮箱地址</label>
    <validate-input
      :rules="emailRules"
      v-model="emailVal"
      type="text"
      placeholder="请输入邮箱" />
  </div>
  <div class="mb-3">
    <label class="form-label">密码</label>
    <validate-input
      :rules="passwordRules"
      v-model="passwordVal"
      type="password"
      placeholder="请输入密码" />
  </div>
  <template #submit>
    <span class="btn btn-danger">Submit</span>
  </template>
</ValidateForm>
```
### 传递参数，监听提交按钮
```ts
const emailRules: RulesProp = [
  { type: 'required', message: '请输入邮箱' },
  { type: 'email', message: '请输入正确的邮箱' }
]

const emailVal = ref('')

const passwordRules: RulesProp = [
  { type: 'required', message: '请输入密码' },
  { type: 'password', message: '密码以字母开头,长度在6~18之间,只能包含字母、数字和下划线' }
]

const passwordVal = ref('')

const onFormSubmit = (result: boolean) => {
  if (result) {
    console.log({
      email: emailVal.value,
      password: passwordVal.value
    })
  } else {
    console.error('表单验证失败')
  }
}
```
