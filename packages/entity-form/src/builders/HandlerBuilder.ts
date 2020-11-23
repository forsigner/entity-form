import { FocusEvent } from 'react'
import produce, { original } from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'
import isEqual from 'react-fast-compare'

import { FieldElement, FormState, Errors, Actions } from '../types'
import { Validator } from '../Validator'
import { checkValid } from '../utils/checkValid'
import { touchAll } from '../utils/touchAll'
import { isTouched } from '../utils/isTouched'
import { Config } from '../types'
import { getState } from 'stook'
import { HelperBuilder } from './HelperBuilder'

export class HandlerBuilder<T> {
  constructor(
    private key: string,
    private actions: Actions<T>,
    private helpers: HelperBuilder<T>,
    private setState: any,
    private validator: Validator<T>,
    private config: Config<T>,
    // TODO: handle any
    private instance: any,
    private fieldsMetadata: any,
  ) {}

  private flatObject(obj: any, parentKey = '', result = {} as any) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        this.flatObject(obj[key], key, result)
      } else {
        const cur = parentKey ? `${parentKey}.${key}` : key
        result[cur] = obj[key]
      }
    }
    return result
  }

  /**
   *
   * @param values exclude invisible values
   */
  private handleVisibleValues(values: any, visibles: any) {
    // handle visible
    const flatVisible = this.flatObject(visibles)

    for (const key of Object.keys(flatVisible)) {
      // 不处理 visible=false
      if (flatVisible[key] !== false) continue

      if (!key.includes('.')) {
        delete values[key]

        // 处理 nested object
      } else {
        const arr = key.split('.')
        const last = arr.pop() as string
        delete get(values, arr.join('.'))[last]
      }
    }
    return values
  }

  private updateBeforeSubmit(errors: Errors<T>) {
    const { setState } = this
    const state = getState(this.key) as FormState<T>

    // update state
    const nextState = produce<FormState<T>, FormState<T>>(state, (draft) => {
      draft.errors = errors
      const isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.toucheds = touchAll(state.values)
      draft.submitCount += 1
      draft.submitting = true
      draft.dirty = true

      if (!isValid) {
        const erorr = this.config.onError || this.instance.onError
        erorr && erorr(draft.errors)
      }

      if (isValid) {
        const submit = this.config.onSubmit || this.instance.onSubmit

        const finalValues = this.handleVisibleValues({ ...original(draft.values) }, draft.visibles)
        submit && submit(finalValues)
      }
    })

    setState({ ...nextState })
  }

  createSubmitHandler = () => {
    return async (e?: any) => {
      if (e && e.preventDefault) e.preventDefault()
      const errors = await this.validator.validateForm()
      this.updateBeforeSubmit(errors)
    }
  }

  createBlurHandler = (name?: string) => {
    return async (e: FocusEvent<FieldElement>) => {
      let fieldName: string
      if (name) {
        fieldName = name
      } else {
        if (e.persist) e.persist()

        // hack for some custom onChange, eg: Antd Select
        const node = typeof e === 'object' ? e.target : ({} as any)
        const { name } = node
        fieldName = name
      }

      this.actions.validateField(fieldName)
    }
  }

  createChangeHandler = (optName?: string) => {
    const { setState } = this
    return async (e?: any) => {
      const state = getState(this.key) as FormState<T>
      let fieldName: string = ''
      let value: any

      // hack for some custom onChange, eg: Antd Select
      if (optName) fieldName = optName

      if (typeof e === 'object' && e.target) {
        if (e && e.persist) e.persist()
        const { value: nodeValue, name } = e.target
        if (name) fieldName = name
        // value = nodeValue || checked
        value = nodeValue
      } else {
        value = e
      }

      let newState: FormState<T>

      // setValues first，do not block ui
      newState = produce<FormState<T>, FormState<T>>(state, (draft) => {
        set(draft.values as any, fieldName, value)
      })

      setState({ ...newState })

      // TODO: too magic
      const field = get(this.fieldsMetadata, fieldName.replace(/\[.*\]/, '[0]'))
      if (field.onChange) {
        field.onChange({
          value,
          state: newState,
          helper: this.helpers,
          actions: this.actions,
        })
      }

      // validate only touched
      if (!isTouched(state.toucheds, fieldName)) return

      // setErrors
      const errors = await this.validator.validateForm()

      if (isEqual(errors, state.errors)) return

      const nextState = produce<FormState<T>, FormState<T>>(newState, (draft) => {
        // check from is valid
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }
}
