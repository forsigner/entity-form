import React, { FC } from 'react'
import { View } from '@styli/react'
import { RegisterFieldProps } from 'entity-form'

export const Textarea: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label } = field
  const { handlerBuilder } = result
  const error = result.helpers.getError(name);
  const value = result.helpers.getValue(name)

  return (
    <div>
      <span>{label}</span>
      <textarea
        {...componentProps}
        value={value}
        onChange={handlerBuilder.createChangeHandler(name)}
      ></textarea>
      {error && <View red>{error}</View>}
    </div>
  )
}
