---
id: progressive
title: 渐进式深入
sidebar_label: 渐进式深入
---

下面渐进式地了解一下 Entity Form 的用法。

## 实体

先定义表单 entity，entity 是表单的核心，里面承载了整个表单基本信息和结构。

```ts
import { entity, field } from 'entity-form'
import { EntityForm } from 'entity-form'

@entity('User')
class User {
  @field({ value: '', component: 'Input' })
  username: string

  @field({ value: '', component: 'Input', type: 'passord' })
  password: string

  // 可选
  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }
}
```

## 简单用法

```ts
export default () => {
  return <EntityForm entity={User}></EntityForm>
}
```

## 暴露 Hooks

## 自定义 Layout

## 完全自定义
