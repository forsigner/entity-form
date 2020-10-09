import React, { FC } from 'react'
import { AtRate } from 'taro-ui'
import { RegisterFieldProps } from 'entity-form'
import './index.scss'

export const Rate: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {} } = field
  const { handlerBuilder } = result
  const value = result.helpers.getValue(name)
  const { disabled } = componentProps

  const props = { onChange: handlerBuilder.createChangeHandler(name) }

  return <AtRate value={value || 0} {...componentProps} {...(disabled ? {} : props)} />
}
