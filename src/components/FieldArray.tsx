import React, { FC, Fragment } from 'react'
import get from 'lodash.get'
import { Field } from './Field'
import { Button, Table } from 'antd'
import { PlusOutlined, DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { useFormContext } from '../hooks/useFormContext'

interface Porps {
  name: string
  children: any[]
}

export const FieldArray: FC<Porps> = props => {
  const { name } = props
  const result = useFormContext()
  const arrayHelper = result.helpers.createArrayHelper(name)
  const arr = get(result.state.values, name) as any[]
  const names = ['key', 'value']
  const fieldmeta = get(result.fieldsMetadata, name)[0]
  const defaultItem = Object.keys(fieldmeta).reduce(
    (r, c) => ({ ...r, [c]: fieldmeta[c].value }),
    {} as any,
  )

  const add = () => {
    arrayHelper.push(defaultItem)
  }

  const columns = Object.keys(fieldmeta).reduce(
    (r, c) => [
      {
        title: fieldmeta[c].label,
        dataIndex: fieldmeta[c].name,
        key: fieldmeta[c].name,
      },
      ...r,
    ],
    [
      {
        title: '操作',
        dataIndex: 'tabel_action',
        key: 'tabel_action',
        render: (value: any, record: any, index: number) => {
          return (
            <div style={{ marginBottom: '25px' }}>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => arrayHelper.remove(index)}
              ></Button>
              &nbsp;&nbsp;
              <Button
                shape="circle"
                icon={<DownOutlined />}
                disabled={arrayHelper.isLast(index)}
                onClick={() => arrayHelper.swap(index, index + 1)}
              ></Button>
              &nbsp;&nbsp;
              <Button
                shape="circle"
                icon={<UpOutlined />}
                disabled={arrayHelper.isFirst(index)}
                onClick={() => arrayHelper.swap(index, index - 1)}
              ></Button>
            </div>
          )
        },
      },
    ] as any,
  )

  const dataSource = arr.map((item, index) => {
    return names.reduce((r, c) => {
      r[c] = <Field key={c} name={`${name}[${index}].${c}`}></Field>
      return r
    }, {} as any)
  })

  return (
    <Fragment>
      <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
      <Button shape="circle" icon={<PlusOutlined />} onClick={add}></Button>
    </Fragment>
  )
}
