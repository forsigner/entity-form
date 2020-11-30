# Entity Form

## 安装

```bash
npm i entity-form
```

## 用法

我们用一个常用的登录表单开始，通常表单包含**用户名**和**密码**两个字段，下面代码展示 `entity-form` 的基本用法：

### 第一步: 定义实体

```ts
import { entity, field } from 'entity-form'

@entity('user-entity')
export class User {
  @field({ value: '', component: 'Input' })
  username: string

  @field({ value: '', component: 'Input', type = 'passord' })
  password: string

  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }
}
```

### 第二步: 绑定实体到 React 表单

```tsx
import React from 'react'
import { EntityForm } from 'entity-form'

export default () => {
  return <EntityForm entity={User}></EntityForm>
}
```
