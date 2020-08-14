import * as React from 'react'
import { isNative } from '../utils'
import { Helper } from '../Helper'
import { useFormContext } from '../hooks/useFormContext'

export const DefaultForm: React.FC<any> = (props) => {
  const { children } = props
  const { FormComponent } = Helper
  const result = useFormContext()

  if (FormComponent) {
    return (
      <FormComponent result={result} {...props}>
        {props.children}
      </FormComponent>
    )
  }

  if (isNative) {
    return children
  }

  return React.createElement('form', props || {})
}
