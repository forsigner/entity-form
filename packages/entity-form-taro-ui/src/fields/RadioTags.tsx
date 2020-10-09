import React, { FC } from 'react'
import { RegisterFieldProps } from 'entity-form'
// import { View } from '@common/styli/taro'
import { View } from '@common/styli/taro'

export const RadioTags: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { label } = field
  const { handlerBuilder } = result
  const value: string = result.helpers.getValue(name) || ''
  const error = result.helpers.getError(name)

  const data = field.enum as any[]

  function onChange(value: string, selected: boolean) {
    if (selected) {
      handlerBuilder.createChangeHandler(name)(value)
    }
  }

  return (
    <View p-8>
      <View text-15 black pl-8 pb-8>
        {label}
      </View>
      {data.map((item: any) => {
        const selected = value === item.value
        return (
          <View
            px-10
            py-8
            text-14
            mx-4
            my-8
            borderGray400-1
            rounded-4
            onClick={(e) => onChange(item.value, e)}
            style={{
              color: selected ? '#FF5F00' : '#666',
              borderColor: selected ? '#FF5F00' : '#ddd',
            }}
            key={item.value}
          >
            {item.label}
          </View>
        )
      })}

      {!!error && (
        <View pt-4 pl-6 color="#ff5f00">
          {error}
        </View>
      )}
    </View>
  )
}
