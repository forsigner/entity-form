import React, { FC } from 'react'
import { Picker as AtPicker, Text } from '@tarojs/components'
import { RegisterFieldProps } from 'entity-form'
import { Base } from '../Base'

export const Picker: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { label, required, icon, componentProps = {} } = field
  const { handlerBuilder } = result
  const value = result.helpers.getValue(name)
  const error = result.helpers.getError(name)
  const disabled = result.helpers.getDisabled(name)
  // const { disabled } = componentProps
  const enumData = result.helpers.getEnum(name)
  const range = enumData.map((i) => i.label)
  const index = enumData.findIndex((i) => i.value === value)

  if (index > -1) {
    componentProps.value = index
  }

  function onChange(e) {
    const index = Number(e.detail.value)
    handlerBuilder.createChangeHandler(name)(enumData[index].value)
  }

  return (
    <AtPicker
      disabled={disabled}
      mode="selector"
      {...componentProps}
      range={range}
      onChange={onChange}
    >
      <Base label={label || ''} required={required} error={error} icon={icon}>
        {!value && <Text className="placeholder-text">请选择</Text>}
        {disabled ? (
          <Text className="disable-text">{range[index]}</Text>
        ) : (
          <Text style={{ color: '#666' }}>{range[index]}</Text>
        )}
      </Base>
    </AtPicker>
  )
}
