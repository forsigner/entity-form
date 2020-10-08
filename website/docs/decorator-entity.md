---
id: decorator-entity
title: '@entity'
sidebar_label: '@entity'
---

定义表单实体。

```ts title="user.entity.ts"
import { entity, field } from 'entity-form'

@entity('User', {
  showResetButton: false, // 默认 reset 按钮是隐藏的
  showSubmitButton: true, // 默认 submit 按钮是显示的
})
export class User {
  @field({ component: 'Input' })
  username: string

  @field({ component: 'Input', type: 'passord' })
  password: string
}
```
