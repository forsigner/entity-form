import { registerField, registerReset, registerSubmit, registerForm } from '../entity-form'
import { Input } from './fields/Input'
import { InputNumber } from './fields/InputNumber'
import { Radio } from './fields/Radio'
import { Checkbox } from './fields/Checkbox'
import { SingleCheckbox } from './fields/SingleCheckbox'
import { Rate } from './fields/Rate'
import { Select } from './fields/Select'
import { Rest } from './fields/Reset'
import { Submit } from './fields/Submit'
import { Form } from './fields/Form'

export function registerAll() {
  // registerForm(Form)
  registerSubmit(Submit)
  registerReset(Rest)

  // 注册表单控件
  registerField('Input', Input)
  registerField('InputNumber', InputNumber)
  registerField('Radio', Radio)
  registerField('Checkbox', Checkbox)
  registerField('SingleCheckbox', SingleCheckbox)
  registerField('Rate', Rate)
  registerField('Select', Select)
}
