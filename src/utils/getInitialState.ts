import set from 'lodash.set'
import { fieldStore } from '../stores/fieldStore'
import { Config, FormState, FieldMetadata } from '../types'

export function getInitialState<T = any>(instance: T, config: Config) {
  const state: FormState<T> = {
    values: {} as T,
    toucheds: {},
    errors: {},
    visibles: {},
    displays: {},
    statuses: {},
    penddings: {},
    enums: {},
    metas: {},
    datas: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    validating: false,
    status: 'editable',
    name: '',
    entityConfig: {} as any,
  }

  const fields = fieldStore.get(instance)
  const initialState = getState(fields, state, '')
  if (config.initValues) {
    initialState.values = config.initValues(state.values)
  }

  return initialState
}

function getState(fields: FieldMetadata[], state: FormState, parent = '') {
  for (const field of fields) {
    const name = parent ? `${parent}.${field.name}` : field.name
    if (!field.isRef) {
      const enumData = typeof field.enum === 'function' ? field.enum() : field.enum || []
      const visible = Reflect.has(field, 'visible') ? field.visible : true
      const display = Reflect.has(field, 'display') ? field.display : true
      const touched = Reflect.has(field, 'touched') ? field.touched : false
      const pendding = Reflect.has(field, 'pendding') ? field.pendding : false
      const status = Reflect.has(field, 'status') ? field.status : 'editable'
      const error = Reflect.has(field, 'error') ? field.error : null
      const data = Reflect.has(field, 'data') ? field.data : null

      set(state.values, name, field.value)
      set(state.visibles, name, visible)
      set(state.displays, name, display)
      set(state.toucheds, name, touched)
      set(state.penddings, name, pendding)
      set(state.statuses, name, status)
      set(state.errors, name, error)
      set(state.enums, name, enumData)
      set(state.metas, name, field)
      set(state.datas, name, data)
      continue
    }

    const isAry = Array.isArray(field.ref)
    const Ref = isAry ? field.ref[0] : field.ref
    const refFields = fieldStore.get(new Ref())
    const parentName = isAry ? name + '[0]' : name
    getState(refFields, state, parentName)
  }
  return state
}
