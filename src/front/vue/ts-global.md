---
title: vue3+ts全局方法的使用
category:
  - Vue
  - TypeScript
tag:
  - globalProperties
date: 2023-09-05
---

## 问题
- 在vue3+ts中直接使用全局方法会报错
### js写法
```ts
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance() // 类型“ComponentInternalInstance | null”上不存在属性“proxy”。
```
### 引入类型
```ts
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
```
### 使用出错
- 类型“ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>”上不存在属性“$dateFormat”。
```vue
{{ proxy?.$dateFormat(date) }}
```

## 正确示例
### 创建全局方法
```ts
app.config.globalProperties.$dateFormat = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN')
}
```
### 创建```useCurrentInstance.ts```文件
```ts
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

export const useCurrentInstance = () => {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const proxy = appContext.config.globalProperties
  return {
    proxy
  }
}
```
### 在组件中使用
```vue
<template>
  <div>
    {{ proxy?.$dateFormat(date) }}
  </div>
</template>

<script setup lang="ts">
import { useCurrentInstance } from '@/hooks/useCurrentInstance'

const { proxy } = useCurrentInstance()
</script>
```