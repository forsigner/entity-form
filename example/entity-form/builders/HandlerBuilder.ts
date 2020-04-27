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

export class HandlerBuilder<T> {
  constructor(
    private key: string,
    private actions: Actions<T>,
    private setState: any,
    private validator: Validator<T>,
    private config: Config<T>,
    // TODO: handle any
    private instance: any,
  ) {}

  private flatObject(obj: any, parentKey = '', result = {}) {
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

  private checkVisible(draft: any) {
    // handle visible
    const flatVisible = this.flatObject(draft.visibles)

    for (const key of Object.keys(flatVisible)) {
      if (flatVisible[key] !== false) continue
      if (!key.includes('.')) {
        delete draft.values[key]
      } else {
        const arr = key.split('.')
        const last = arr.pop() as string
        delete get(draft.values, arr.join('.'))[last]
      }
    }
  }

  private updateBeforeSubmit(errors: Errors<T>) {
    const { actions, setState } = this
    const state = getState(this.key) as FormState<T>

    // update state
    const nextState = produce<FormState<T>, FormState<T>>(state, draft => {
      draft.errors = errors
      const isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.toucheds = touchAll(state.values)
      draft.submitCount += 1
      draft.submitting = true
      draft.dirty = true

      this.checkVisible(draft)

      if (!isValid) {
        const erorr = this.config.onError || this.instance.onError
        erorr && erorr(draft.errors, { state, actions })
      }

      if (isValid) {
        const submit = this.config.onSubmit || this.instance.onSubmit
        submit && submit(original(draft.values), { state, actions })
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
    const { setState } = this

    return async (e: FocusEvent<FieldElement>) => {
      const state = getState(this.key) as FormState<T>
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
      newState = produce<FormState<T>, FormState<T>>(state, draft => {
        set(draft.values as any, fieldName, value)
        this.checkVisible(draft)
      })

      setState({ ...newState })

      // validate only touched
      if (!isTouched(state.toucheds, fieldName)) return

      // setErrors
      const errors = await this.validator.validateForm()

      if (isEqual(errors, state.errors)) return

      const nextState = produce<FormState<T>, FormState<T>>(newState, draft => {
        // check from is valid
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }
}
