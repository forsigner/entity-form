import React, { FC, Fragment } from 'react'
import { Result, FormProps, FieldMetadata } from '../../types'
import { fieldStore } from '../../stores/fieldStore'
import { EntityField } from './EntityField'
import { formContext } from '../../formContext'
import { Submit } from '../Submit'
import { Reset } from '../Reset'
import { DefaultForm } from '../DefaultForm'

function getJSX(fields: FieldMetadata[], result: Result, parent: string = '') {
  return fields.map(field => {
    const name = parent ? `${parent}.${field.name}` : field.name
    if (!field.isRef) {
      return (
        <EntityField
          key={name}
          name={name}
          field={{ ...field, name }}
          result={result}
        ></EntityField>
      )
    }

    const isAry = Array.isArray(field.ref)
    const Ref = isAry ? field.ref[0] : field.ref
    const refFields = fieldStore.get(new Ref())
    const parentName = isAry ? name + '[0]' : name
    return <Fragment key={field.name}>{getJSX(refFields, result, parentName)}</Fragment>
  })
}

export const FormBaseHooks: FC<FormProps> = ({ use }) => {
  if (!use) return null
  const { Provider } = formContext
  const { handlers } = use
  const { handleSubmit } = handlers
  const fields = fieldStore.get(use.instance)
  const jsxContent = getJSX(fields, use)

  return (
    <Provider value={use}>
      <DefaultForm onSubmit={handleSubmit}>
        {jsxContent}
        <Submit></Submit>
        <Reset></Reset>
      </DefaultForm>
    </Provider>
  )
}
