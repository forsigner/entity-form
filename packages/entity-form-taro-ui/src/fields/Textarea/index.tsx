import React, { FC } from 'react'
import { AtTextarea } from 'taro-ui'
import { RegisterFieldProps } from 'entity-form'
import './index.scss'
import { View } from '@common/styli/taro'

export const Textarea: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label } = field
  const { handlerBuilder } = result
  const value = result.helpers.getValue(name)
  const error = result.helpers.getError(name)
  const display = result.helpers.getDisplay(name)

  const { disabled } = componentProps

  function onChange(e) {
    handlerBuilder.createChangeHandler(name)(e.trim())
  }

  if (!display) return null

  return (
    <View className="field-textarea">
      {!!label && <View className="field-textarea-label">{label}</View>}
      <View className="field-textarea-content">
        {disabled ? (
          <View className="textarea-disable-text">{value || '无'}</View>
        ) : (
          <AtTextarea
            {...componentProps}
            customStyle={{ background: '#fafafa', padding: '10px', border: 'none' }}
            className="field-text-area"
            placeholderClass="placeholder-text"
            height={320}
            value={value}
            onChange={onChange}
          />
        )}
      </View>
      {error && (
        <View text-12 color="#ff5f00">
          {error}
        </View>
      )}
    </View>
  )
}
