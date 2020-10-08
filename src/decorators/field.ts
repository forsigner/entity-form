import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { fieldStore } from '../stores/fieldStore'
import { FieldConfig, FieldMetadata } from '../types'

export declare type TypeFn = (returns?: void) => any

/**
 *
 * @param config  field config
 */
export function field<ComponentProps>(config?: FieldConfig<ComponentProps>): PropertyDecorator
export function field<ComponentProps>(
  typeFn?: TypeFn,
  config?: FieldConfig<ComponentProps>,
): PropertyDecorator
export function field(typeFn?: any, config?: any): PropertyDecorator {
  const isRef = typeof typeFn === 'function'

  return (target, key: any) => {
    const fieldConfig: FieldConfig = (isRef ? config : typeFn) || {}

    if (isRef) {
      // TODO: need refactor
      Type(Array.isArray(typeFn()) ? () => typeFn()[0] : typeFn)(target, key)
      ValidateNested()(target, key)
    }

    const showLabel = typeof fieldConfig.showLabel === 'boolean' ? fieldConfig.showLabel : true
    const value: FieldMetadata = { ...fieldConfig, isRef, name: key, showLabel, target }

    if (isRef) value.ref = typeFn()
    fieldStore.set(target, value)
  }
}
