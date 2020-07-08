import produce from 'immer'
import { Dispatch, Action, getState } from 'stook'
import isEqual from 'react-fast-compare'
import set from 'lodash.set'
import get from 'lodash.get'
import { FormState, Errors, Toucheds, Visibles } from '../types'
import { Validator } from '../Validator'
import { checkValid, touchAll } from '../utils'

type ValuesFn<T> = T | ((prev: T) => T) | ((prev: T) => void)
type EnumsFn<T> = T | ((prev: T) => T) | ((prev: T) => void)

export class ActionBuilder<T> {
  constructor(
    private name: string,
    private setState: Dispatch<Action<FormState<T>>>,
    private initialValue: FormState<T>,
    private validator: Validator<T>,
  ) {}

  // TODO: 不一定要全量更新
  private getNextPartialState(value: any, type: string): any {
    let nextState: any

    const state = getState(this.name)

    // not function
    if (typeof value !== 'function') return value

    let useImmer = true

    const immerState = produce(state[type], (draft: any) => {
      const fnValue = value(draft)

      // use function return value
      if (fnValue && typeof fnValue === 'object') {
        nextState = fnValue
        useImmer = false
      }
    })

    if (useImmer) {
      nextState = immerState
    }

    return nextState
  }

  private runFn(fn: any, type: string) {
    const nextPartialState = this.getNextPartialState(fn, type)
    const nextState = produce<FormState<T>, FormState<T>>(getState(this.name), (draft: any) => {
      draft[type] = nextPartialState
    })

    // TODO:
    this.setState({ ...nextState })
    // this.setState(nextState)
  }

  setTouched = (fn: (touched: Toucheds<T>) => void) => {
    this.runFn(fn, 'touched')
  }

  setVisibles = (fn: (visibles: Visibles<T>) => void) => {
    this.runFn(fn, 'visibles')
  }

  setErrros = (fn: (errors: Errors<T>) => void) => {
    this.runFn(fn, 'errors')
  }

  setValues = (fn: ValuesFn<T>) => {
    this.runFn(fn, 'values')
  }

  setEnums = (fn: EnumsFn<T>) => {
    this.runFn(fn, 'enums')
  }

  setFormState = this.setState

  setSubmitting = (submitting: boolean) => {
    const nextState = produce<FormState<T>, FormState<T>>(getState(this.name), (draft) => {
      draft.submitting = submitting
    })
    this.setState({ ...nextState })
  }

  resetForm = () => {
    this.setState(this.initialValue)
  }

  validateForm = async () => {
    const state = getState(this.name)
    const errors = await this.validator.validateForm()
    if (isEqual(errors, state.errors)) return

    const nextState = produce<FormState<T>, FormState<T>>(state, (draft) => {
      draft.errors = errors
      draft.valid = checkValid(draft.errors)
      draft.toucheds = touchAll(state.values)
    })
    this.setState({ ...nextState })
  }

  /**
   * validate field
   * @param name field name
   * @return is filed valid
   */
  validateField = async (name: string): Promise<boolean> => {
    const state = getState(this.name)
    const errors = await this.validator.validateForm()
    const error = get(errors, name)
    if (isEqual(errors, state.errors)) {
      return !error
    }

    const nextState = produce<FormState<T>, FormState<T>>(state, (draft) => {
      draft.errors = errors
      draft.valid = checkValid(draft.errors)
      set(draft.toucheds, name, true)
    })
    this.setState({ ...nextState })
    return !error
  }
}
