import * as React from 'react'
import { EntityForm } from 'entity-form'
import { UserEntity } from '../entities/user.entity'

export const Basic = () => {
  return <EntityForm entity={UserEntity}></EntityForm>
}
