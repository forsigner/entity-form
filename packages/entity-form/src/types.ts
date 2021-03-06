import React, { Component, FunctionComponent } from 'react'
import { Dispatch, Action } from 'stook'
import { HandlerBuilder } from './builders/HandlerBuilder'
import { HelperBuilder } from './builders/HelperBuilder'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

type Status = 'editable' | 'disabled' | 'preview'

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Errors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends object
    ? Errors<T[K]>
    : string
}

export type Toucheds<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Toucheds<T[K][number]>[]
      : boolean
    : T[K] extends object
    ? Toucheds<T[K]>
    : boolean
}

export type Disableds<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Disableds<T[K][number]>[]
      : boolean
    : T[K] extends object
    ? Disableds<T[K]>
    : boolean
}

export type Statuses<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Statuses<T[K][number]>[]
      : Status
    : T[K] extends object
    ? Statuses<T[K]>
    : Status
}

export type Visibles<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Visibles<T[K][number]>[]
      : boolean
    : T[K] extends object
    ? Visibles<T[K]>
    : boolean
}

export type Penddings<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Penddings<T[K][number]>[]
      : boolean
    : T[K] extends object
    ? Penddings<T[K]>
    : boolean
}

export type Displays<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Displays<T[K][number]>[]
      : boolean
    : T[K] extends object
    ? Displays<T[K]>
    : boolean
}

export type Enums<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Enums<T[K][number]>[]
      : Enum
    : T[K] extends object
    ? Enums<T[K]>
    : Enum
}

export type Metas<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Metas<T[K][number]>[]
      : any
    : T[K] extends object
    ? Metas<T[K]>
    : any
}

export type Datas<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Datas<T[K][number]>[]
      : any
    : T[K] extends object
    ? Datas<T[K]>
    : any
}

export interface EntityType<T = any> {
  new (...args: any[]): T
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export interface FieldState {
  value: any
  error: string | undefined
  touched: boolean
  disabled: boolean
  visible: boolean
  display: boolean
  status: Status
  pendding: boolean
  enum: Enum
  meta: any
  data: any
}

export interface FormState<T = any> {
  values: T
  errors: Errors<T>
  toucheds: Toucheds<T>
  disableds: Disableds<T>
  visibles: Visibles<T>
  displays: Displays<T>
  statuses: Statuses<T>
  penddings: Penddings<T>
  enums: Enums<T>
  metas: Metas<T>
  datas: Datas<T>
  submitting: boolean
  validating: boolean
  dirty: boolean
  valid: boolean
  submitCount: number
  status: Status

  // form info
  name: string
  entityConfig: EntityConfig
}

export type ValuesFn<T> = Partial<T> | ((prev: T) => T) | ((prev: T) => void)

export type TouchedsFn<T> =
  | Toucheds<T>
  | ((toucheds: Toucheds<T>) => Toucheds<T>)
  | ((toucheds: Toucheds<T>) => void)

export type DisabledsFn<T> =
  | Disableds<T>
  | ((disableds: Disableds<T>) => Disableds<T>)
  | ((disableds: Disableds<T>) => void)

export type VisiblesFn<T> =
  | Visibles<T>
  | ((visibles: Visibles<T>) => Visibles<T>)
  | ((visibles: Visibles<T>) => void)

export type DatasFn<T> = Datas<T> | ((datas: Datas<T>) => Datas<T>) | ((datas: Datas<T>) => void)

export type DisplaysFn<T> =
  | Displays<T>
  | ((datas: Displays<T>) => Displays<T>)
  | ((datas: Displays<T>) => void)

export type ErrorsFn<T> =
  | Errors<T>
  | ((errors: Errors<T>) => Errors<T>)
  | ((errors: Errors<T>) => void)

export type EnumsFn<T> = Enums<T> | ((enums: Enums<T>) => Enums<T>) | ((enums: Enums<T>) => void)

export interface Actions<T = any> {
  setValues(fn: ValuesFn<T>): void
  setValues<C>(fn: ValuesFn<C>): void

  setToucheds(fn: TouchedsFn<T>): void
  setToucheds<C>(fn: TouchedsFn<C>): void

  setDisableds(fn: DisabledsFn<T>): void
  setDisableds<C>(fn: DisabledsFn<C>): void

  setDisplays(fn: DisplaysFn<T>): void
  setDisplays<C>(fn: DisplaysFn<C>): void

  setDatas(fn: DatasFn<T>): void
  setDatas<C>(fn: DatasFn<C>): void

  setVisibles(fn: VisiblesFn<T>): void
  setVisibles<C = any>(fn: VisiblesFn<C>): void

  setErrors(fn: ErrorsFn<T>): void
  setErrors<C>(fn: ErrorsFn<C>): void

  setEnums(fn: EnumsFn<T>): void
  setEnums<C>(fn: EnumsFn<C>): void

  setFormState: Dispatch<Action<FormState<T>>>

  setSubmitting(isSubmitting: boolean): void
  resetForm(): void
  submitForm(): void
  validateForm(): Promise<Errors<T>>
  validateField(name: string): Promise<boolean>
}

export interface FieldHandlers {
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : (e: unknown | React.ChangeEvent<any>) => void)
    | Promise<any>
}

export interface Handlers extends FieldHandlers {
  handleSubmit: HandleSubmit
}

// export interface Helpers {
//   getValue: (name: string) => any
//   getError: (name: string) => any
//   getVisible: (name: string) => boolean
//   getStatus: (name: string) => boolean
//   getTouched: (name: string) => boolean
//   getEnum: (name: string) => Enum
//   createArrayHelper: (key: string) => ArrayHelper
// }

export interface Result<T = any> {
  /** Form state */
  state: FormState<T>

  /** Actions to update state */
  actions: Actions<T>

  /** Some helpers */
  helpers: HelperBuilder<T>

  /** Form handlers, handleChange,handleBlur,handleSubmit */
  handlers: Handlers

  /** Builder to build handlers */
  handlerBuilder: HandlerBuilder<T>

  entity: EntityType<T>
  instance: T
  fieldsMetadata: FieldMetadata[]
}

export interface ArrayHelper {
  push: (obj: any) => void
  swap: (indexA: number, indexB: number) => void
  move: (from: number, to: number) => void
  insert: (index: number, value: any) => void
  unshift: (value: any) => number
  remove: <T>(index: number) => T | undefined
  pop: <T>() => T | undefined
  replace: (index: number, value: any) => void
  isFirst: (index: number) => boolean
  isLast: (index: number) => boolean
}

export interface Config<T = any> {
  /** form unique name, optional */
  name?: string

  /**
   * Set form initialValues, it will override field initial value
   * @param defaultValues default values from field config
   */
  initValues?(defaultValues: T): T

  /**
   * form-level validation
   * @param values current values
   */
  validate?(values: T): Errors<T>

  /**
   * callback when form submit
   * @param values current values
   */
  onSubmit?(values: T): any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>): any

  /**
   * callback when reset form
   */
  onReset?(): any
}

export interface Variables {
  [key: string]: any
}

export interface MapToEnum extends EnumItem {
  items?: string
}

export interface GqlConfig {
  query: string
  variables?: Variables | (() => Variables)
  initialValue?: (data: any) => any
  mapToEnum: MapToEnum | ((data: any) => Enum)
}

export interface EntityConfig {
  formProps?: {
    [key: string]: any
  }
  showResetButton?: boolean
  showSubmitButton?: boolean
}

export interface EntityStoreValue {
  name: string
  entityConfig: EntityConfig
}

export interface EffectOptions<T = any> {
  value: any
  helpes: HelperBuilder<T>
  actions: Actions<T>
}

type Components =
  | 'Input'
  | 'InputNumber'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | ({} & string)
  | FunctionComponent
  | Component

export interface FieldConfig<ComponentProps = any> {
  label?: string

  /** shoud show label */
  showLabel?: boolean

  /** field description */
  description?: string

  /** initial value */
  value?: any

  /** initial display */
  display?: boolean

  /** initial visible */
  visible?: boolean

  /** initial status */
  status?: Status

  /** initial error */
  error?: string

  /** initial  touched*/
  touched?: boolean

  /** initial  disabled*/
  disabled?: boolean

  /** initial pendding */
  pendding?: boolean

  /** initial enum */
  enum?: Enum | (() => Enum)

  /** initial data */
  data?: any

  /** required for ui */
  required?: boolean

  order?: number

  component?: Components

  componentProps?: ComponentProps

  gql?: GqlConfig

  onChange?: <T>(options: EffectOptions<T>) => any

  onBlur?: <T>(options: EffectOptions<T>) => any

  [key: string]: any
}

export interface FieldMetadata extends FieldConfig {
  name: string
  isRef: boolean
  ref?: any
  target: any
  [key: string]: any
}

export interface RegisterProps {
  result: Result
}

export interface RegisterFormProps extends RegisterProps {
  handleSubmit: HandleSubmit
}

export interface RegisterFieldProps extends RegisterProps, FieldHandlers {
  name: string
  value: any
  field: FieldConfig
  onChange?: (...args: any[]) => any
  componentProps?: any
}

export type EnumItem = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Enum = EnumItem[]

export interface FormProps<T = any> {
  /**
   * entity or use
   */
  entity?: EntityType
  use?: Result<T>
}

export interface FieldProps {
  name: string
  field: FieldConfig
  result: Result
  componentProps?: any
  component?: any
  onChange?: (...args: any[]) => any
  memo?: () => boolean
}
