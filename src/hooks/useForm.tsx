import 'reflect-metadata'
import { useRef, useCallback } from 'react'
import { useStore, Dispatch, Action } from 'stook'
import { FormState, EntityType, Handlers, Actions, Result, Config } from '../types'
import { HandlerBuilder } from '../builders/HandlerBuilder'
import { ActionBuilder } from '../builders/ActionBuilder'
import { HelperBuilder } from '../builders/HelperBuilder'
import { Validator } from '../Validator'
import { entityStore, fieldStore } from '../stores'

import { uuid, getInitialState, getFieldMetadata } from '../utils'
import { forms } from '../forms'

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
  const { name: entityFormName, entityConfig } = entityStore.get(Entity)
  const name = useRef(config.name || entityFormName || `entity_form_${uuid()}`)
  const initialState = useRef<FormState<T>>({
    ...metaState,
    name: name.current,
    entityConfig,
  })

  // eslint-disable-next-line
  const [state, set] = useStore(name.current, initialState.current)

  // TODO:
  const setState: Dispatch<Action<FormState<T>>> = (act: any) => {
    set(act)
  }

  const validator = new Validator(name.current, Entity, config)
  const actionBuilder = new ActionBuilder(name.current, setState, initialState.current, validator)

  const actions: Actions<T> = {
    setValues: actionBuilder.setValues,
    setToucheds: actionBuilder.setToucheds,
    setDisableds: actionBuilder.setDisableds,
    setErrors: actionBuilder.setErrors,
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
    entity: Entity,
    state,
    handlers,
    actions,
    helpers,
    handlerBuilder,
    instance,
    fieldsMetadata: getFieldMetadata(fields),
  }

  forms.setResult(name.current, result)

  return result
}
