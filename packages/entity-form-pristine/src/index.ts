import { registerField, registerForm } from 'entity-form'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
// export { entity, field, EntityForm, Field, useForm } from 'entity-form'

export function registerAll() {
  registerForm(Form)

  // 注册表单控件
  registerField('Input', Input)
  registerField('Textarea', Textarea)
}
