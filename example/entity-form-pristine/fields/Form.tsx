import React, { FC } from 'react'
import { RegisterFormProps } from '../../entity-form/types'

export const Form: FC<RegisterFormProps> = props => {
  return <form {...props}>{props.children}</form>
}
