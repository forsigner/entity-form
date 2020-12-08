import React, { FC, memo } from 'react'
import { Helper } from '../../Helper'
import get from 'lodash.get'
import { FieldProps, RegisterFieldProps } from '../../types'
import { handleFieldMemo } from '../../utils'
import { DefaultInput } from '../DefaultInput'

export const EntityField: FC<FieldProps> = memo((props) => {
  const { field, result } = props
  const { handleBlur, handleChange } = result.handlers

  const fieldProps: RegisterFieldProps = {
    value: get(result.state.values, field.name),
    name: field.name,
    field,
    result,
    handleBlur,
    handleChange,
  }

  if (field.component) {
    const Cmp =
      typeof field.component === 'string' ? Helper.FieldStore[field.component] : field.component

    return <Cmp {...fieldProps} />
  }

  return <DefaultInput {...fieldProps}></DefaultInput>
}, handleFieldMemo)
