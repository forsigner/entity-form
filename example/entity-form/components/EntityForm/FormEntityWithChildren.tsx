import React, { FC } from 'react'
import { FormProps } from '../../types'
import { useForm } from '../../hooks/useForm'
import { FormHooksWithChildren } from './FormHooksWithChildren'

export const FormEntityWithChildren: FC<FormProps> = ({ entity, children }) => {
  const use = useForm(entity as any)
  return <FormHooksWithChildren use={use}>{children}</FormHooksWithChildren>
}
