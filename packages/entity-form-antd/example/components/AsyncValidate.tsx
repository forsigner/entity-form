import React from 'react'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { EntityForm, entity, field, Field, Submit } from 'entity-form'

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
    value: 'name',
    component: 'Input',
    label: '用户名',
  })
  @AsyncMinLength(6, { message: '用户名不能小于6位' })
  username: string

  onSubmit(values: UserEntity) {
    console.log('values:', values)
  }

  onError(errors: any) {
    console.log('errors:', errors)
  }
}

export const AsyncValidate = () => {
  return (
    <EntityForm entity={UserEntity}>
      <Field name="username"></Field>
      <Submit></Submit>
    </EntityForm>
  )
}
