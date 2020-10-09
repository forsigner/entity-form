import { entity, field } from 'entity-form'
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator'

@entity('entd-entity')
export class AntdEntity {
  @field({
    value: '',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
      prefix: '@',
    },
    label: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @field({
    value: '',
    component: 'Input',
    componentProps: { placeholder: '请输入用户名', type: 'password' },
    label: '密码',
  })
  password: string

  @field({
    value: '',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'xxx',
      formatter: (value: number) => `$ ${value}`,
    },
    label: '金额',
  })
  money: string

  @field({
    value: 3,
    component: 'Rate',
    label: '评分',
  })
  rate: string

  @field({
    value: 'Apple',
    component: 'Radio',
    label: '水果',
    enum: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
  })
  fruite: string

  @field({
    value: ['red'],
    component: 'Checkbox',
    label: '颜色',
    enum: [
      { label: '红色', value: 'red' },
      { label: '绿色', value: 'green' },
      { label: '黄色', value: 'yellow' },
    ],
  })
  colors: string[]

  @field({
    value: false,
    component: 'SingleCheckbox',
    label: '是否同意',
  })
  agree: boolean

  @field({
    value: false,
    component: 'Switch',
    label: '开关',
  })
  closed: boolean

  @field({
    value: 10,
    component: 'Slider',
    label: 'Slider',
  })
  slider: boolean

  @field({
    value: '',
    component: 'Mentions',
    enum: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ],
  })
  mentions: string

  @field({
    value: new Date(),
    component: 'DatePicker',
    label: '日期',
  })
  date: Date

  @field({
    value: new Date(),
    component: 'DatePicker',
    componentProps: { picker: 'week' },
    label: 'Week',
  })
  week: Date

  @field({
    value: new Date(),
    component: 'DatePicker',
    componentProps: { picker: 'month' },
    label: 'Week',
  })
  month: Date

  @field({
    value: [new Date(), new Date()],
    component: 'RangePicker',
    // componentProps: { picker: 'month' },
    label: 'RangePicker',
  })
  range: Date[]

  onSubmit(values: AntdEntity) {
    console.log('values:', values)
  }
}
