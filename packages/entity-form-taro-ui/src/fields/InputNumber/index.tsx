import React, { FC } from 'react'
import { RegisterFieldProps } from 'entity-form'
import { Input as AtInput, View } from '@tarojs/components'
import { Base } from '../Base'
import './index.scss'

export const InputNumber: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label, required, icon } = field
  const { handlerBuilder } = result
  const error = result.helpers.getError(name)
  const value = result.helpers.getValue(name)
  const { disabled } = componentProps

  return (
    <Base label={label || ''} required={required} error={error} icon={icon}>
      {disabled ? (
        <View className="disable-text">{value}</View>
      ) : (
        <AtInput
          {...componentProps}
          className="field-input"
          placeholderClass="placeholder-text"
          type="number"
          value={value}
          onInput={(e) => {
            const v = e.detail.value.length ? Number(e.detail.value) : undefined
            handlerBuilder.createChangeHandler(name)(v)
          }}
        />
      )}
    </Base>
  )
}
