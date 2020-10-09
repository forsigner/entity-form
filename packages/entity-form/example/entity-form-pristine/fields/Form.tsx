import React, { FC } from 'react'
import { RegisterFormProps } from '../../..'

export const Form: FC<RegisterFormProps> = (props) => {
  return <form {...props}>{props.children}</form>
}
