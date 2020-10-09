export class Helper {
  static FieldStore: any = {}
  static FormComponent: any
  static SubmitComponent: any
  static ResetComponent: any

  static registerField(name: string, cmp: any) {
    Helper.FieldStore[name] = cmp
  }

  static registerForm(cmp: any) {
    Helper.FormComponent = cmp
  }

  static registerSubmit(cmp: any) {
    Helper.SubmitComponent = cmp
  }

  static registerReset(cmp: any) {
    Helper.ResetComponent = cmp
  }
}

export const registerField = Helper.registerField
export const registerForm = Helper.registerForm
export const registerSubmit = Helper.registerSubmit
export const registerReset = Helper.registerReset
