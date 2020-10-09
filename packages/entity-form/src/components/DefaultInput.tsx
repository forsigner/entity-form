import * as React from 'react'
import { isNative } from '../utils'
import { RegisterFieldProps } from '../types'

export const DefaultInput: React.FC<RegisterFieldProps> = props => {
  if (!isNative) {
    return <>你忘记指定component</>
  }

  const e = React.createElement
  const input = e('input', {
    key: props.name,
    name: props.name,
    value: props.value,
    onChange: props.handleChange,
    onBlur: props.handleBlur,
  })

  const label = e('label', null, [props.field.label + ': ' || '', input])

  return e('div', null, label)
}
