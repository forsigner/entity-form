---
id: validation
title: 校验
sidebar_label: 校验
---

EntityForm 使用 class-validator 校验表单，Entity 配合 class-validator 你可以轻松优雅地进行表单校验。如果你到后端也使用 class-validator 作为校验器，你可以轻松地保证前后端校验的一致性。

## 基本使用

```ts
import { IsNotEmpty, MinLength } from 'class-validator'

@entity('user-entity')
export class UserEntity {
  @field({
    value: '',
    component: 'Input',
    label: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @field({
    value: '',
    component: 'Input',
    label: '邮箱',
  })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @MinLength(6, { message: '长度必须大于5' })
  email: string
}
```

## 自定义校验器

最优雅的自定义校验的方式是: 自定义一个装饰器(Decorator)。这样你的代码更易复用、更干净简洁。

下面我们举个例子，假设我们要做一个登录表单，需要密码二次确认，这个一个很常见的需求，现在我们自定义一个装饰器叫 `@CompareField`:

```tsx
import React from 'react'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { EntityForm, entity, field } from 'entity-form'

export function CompareField(property: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'CompareField',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value === relatedValue
        },
      },
    })
  }
}

@entity('loginFormEntity')
export class LoginFormEntity {
  @field({
    value: '',
    component: 'Input',
    label: '密码',
  })
  password: string

  @field({
    value: '',
    component: 'Input',
    label: '确认密码',
  })
  @CompareField('password', { message: '两次密码不一致' })
  passwordConfirm: string

  onSubmit(values: LoginFormEntity) {
    console.log('values:', values)
  }
}

export const CustomValidateDecorator = () => {
  return <EntityForm entity={LoginFormEntity}></EntityForm>
}
```

:::important
因为 EntityForm 默认使用 class-validator 作为校验器，自定义校验实际上就是自定义 class-validator 的 decorator，详细可以看 class-validator 文档：[#custom-validation-decorators](https://github.com/typestack/class-validator#custom-validation-decorators)
:::

## 异步校验

异步校验是表单校验的经典问题，在 EntityForm 中，它并不比同步校验特殊太多，同样是推荐自定义一个装饰器。

看下面实例：

```tsx
import React from 'react'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { EntityForm, entity, field } from 'entity-form'

export function AsyncMinLength(len: number, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'AsyncMinLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
          await sleep(2000)
          return value.length >= len
        },
      },
    })
  }
}

@entity('UserEntity')
export class UserEntity {
  @field({
    value: '',
    component: 'Input',
    label: '用户名',
  })
  @AsyncMinLength(6, { message: '用户名不能小于6位' })
  username: string

  onSubmit(values: UserEntity) {
    console.log('values:', values)
  }
}

export const AsyncValidate = () => {
  return <EntityForm entity={UserEntity}></EntityForm>
}

```

## 手动触发

你可以使用 validateForm 触发表单级别的校验，为了更精细的控制表单，你可以使用 validateField 触发字段级别的校验。

### 触发整个表单

```tsx
actions.validateForm()
```

### 触发单个字段

```tsx
actions.validateField('username')
```

## 获取 errors 对象

`entity-form` 使用装饰器来校验字段：

```js
...
```
