import React, { FC } from 'react'
import { RegisterFieldProps } from 'entity-form'

export const Submit: FC<RegisterFieldProps> = (props) => {
  return <button type="submit">{props.children || '提交'} </button>
}
