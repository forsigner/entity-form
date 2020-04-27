import React, { FC } from 'react'
import { Rate as AntdRate } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from '../../entity-form'

export const Rate: FC<RegisterFieldProps> = props => {
  return (
    <FormItem {...props}>
      <AntdRate count={10} />
    </FormItem>
  )
}
