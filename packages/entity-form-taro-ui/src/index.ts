import { registerField } from 'entity-form'
import { Textarea } from './fields/Textarea'
import { RegionPicker } from './fields/RegionPicker'
import { Picker } from './fields/Picker'
import { Radio } from './fields/Radio'
import { InputNumber } from './fields/InputNumber'
import { ImagePicker } from './fields/ImagePicker'
import { Rate } from './fields/Rate'
import { Tags } from './fields/Tags'
import { RadioTags } from './fields/RadioTags'
import { Input } from './fields/Input'
import { PopupSelect } from './fields/PopupSelect'

export function registerAll() {
  // 注册表单控件
  registerField('Input', Input)
  registerField('InputNumber', InputNumber)
  registerField('Picker', Picker)
  registerField('RegionPicker', RegionPicker)
  registerField('ImagePicker', ImagePicker)
  registerField('PopupSelect', PopupSelect)
  registerField('Textarea', Textarea)
  registerField('Radio', Radio)
  registerField('Rate', Rate)
  registerField('Tags', Tags)
  registerField('RadioTags', RadioTags)
}
