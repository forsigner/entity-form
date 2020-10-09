import React, { FC, useEffect, useState } from 'react'
import { RegisterFieldProps } from 'entity-form'
import { uploadFile, pxTransform } from '@tarojs/taro'
import { View, Text } from '@common/styli/taro'
import { ImagePicker as IP, MatrixFile } from '@components/ImagePicker'
import './index.scss'

export const ImagePicker: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const uploadUrl = 'https://zjta.xoyo.com/api/upload-static'
  const [files, setFiles] = useState<MatrixFile[]>([])

  const { handlerBuilder, actions } = result
  const { label, tips, count } = field
  const error = result.helpers.getError(name)
  const value = result.helpers.getValue(name)

  // const { disabled } = componentProps

  // 初始化图片
  useEffect(() => {
    if (!value.length) return
    const initialFiles = value.split(',').map((url: string) => ({ source: 'remote', url }))
    setFiles(initialFiles)
  }, [value])

  async function getImagesURL(files: MatrixFile[]) {
    for (const [index, file] of files.entries()) {
      if (file.source === 'local') {
        const res: any = await uploadFile({ url: uploadUrl, filePath: file.url, name: 'file' })
        const url = JSON.parse(res.data).url
        files[index] = { url, source: 'remote' }
      }
    }

    return files
  }

  async function onChange(files: MatrixFile[]) {
    const maxSize = 1024 * 1024 * 3
    for (const item of files) {
      if (!item.file) continue

      if (item.file.size > maxSize) {
        actions.setErrors((e) => {
          e[name] = '图片大小不能大于3M'
        })
        return
      }

      if (/\.gif$/.test(item.file.path)) {
        actions.setErrors((e) => {
          e[name] = '不能上传gif图片'
        })
        return
      }
    }

    // setUploading(true)
    setFiles(files)

    try {
      const imgList = await getImagesURL(files)

      // 表单store
      handlerBuilder.createChangeHandler(name)(imgList.map((i) => i.url).join(','))
    } catch (error) {
      console.log('error:', error)
    } finally {
      //
      // setUploading(false)
    }
  }

  return (
    <View mt-10>
      <Text>
        {label}
        {tips && <Text text-14> ({tips})</Text>}
      </Text>
      <IP
        disabled={count === files.length}
        showRemoveBtn={true}
        count={count}
        files={files}
        onChange={onChange}
      ></IP>
      {error && (
        <Text text-11 ml-12 color="#ff5f00">
          {error}
        </Text>
      )}
    </View>
  )
}
