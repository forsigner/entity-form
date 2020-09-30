export * from './checkValid'
export * from './getFieldMetadata'
export * from './getInitialState'
export * from './handleFieldMemo'
export * from './isTouched'
export * from './touchAll'
export * from './uuid'

export const isNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative'
