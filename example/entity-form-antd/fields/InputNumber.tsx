import React, { FC } from 'react'
import { InputNumber as AntdInputNumber } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from '../../entity-form'

export const InputNumber: FC<RegisterFieldProps> = props => {
  return (
    <FormItem {...props}>
      <AntdInputNumber style={{ width: '300px' }}></AntdInputNumber>
    </FormItem>
  )
}
