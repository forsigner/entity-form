import { getState } from 'stook'
import { validateOrReject, ValidationError } from 'class-validator'
import isPromise from 'is-promise'
import deepmerge from 'deepmerge'
import { plainToClass } from 'class-transformer'
import set from 'lodash.set'
import { Errors, FormState, Actions, Config } from './types'

export class Validator<T> {
  constructor(private key: string, private Model: any, private config: Config<T>) {}

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
    isRoot = false,
  ): Errors<T> {
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

        this.formatErrorsFromMeta(error.children, errors, key, false)
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
    const state = getState(this.key) as FormState<T>
    const values: any = plainToClass(this.Model, state.values)
    try {
      await validateOrReject(values)
      return {} as Errors<T>
    } catch (errors) {
      return this.formatErrorsFromMeta(errors, {}, '', true)
    }
  }

  private async runValidateFn(): Promise<Errors<T>> {
    const { config } = this
    const state = getState(this.key) as FormState<T>
    if (!config.validate) return {}

    // function validate
    let validateFnErrors = config.validate(state.values)

    // sync validate
    if (!isPromise(validateFnErrors)) {
      return validateFnErrors
    }

    try {
      return await validateFnErrors
    } catch {
      return {}
    }
  }

  validateForm = async (): Promise<Errors<T>> => {
    const [error1, error2] = await Promise.all([this.runValidateMeta(), this.runValidateFn()])
    return deepmerge<Errors<T>>(error1, error2)
  }
}
