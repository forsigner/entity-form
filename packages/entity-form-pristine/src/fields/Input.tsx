import React, { FC } from 'react'
import { RegisterFieldProps } from 'entity-form'
import { View, Text } from '@styli/react'

export const Input: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label, type } = field
  const { handlerBuilder } = result
  const error = result.helpers.getError(name)
  const value = result.helpers.getValue(name)

  return (
    <View>
      <Text>{label}</Text>
      <input
        {...componentProps}
        type={type || componentProps.type || 'text'}
        value={value}
        onChange={handlerBuilder.createChangeHandler(name)}
      />
      {error && <View red>{error}</View>}
    </View>
  )
}
