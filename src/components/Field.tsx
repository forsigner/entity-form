import React, { FC, memo } from 'react'
import get from 'lodash.get'
import { Helper } from '../Helper'
import { FieldProps } from '../types'
import { handleFieldMemo } from '../utils/handleFieldMemo'
import { useFormContext } from '../hooks/useFormContext'
import { DefaultInput } from './DefaultInput'

interface Props {
  name: string
  componentProps?: any
  component?: any
  memo?: () => boolean
}

const FieldContent: FC<FieldProps> = memo((props) => {
  const { field, result, name, component, componentProps, memo } = props
  const { state, handlers } = result
  const { values } = state
  const { handleChange, handleBlur } = handlers

  const value = get(values, name)
  let Cmp: any

  if (component) {
    Cmp = component
  } else if (!field.component) {
    Cmp = DefaultInput
  } else if (typeof field.component === 'string') {
    Cmp = Helper.FieldStore[field.component]
  } else {
    Cmp = field.component
  }

  if (!Cmp) Cmp = DefaultInput
  const newProps: any = {
    name,
    value,
    handleChange,
    handleBlur,
    result,
    field,
    memo,
  }

  if (componentProps) newProps['componentProps'] = componentProps

  return <Cmp {...newProps} />
}, handleFieldMemo)

export const Field: FC<Props> = memo(({ name = '', component, componentProps, memo }) => {
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

  const props: any = {
    name,
    component,
    memo,
    field,
    result,
  }
  if (componentProps) props['componentProps'] = componentProps

  return <FieldContent {...props}></FieldContent>
})
