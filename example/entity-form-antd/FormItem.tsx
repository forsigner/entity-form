import React, { FC } from 'react'
import get from 'lodash.get'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'
import { Result, FieldConfig } from '../entity-form'

interface ItemProps extends FormItemProps {
  name: string
  type?: string
  result: Result
  field: FieldConfig
  children: any // TODO: handle any
}

export const FormItem: FC<ItemProps> = props => {
  const { name, children, result, field = {} } = props
  const { handlerBuilder, state } = result

  const fieldProps = {} as any

  if (!get(children, 'props.onChange')) {
    fieldProps.onChange = handlerBuilder.createChangeHandler(name)
  }

  if (!get(children, 'props.onBlur')) {
    fieldProps.onBlur = handlerBuilder.createBlurHandler(name)
  }

  if (children && !Reflect.has(children.props, 'value')) {
    fieldProps.value = get(state.values, name)
  }

  const itemProps = { required: field.required } as ItemProps
  if (field.showLabel) itemProps.label = field.label

  const visible = get(state.visibles, name)

  if (!children || visible === false) return null

  const validateProps = {} as FormItemProps
  const error = get(state.errors, name)
  const touched = get(state.toucheds, name)

  if (error && touched) {
    validateProps.validateStatus = 'error'
    validateProps.help = error
  }

  if (!error && touched) {
    validateProps.validateStatus = 'success'
    validateProps.hasFeedback = true
  }

  return (
    <Form.Item {...validateProps} {...itemProps}>
      {React.cloneElement(children as any, fieldProps)}
    </Form.Item>
  )
}
