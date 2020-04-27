import { useContext } from 'react'
import { formContext } from '../formContext'
import { Result } from '../../entity-form/types'

export function useFormContext<T = any>() {
  return useContext(formContext) as Result<T>
}
