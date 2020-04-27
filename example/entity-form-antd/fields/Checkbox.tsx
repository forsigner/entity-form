import React, { FC } from 'react'
import { Checkbox as AntdCheckbox } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps, Enum, GqlConfig } from '../../entity-form'
import { useQuery } from 'stook-graphql'
import get from 'lodash.get'

const { Group } = AntdCheckbox

const GqlItem: FC<RegisterFieldProps> = props => {
  const gql = props.field.gql as GqlConfig
  const { name, result, value } = props
  const { loading, data = [] } = useQuery(gql.query, gql.variables || {})

  if (loading) return null
  let enumData: Enum
  if (typeof gql.mapToEnum === 'function') {
    enumData = gql.mapToEnum(data)
  } else {
    const { value, label } = gql.mapToEnum
    enumData = data.map(i => ({ value: i[value], label: i[label] }))
  }

  function onChange(value: any) {
    result.handlerBuilder.createChangeHandler(name)(value)
  }

  return (
    <FormItem {...props}>
      <Group value={value} onChange={onChange}>
        {enumData.map(item => (
          <AntdCheckbox key={item.value.toString()} value={item.value}>
            {item.label}
          </AntdCheckbox>
        ))}
      </Group>
    </FormItem>
  )
}

export const Checkbox: FC<RegisterFieldProps> = props => {
  const { name, result, field } = props
  const gql = props.field.gql as GqlConfig
  const value = get(result.state.values, name)

  if (gql) return <GqlItem {...props}></GqlItem>

  const optionsData: Enum =
    typeof field.enum === 'function' ? field.enum() : field.enum || []

  function onChange(value: any) {
    result.handlerBuilder.createChangeHandler(name)(value)
  }

  return (
    <FormItem {...props}>
      <Group value={value} onChange={onChange}>
        {optionsData.map(item => (
          <AntdCheckbox key={item.value.toString()} value={item.value}>
            {item.label}
          </AntdCheckbox>
        ))}
      </Group>
    </FormItem>
  )
}
