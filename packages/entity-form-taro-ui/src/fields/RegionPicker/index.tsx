import React, { FC } from 'react'
import { Picker as AtPicker, Text } from '@tarojs/components'
import { RegisterFieldProps } from 'entity-form'
import { Base } from '../Base'

const covertStringToArr = (str: string, pattern = ',') => {
  return str.split(pattern).filter(n => n)
}

export const RegionPicker: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { label, required, icon, componentProps = {} } = field
  const { handlerBuilder } = result
  const data = result.helpers.getValue(name)
  const error = result.helpers.getError(name)
  const cityArr = covertStringToArr(data || '')
  const { disabled } = componentProps

  function onChange(e: any) {
    const value = e.detail.value.join(',')
    handlerBuilder.createChangeHandler(name)(value)
  }

  function getCity(data: string) {
    if (!data) return ''
    return data.split(',')[1]
  }

  return (
    <AtPicker {...componentProps} mode="region" value={cityArr} onChange={onChange}>
      <Base label={label || ''} required={required} error={error} icon={icon}>
        {!data && <Text className="placeholder-text">请选择</Text>}
        {disabled ? (
          <Text className="disable-text">{getCity(data)}</Text>
        ) : (
          <Text style={{ color: '#666' }}>{getCity(data)}</Text>
        )}
      </Base>
    </AtPicker>
  )
}
