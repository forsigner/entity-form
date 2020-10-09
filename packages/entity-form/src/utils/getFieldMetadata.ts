import { fieldStore } from '../stores/fieldStore'
import { FieldMetadata } from '../types'

export function getFieldMetadata(fields: FieldMetadata[]) {
  let obj: any = {}

  for (const field of fields) {
    if (!field.isRef) {
      obj[field.name] = field
      continue
    }

    const isAry = Array.isArray(field.ref)
    const Ref = isAry ? field.ref[0] : field.ref
    const refFields = fieldStore.get(new Ref())
    const data = getFieldMetadata(refFields)
    obj[field.name] = isAry ? [data] : data
  }
  return obj
}
