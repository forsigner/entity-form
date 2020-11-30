import * as React from 'react'
import { EntityForm, useForm } from '../../../../dist'
import { UserEntity } from '../entities/user.entity'

export const Basic = () => {
  const result = useForm(UserEntity, {
    // initValues(v) {
    //   console.log('v:', v)
    //   return { username: 'hhah' }
    // },
    // validate() {
    // return { username: 'error user' }
    // },
    onError(error) {},
    onSubmit(values) {
      console.log('values:', values)
    },
    onReset() {
      console.log('reset........')
    },
  })
  return <EntityForm use={result}></EntityForm>
}
