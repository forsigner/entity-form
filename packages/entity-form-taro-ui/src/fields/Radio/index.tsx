import React, { FC } from 'react'
import { RegisterFieldProps } from 'entity-form'
import { Radio as AtRadio, RadioGroup, Label, BaseEventOrig, Text } from '@tarojs/components'
import { Base } from '../Base'

export const Radio: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label, required, icon } = field
  const { handlerBuilder } = result
  const value = result.helpers.getValue(name)
  const error = result.helpers.getError(name)
  const enumData = result.helpers.getEnum(name)

  function onChange(e: BaseEventOrig<any>) {
    handlerBuilder.createChangeHandler(name)(e.detail.value === 'true')
  }

  const { disabled } = componentProps
  return (
    <Base label={label || ''} required={required} error={error} icon={icon}>
      <RadioGroup onChange={onChange}>
        {enumData.map((item) => (
          <Label style={{ marginRight: '40rpx' }} for={item.value} key={item.value}>
            <AtRadio
              {...componentProps}
              color="#FF5F00"
              value={item.value}
              checked={value === item.value}
            >
              {disabled ? (
                <Text className="disable-text">{item.label}</Text>
              ) : (
                <Text className="placeholder-text" style={{ color: '#666666' }}>
                  {item.label}
                </Text>
              )}
            </AtRadio>
          </Label>
        ))}
      </RadioGroup>
    </Base>
  )
}
