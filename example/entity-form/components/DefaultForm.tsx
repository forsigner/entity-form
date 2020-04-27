import * as React from 'react'
import { isDOM } from '../utils'
import { Helper } from '../../entity-form/Helper'
import { useFormContext } from '../../entity-form/hooks/useFormContext'

export const DefaultForm: React.FC<any> = props => {
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

  if (!isDOM) {
    return <>{children}</>
  }

  return React.createElement('form', props || {})
}
