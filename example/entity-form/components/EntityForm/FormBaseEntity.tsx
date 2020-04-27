import React, { FC } from 'react'
import { FormProps } from '../../types'
import { useForm } from '../../hooks/useForm'
import { FormBaseHooks } from './FormBaseHooks'

export const FormBaseEntity: FC<FormProps> = ({ entity }) => {
  const use = useForm(entity as any)
  return <FormBaseHooks use={use}></FormBaseHooks>
}
