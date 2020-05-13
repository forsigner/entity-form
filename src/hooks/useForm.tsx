import 'reflect-metadata'
import { useRef, useCallback, useEffect } from 'react'
import { useStore, Dispatch, Action, getState } from 'stook'
import { FormState, EntityType, Handlers, Actions, Result, Config } from '../types'
import { HandlerBuilder } from '../builders/HandlerBuilder'
import { ActionBuilder } from '../builders/ActionBuilder'
import { HelperBuilder } from '../builders/HelperBuilder'
import { Validator } from '../Validator'
import { entityStore, fieldStore } from '../stores'
import {
  uuid,
  getInitialState,
  getChangedNames,
  getFieldMetadata,
  emitFieldUpdate,
  onFieldUpdate,
  emitter,
} from '../utils'

/**
 *
 * useForm hooks
 * @generic T Entity Type
 * @param Entity
 * @param config
 */
export function useForm<T = any>(Entity: EntityType<T>, config: Config<T> = {}) {
  const instanceRef = useRef<T>(new Entity())
  const instance = instanceRef.current
  const metaState = getInitialState(instance, config)
  const initialState = useRef<FormState<T>>(metaState)
  const formName = entityStore.get(Entity)
  const name = useRef(config.name || formName || `entity_form_${uuid()}`)

  // eslint-disable-next-line
  const [state, set] = useStore(name.current, initialState.current)

  const setState: Dispatch<Action<FormState<T>>> = (act: any) => {
    // TODO: handle any
    let prevState = getState(name.current)
    const nextState: any = set(act)
    const names = getChangedNames(prevState, nextState)
    emitFieldUpdate(names)
  }

  const validator = new Validator(name.current, Entity, config)

  const actionBuilder = new ActionBuilder(name.current, setState, initialState.current, validator)

  const actions: Actions<T> = {
    setValues: actionBuilder.setValues,
    setTouched: actionBuilder.setTouched,
    setErrors: actionBuilder.setErrros,
    setVisibles: actionBuilder.setVisibles,
    setEnums: actionBuilder.setEnums,
    setFormState: setState,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm: actionBuilder.resetForm,
    submitForm: () => {}, // initial
    validateForm: actionBuilder.validateForm,
    validateField: actionBuilder.validateField,
  }

  const handlerBuilder = new HandlerBuilder(
    name.current,
    actions,
    setState,
    validator,
    config,
    instance,
  )
  const submitHandler = handlerBuilder.createSubmitHandler()

  const handlers: Handlers = {
    handleBlur: useCallback(handlerBuilder.createBlurHandler(), []),
    handleChange: useCallback(handlerBuilder.createChangeHandler(), []),
    handleSubmit: submitHandler,
  }

  actions.submitForm = submitHandler

  const helpers = new HelperBuilder(name.current, actions)
  const fields = fieldStore.get(instance)

  const result: Result<T> = {
    state,
    handlers,
    actions,
    helpers,
    handlerBuilder,
    instance,
    fieldsMetadata: getFieldMetadata(fields),
  }

  // 处理联动逻辑
  useEffect(() => {
    const effects = (instance as any).effects
    effects && effects(actions)

    onFieldUpdate(names => {
      for (const name of names) {
        emitter.emit(name)
      }
    })
  }, [])

  return result
}
