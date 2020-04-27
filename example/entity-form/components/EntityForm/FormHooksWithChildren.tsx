import React, { FC, Fragment } from 'react'
import { Helper } from '../../Helper'
import { FormProps } from '../../types'
import { formContext } from '../../formContext'
import { DefaultForm } from '../DefaultForm'

export const FormHooksWithChildren: FC<FormProps> = ({ use, children }) => {
  if (!use) return null
  const { Provider } = formContext

  return (
    <Provider value={use}>
      <DefaultForm onSubmit={use.handlers.handleSubmit}>{children}</DefaultForm>
    </Provider>
  )
}
