import React, { FC, Fragment } from 'react'
import { Helper } from '../Helper'
import { isNative } from '../utils'
import { useFormContext } from '../hooks/useFormContext'

interface ResetProps {}

export const Reset: FC<ResetProps> = ({ children }) => {
  const result = useFormContext()
  const { ResetComponent } = Helper
  if (ResetComponent) {
    return <ResetComponent resetForm={result.actions.resetForm}>{children}</ResetComponent>
  }

  if (isNative) {
    return <Fragment>Reset Component Not Register</Fragment>
  }

  return React.createElement(
    'button',
    {
      type: 'reset',
      onClick: result.actions.resetForm,
    },
    'Reset',
  )
}
