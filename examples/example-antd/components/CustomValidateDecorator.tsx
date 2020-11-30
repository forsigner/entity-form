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
