import React, { FC } from 'react'
import { RegisterFieldProps } from '../../../../../dist'

export const Input: FC<RegisterFieldProps> = props => {
  const { result, handleBlur, handleChange, value, name } = props
  const { state } = result
  const { status } = state
  return (
    <div>
      <label>
        <span>{props.field.label}:</span>

        {status === 'preview' && <span>{props.value}</span>}

        {status !== 'preview' && (
          <input
            disabled={status === 'disabled'}
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </label>
    </div>
  )
}
