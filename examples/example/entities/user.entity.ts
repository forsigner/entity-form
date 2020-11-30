import { entity, field } from 'entity-form'
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value.length > relatedValue.length
          )
        },
      },
    })
  }
}

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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

@entity('user-entity')
export class UserEntity {
  @field({
    value: 'username',
    component: 'Input',
    label: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  // @field({
  //   value: '',
  //   component: 'Input',
  //   label: '邮箱',
  // })
  // @IsNotEmpty({ message: '邮箱不能为空' })
  // @IsEmail({ allow_display_name: true }, { message: '邮箱格式不正确' })
  // @MinLength(6, { message: '长度必须大于5' })
  // email: string

  // @field({
  //   value: '',
  //   component: 'Input',
  //   label: '工作',
  // })
  // @IsLongerThan('email', { message: 'hahaha' })
  // job: string

  // @field({
  //   value: ['red'],
  //   component: 'Checkbox',
  //   label: '颜色',
  //   enums: [
  //     { label: '红色', value: 'red' },
  //     { label: '绿色', value: 'green' },
  //   ],
  // })
  // colors: string[]

  // @field(() => Address)
  // address: Address

  // onSubmit(values: UserEntity) {
  //   console.log('values:', values)
  // }
}
