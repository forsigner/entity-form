import { useRef } from 'react'
import { getInitialState } from '../utils'
import { Config, FormState } from '../types'

export function useInitialState<T = any>(config: Config<T> = {}): FormState<T> {
  const { entity: Entity, initialValues } = config
  const instanceRef = useRef<T>(Entity ? new Entity() : null)

  if (instanceRef) {
    return getInitialState(instanceRef.current, config)
  }

  return {
    values: initialValues || ({} as T),
    toucheds: {},
    disableds: {},
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
}
