---
id: nested-object
title: 数组和嵌套对象
sidebar_label: 数组和嵌套对象
description: EntityForm 默认支持数组和嵌套对象
---

EntityForm 默认支持数组和嵌套对象。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import UserForm from '@site/src/components/UserForm';

<Tabs
defaultValue="apple"
values={[
{ label: 'Form UI', value: 'apple', },
{ label: 'user.entity.ts', value: 'orange', },
{ label: 'UserForm.tsx', value: 'banana', },
]
}>
<TabItem value="apple">
<UserForm />
</TabItem>
<TabItem value="orange">

```tsx
import { entity, field } from '/entity-form'

class Address {
  @field({
    value: '',
    component: 'Input',
    label: '省份',
  })
  province: string

  @field({
    value: '',
    component: 'Input',
    label: '城市',
  })
  city: string
}

@entity('user-entity')
export class UserEntity {
  @field({
    value: 'initial name',
    component: 'Input',
    label: '用户名',
  })
  username: string

  @field({
    value: '',
    component: 'Input',
    label: '邮箱',
  })
  email: string

  @field({
    value: '',
    component: 'Input',
    label: '工作',
  })
  job: string

  @field({
    value: ['red'],
    component: 'Checkbox',
    label: '颜色',
    options: [
      { label: '红色', value: 'red' },
      { label: '绿色', value: 'green' },
    ],
  })
  colors: string[]

  @field(() => Address)
  address: Address

  onSubmit(values: UserEntity) {
    console.log('values:', values)
  }
}
```

</TabItem>
<TabItem value="banana">

```tsx
import React from 'react'
import { EntityForm } from 'entity-form'

export default () => {
  return <EntityForm entity={User}></EntityForm>
}
```

</TabItem>
</Tabs>

## 配合 `<Field/>` 使用

EntityForm 使用 Lodash-like 用法设置 name:
....
