import React from 'react'
import * as ReactDOM from 'react-dom'
import { IsNotEmpty } from 'class-validator'
import { entity, field, EntityForm } from 'entity-form'
import { registerAll } from 'entity-form-pristine'
import './index.css'

registerAll()

@entity('profile')
export class Profile {
  @field({
    value: '',
    label: 'age',
    component: 'Input',
  })
  age: string

  @field({
    label: 'gender',
    value: '',
    component: 'Input',
    type: 'Input',
  })
  gender: string
}

@entity('user-entity')
export class User {
  @field({
    value: '',
    label: 'username',
    component: 'Input',
  })
  @IsNotEmpty({ message: 'user name required' })
  username: string

  @field({
    label: 'Password',
    value: '',
    component: 'Input',
    type: 'password',
  })
  password: string

  @field({
    label: 'Intro',
    value: '',
    component: 'Textarea',
  })
  intro: string

  @field(() => Profile)
  profile: Profile

  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }
}

const App = () => {
  return (
    <div>
      <EntityForm entity={User}></EntityForm>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
