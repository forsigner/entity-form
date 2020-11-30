import * as React from 'react'
import { EntityForm, Field, useFormContext, ActionBuilder } from 'entity-form'
import { UserEntity } from '../entities/user.entity'

const Toggle = () => {
  const { actions } = useFormContext<UserEntity>()
  function toggle() {
    // actions.setFormState(state => {
    //   state.status = state.status === 'editable' ? 'disabled' : 'editable'
    // })
    // actions.validateForm()
    actions.validateField('username')
  }

  return (
    <button type="button" onClick={toggle}>
      切换
    </button>
  )
}

export const CustomLayout = () => {
  return (
    <EntityForm entity={UserEntity}>
      <Field name="username" />
      <Field name="email" />
      <Field name="job" />
      <button type="submit">提交</button>
      <Toggle></Toggle>
    </EntityForm>
  )
}
