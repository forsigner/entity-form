---
id: decorator-field
title: '@field'
sidebar_label: '@field'
---

表单字段配置。

```ts title="user.entity.ts"
import { entity, field } from 'entity-form'

@entity('User')
export class User {
  @field({ component: 'Input' })
  username: string

  @field({ component: 'Input', type: 'passord' })
  password: string
}
```

## Field 配置

> @field(fieldConfig)


```ts
interface FieldConfig<ComponentProps = any> {
  label?: string

  /** shoud show label */
  showLabel?: boolean

  /** field description */
  description?: string

  /** initial value */
  value?: any

  /** initial display */
  display?: boolean

  /** initial visible */
  visible?: boolean

  /** initial status */
  status?: Status

  /** initial error */
  error?: string

  /** initial  touched*/
  touched?: boolean

  /** initial  disabled*/
  disabled?: boolean

  /** initial pendding */
  pendding?: boolean

  /** initial enum */
  enum?: Enum | (() => Enum)

  /** initial data */
  data?: any

  /** required for ui */
  required?: boolean

  order?: number

  component?: any

  componentProps?: ComponentProps

  gql?: GqlConfig

  onChange?: (...args: any[]) => any

  [key: string]: any
}
```
