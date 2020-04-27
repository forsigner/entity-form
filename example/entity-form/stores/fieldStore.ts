import { FieldMetadata } from '../types'

class FieldStore {
  set(target: Object, name: string, value: FieldMetadata) {
    const values: any[] = this.get(target) || []
    values.push(value)
    Reflect.defineMetadata('field', values, target)
  }

  get(target: any): FieldMetadata[] {
    return Reflect.getMetadata('field', target)
  }
}

export const fieldStore = new FieldStore()
