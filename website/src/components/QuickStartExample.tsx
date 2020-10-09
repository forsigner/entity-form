import React from 'react'
import { EntityForm, entity, field } from 'entity-form'
import { registerAll } from 'entity-form-pristine'

registerAll()

@entity('user-entity')
class User {
  @field({
    label: '用户名',
    value: '',
    component: 'Input',
  })
  username: string

  @field({
    label: '密码',
    value: '',
    component: 'Input',
    type: 'password',
  })
  password: string

  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }
}

export const QuickStartExample = () => {
  return (
    <div>
      <EntityForm entity={User}></EntityForm>
    </div>
  )
}
