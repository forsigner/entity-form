import React, { FC } from 'react'
import { Checkbox } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from '../../entity-form'
import get from 'lodash.get'

export const SingleCheckbox: FC<RegisterFieldProps> = props => {
  // TODO: value bug
  // const { value } = props
  const value = get(props.result.state.values, props.name)
  function onChange(e: any) {
    const checked = e.target.checked
    props.result.handlerBuilder.createChangeHandler(props.name)(checked)
  }
  return (
    <FormItem {...props}>
      <Checkbox checked={value} onChange={onChange}></Checkbox>
    </FormItem>
  )
}
