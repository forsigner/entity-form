import React, { FC, memo, useEffect, useState } from 'react'
import { RegisterFieldProps } from 'entity-form'
import produce from 'immer'
import './index.scss'
import { Text, View } from '@common/styli/taro'

export const Tags: FC<RegisterFieldProps> = memo(({ field, result, name }) => {
  const { componentProps = {}, label, required, icon } = field
  const { handlerBuilder } = result
  const error = result.helpers.getError(name)
  const value = result.helpers.getValue(name) || ''
  const data = result.helpers.getEnum(name)
  const [values, setValues] = useState<string[]>(value.length ? value.split(',') : [])

  useEffect(() => {
    if (!value) return
    setValues(value.length ? value.split(',') : [])
  }, [value])

  function onChange(value: string, disabled: boolean) {
    if (disabled) return
    const nextValues = produce(values, (draft) => {
      const index = values.indexOf(value)
      if (index == -1) {
        draft.push(value)
      } else {
        draft.splice(index, 1)
      }
    })

    setValues(nextValues)
    handlerBuilder.createChangeHandler(name)(nextValues.join(','))
  }

  return (
    <View mt-10>
      <Text text-16 px-2>
        {label}
      </Text>
      <View row wrap>
        {data.map((item) => {
          const selected = values.includes(item.value)
          const disabled = values.length > 4 && !values.includes(item.value)
          return (
            <View
              px-10
              py-2
              text-14
              m-4
              borderGray400-1
              rounded-4
              key={item.value}
              style={{
                background: disabled ? '#f1f1f1' : '#fff',
                borderRadius: '2px',
                color: selected ? '#FF5F00' : '#666',
                borderColor: selected ? '#FF5F00' : '#ddd',
              }}
              onClick={() => onChange(item.value, disabled)}
            >
              {item.value}
            </View>
          )
        })}
      </View>
    </View>
  )
})
