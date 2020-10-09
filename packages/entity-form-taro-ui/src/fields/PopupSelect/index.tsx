import React, { FC, useEffect, useState } from 'react'
import { RegisterFieldProps } from 'entity-form'
import { View, Text, Image } from '@common/styli/taro'
import { AtActionSheet } from 'taro-ui'
import produce from 'immer'
import './index.scss'
import { IMAGEs } from '@common/images.constant'

export const PopupSelect: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const [isOpened, setIsOpened] = useState(false)
  const { componentProps = {}, label } = field
  const { handlerBuilder } = result
  const value = result.helpers.getValue(name)
  const [values, setValues] = useState<string[]>(value.length ? value : [])
  const error = result.helpers.getError(name)
  const data = result.helpers.getEnum(name)

  // 把 isOpened 设置 data
  useEffect(() => {
    result.actions.setDatas({ [name]: isOpened })
  }, [isOpened])

  function click(e) {
    // modalService.openModalModalSelect()
    // e.stopPropagation()
    // e.preventDefault()
    setIsOpened(true)
  }

  function close(e) {
    if (e) e.stopPropagation()
    setIsOpened(false)
  }

  function onChange(value: string) {
    const nextValues = produce(values, (draft) => {
      const index = values.indexOf(value)
      if (index == -1) {
        draft.push(value)
      } else {
        const index = draft.indexOf(value)
        draft.splice(index, 1)
      }
    })

    setValues(nextValues)
    handlerBuilder.createChangeHandler(name)(nextValues)
  }

  const renderValues = (values: string[]) => {
    if (!values.length) {
      return '请选择'
    }
    return (
      <View>
        {data
          .filter((i) => values.includes(i.value))
          .map((item) => (
            <View style={{ color: '#666' }} key={item.value}>
              {item.label}
            </View>
          ))}
      </View>
    )
  }

  return (
    <View pr-18 py-16 between onClick={click}>
      <Text>{label}</Text>
      {!!values.length && renderValues(values)}
      {!values.length && (
        <Text text-13 color="#bbb">
          请选择
        </Text>
      )}

      <AtActionSheet isOpened={isOpened} onCancel={close} onClose={close}>
        <View px-10 py-20>
          <View textCenter relative>
            <Text text-16 fontBold>
              {label} (可多选)
            </Text>
            <Image
              onClick={close}
              s-14
              absolute
              style={{ right: '12px', top: '12' }}
              src={IMAGEs.CLOSE_DEEP}
            ></Image>
          </View>

          {!data.length && (
            <Text text-15 textCenter style={{ color: '#999' }}>
              可选场次已被选完
            </Text>
          )}
          {data.map((item) => {
            const selected = values.includes(item.value)
            return (
              <View
                // selected={values.includes(item.value)}
                // onChange={(e) => onChange(item.value, e)}
                mx-6
                my-10
                py-10
                onClick={() => onChange(item.value)}
                key={item.value}
                style={{
                  color: selected ? '#fff' : '#333',
                  background: selected ? '#FF5F00' : '#f5f5f5',
                }}
              >
                <Text text-15>{item.label}</Text>
              </View>
            )
          })}

          <View center pt-10>
            <View className="single-btn orange submit-btn" onClick={close}>
              确定
            </View>
          </View>
        </View>
      </AtActionSheet>
    </View>
  )
}
