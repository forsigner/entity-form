import React, { CSSProperties, FC } from 'react'
import { Image, View, Text } from '@tarojs/components'
import './index.scss'

interface BaseProps {
  label: string
  required?: boolean
  icon?: { src?: string; style?: CSSProperties }
  error?: string
}

export const Base: FC<BaseProps> = ({ required, label, icon, error, children }) => {
  return (
    <>
      <View className="field-item">
        <View className="field-label">
          <Text className={`text ${required ? 'required' : ''} `}>{label}</Text>
        </View>
        <View className="field-content">
          {children}
          {icon?.src && <Image src={icon.src} style={icon.style} className="field-icon" />}
        </View>
      </View>
      {error && <View className="field-error">* {error}</View>}
    </>
  )
}
