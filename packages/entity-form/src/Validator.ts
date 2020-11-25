import { getState } from 'stook'
import { validateOrReject, ValidationError } from 'class-validator'
import isPromise from 'is-promise'
import deepmerge from 'deepmerge'
import { plainToClass } from 'class-transformer'
import get from 'lodash.get'
import set from 'lodash.set'
import { Errors, FormState, Config } from './types'

export class Validator<T> {
  constructor(private formName: string, private Model: any, private config: Config<T>) {}

  private getKey(parentKey: string, property: any) {
    if (!parentKey) return property

    const isNumber = /^[0-9]*$/.test(property)

    if (!isNumber) return `${parentKey}.${property}`

    return `${parentKey}[${property}]`
  }

  // TODO: 太复杂，需要优化
  private formatErrorsFromMeta(
    validateMetaErrors: ValidationError[],
    errors: any = {},
    parentKey: string = '',
  ): Errors<T> {
    if (!Array.isArray(validateMetaErrors)) {
      console.warn(validateMetaErrors)
      return {}
    }

    for (const error of validateMetaErrors) {
      let { property, value } = error

      if (error.children.length) {
        let key = parentKey
        if (Array.isArray(value)) {
          key += property
        } else {
          const isNumber = /^[0-9]*$/.test(property)

          if (key) {
            key += isNumber ? `[${property}]` : `${property}`
          } else {
            key = property
          }
        }

        this.formatErrorsFromMeta(error.children, errors, key)
      } else {
        if (!error.constraints) continue
        const errorValues = Object.values(error.constraints)
        const key = this.getKey(parentKey, property)
        set(errors, key, errorValues[0])
      }
    }
    return errors
  }

  // class-validator validate
  private async runValidateMeta() {
    const state = getState(this.formName) as FormState<T>
    const values: any = plainToClass(this.Model, state.values)
    try {
      await validateOrReject(values)
      return {} as Errors<T>
    } catch (errors) {
      return this.formatErrorsFromMeta(errors, {}, '')
    }
  }

  private async runValidateFn(): Promise<Errors<T>> {
    const { config } = this
    const state = getState(this.formName) as FormState<T>
    if (!config.validate) return {}

    // function validate
    let validateFnErrors = config.validate(state.values)

    // sync validate
    if (!isPromise(validateFnErrors)) {
      return validateFnErrors
    }

    try {
      return (await validateFnErrors) as any
    } catch {
      return {}
    }
  }

  /** TODO: traverse */
  filterInvisible(errors: any) {
    const newErrors: any = {}
    const { visibles } = getState(this.formName) as FormState<T>
    for (const key in errors) {
      if (get(visibles, key)) newErrors[key] = errors[key]
    }
    return newErrors
  }

  validateForm = async (): Promise<Errors<T>> => {
    const [error1, error2] = await Promise.all([this.runValidateMeta(), this.runValidateFn()])
    const errors = deepmerge<Errors<T>>(error1, error2)
    return this.filterInvisible(errors)
  }
}
