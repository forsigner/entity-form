import { Result } from './types'

export class forms {
  private static store: any = {}

  static setResult(name: string, value: any) {
    forms.store[name] = value
  }

  static getResult(name: string): Result {
    return forms.store[name]
  }
}
