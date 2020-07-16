const NULL: any = null

export class forms {
  private static store: any = {}

  static setResult(name: string, value: any) {
    if (!forms.store[name]) {
      forms.store[name] = value
    }
  }

  static getResult(name: string) {
    if (!forms.store[name]) {
      forms.store[name] = NULL
    }

    return forms.store[name]
  }
}
