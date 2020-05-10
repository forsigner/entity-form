import React, { FC } from 'react'
import { FormProps } from '../../types'
import { FormBaseEntity } from './FormBaseEntity'
import { FormBaseHooks } from './FormBaseHooks'
import { FormEntityWithChildren } from './FormEntityWithChildren'
import { FormHooksWithChildren } from './FormHooksWithChildren'

export const EntityForm: FC<FormProps> = ({ use, entity, children }) => {
  if (use && entity) {
    throw new Error('can only configure one prop: use or entity ')
  }

  // has children
  if (children) {
    if (use) return <FormHooksWithChildren use={use}>{children}</FormHooksWithChildren>
    if (entity) return <FormEntityWithChildren entity={entity}>{children}</FormEntityWithChildren>

    throw new Error('required use or entity props')
  } else {
    if (use) return <FormBaseHooks use={use}></FormBaseHooks>
    if (entity) return <FormBaseEntity entity={entity}></FormBaseEntity>
    throw new Error('required use or entity props')
  }
}
