---
id: use-form
title: 'useForm()'
sidebar_label: 'useForm()'
---

`useForm` 是一个自定义的 React Hooks，Entity Form 的最核心的 Api。

## 用法

```tsx
import React from 'react'
import { useForm } from 'entity-form'

export default () => {
  const result = useForm(UserEntity, {
    onError(errors) {
      console.log('errors:', errors)
    },
    onSubmit(values) {
      console.log('values:', values)
    },
  })
  return <EntityForm use={result}></EntityForm>
}
```

## Api 详解

> const result = useForm(entity, config)

## config

```ts
interface Config<T = any> {
  /** form unique name, optional */
  name?: string

  /**
   * Set form initialValues, it will override field initial value
   * @param defaultValues default values from field config
   */
  initValues?(defaultValues: T): T

  /**
   * form-level validation
   * @param values current values
   */
  validate?(values: T): Errors<T>

  /**
   * callback when form submit
   * @param values current values
   */
  onSubmit?(values: T): any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>): any

  /**
   * callback when reset form
   */
  onReset?(): any
}
```

## result

```ts
interface Result<T = any> {
  /** Form state */
  state: FormState<T>

  /** Actions to update state */
  actions: Actions<T>

  /** Some helpers */
  helpers: HelperBuilder<T>

  /** Form handlers, handleChange,handleBlur,handleSubmit */
  handlers: Handlers

  /** Builder to build handlers */
  handlerBuilder: HandlerBuilder<T>
}
```

### `state:FormState`

```ts
interface FormState<T = any> {
  values: T
  errors: Errors<T>
  toucheds: Toucheds<T>
  disableds: Disableds<T>
  visibles: Visibles<T>
  displays: Displays<T>
  statuses: Statuses<T>
  penddings: Penddings<T>
  enums: Enums<T>
  metas: Metas<T>
  datas: Datas<T>
  submitting: boolean
  validating: boolean
  dirty: boolean
  valid: boolean
  submitCount: number
  status: Status

  // form info
  name: string
  entityConfig: EntityConfig
}
```

### `actions:Actions`

```ts
interface Actions<T = any> {
  setValues(fn: ValuesFn<T>): void
  setToucheds(fn: TouchedsFn<T>): void
  setDisableds(fn: DisabledsFn<T>): void
  setVisibles(fn: VisiblesFn<T>): void
  setErrors(fn: ErrorsFn<T>): void
  setEnums(fn: EnumsFn<T>): void

  setFormState: Dispatch<Action<FormState<T>>>

  setSubmitting(isSubmitting: boolean): void
  resetForm(): void
  submitForm(): void
  validateForm(): Promise<Errors<T>>
  validateField(name: string): Promise<boolean>
}
```

### `helpers:Helpers`

```ts
interface Helpers<T = any> {
  getValue(name: string): any
  getError(name: string): any
  getVisible(name: string): boolean
  getTouched(name: string): boolean
  getDisabled(name: string): boolean
  getDisplay(name: string): boolean
  getStatus(name: string): any
  getPendding(name: string): boolean
  getEnum(name: string): Enum
  getMeta(name: string): any
  getData(name: string): any
  getFieldState(name: string): FieldState
}
```
