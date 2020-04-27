import React, { FC, memo } from 'react'
import get from 'lodash.get'
import { Helper } from '../Helper'
import { FieldProps } from '../types'
import { handleFieldMemo } from '../utils/handleFieldMemo'
import { useFormContext } from '../hooks/useFormContext'
import { DefaultInput } from './DefaultInput'

interface Props {
  name: string
}

const FieldContent: FC<FieldProps> = memo(props => {
  const { field, result, name } = props
  const { state, handlers, handlerBuilder } = result
  const { values } = state
  const { handleChange, handleBlur } = handlers

  const value = get(values, name)
  let Cmp: any

  if (!field.component) {
    Cmp = DefaultInput
  } else if (typeof field.component === 'string') {
    Cmp = Helper.FieldStore[field.component]
  } else {
    Cmp = field.component
  }

  if (!Cmp) {
    Cmp = DefaultInput
  }

  return (
    <Cmp
      name={name}
      value={value}
      handleChange={handleChange}
      handleBlur={handleBlur}
      result={result}
      field={field}
    />
  )
}, handleFieldMemo)

export const Field: FC<Props> = memo(({ name }) => {
  const result = useFormContext()
  const { state, fieldsMetadata } = result
  const visible = get(state.visibles, name)

  if (visible === false) return null

  // TODO: too magic
  const field = get(fieldsMetadata, name.replace(/\[.*\]/, '[0]'))

  if (!field) {
    throw new Error(`${name} is not exist in entity`)
  }

  // TODO: 处理 array list
  if (name.includes('[]')) return null

  return <FieldContent name={name} field={field} result={result}></FieldContent>
})
