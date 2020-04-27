import React, { FC, Fragment } from 'react'
import { Helper } from '../Helper'
import { isDOM } from '../../entity-form/utils'
import { useFormContext } from '../hooks/useFormContext'

interface SubmitProps {}

export const Submit: FC<SubmitProps> = ({ children }) => {
  const result = useFormContext()
  const { SubmitComponent } = Helper

  if (SubmitComponent) {
    return <SubmitComponent onSubmit={result.handlers.handleSubmit}>{children}</SubmitComponent>
  }

  if (!isDOM) {
    return <Fragment>Submit Component Not Register</Fragment>
  }

  return React.createElement(
    'button',
    {
      type: 'submit',
      onSubmit: result.handlers.handleSubmit,
    },
    'Submit',
  )
}
