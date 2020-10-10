import { registerField, registerReset, registerSubmit, registerForm } from '../../../../dist'
import { Input } from './fields/Input'
import { Submit } from './fields/Submit'
import { Form } from './fields/Form'

export function registerAll() {
  registerSubmit(Submit)
  registerForm(Form)
  // registerReset(Rest)

  // 注册表单控件
  registerField('Input', Input)
}
