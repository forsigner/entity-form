import React from 'react'
import { Dispatch, Action } from 'stook'
import { HandlerBuilder } from './builders/HandlerBuilder'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

type Status = 'editable' | 'disabled' | 'preview'

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : string
}

export type Toucheds<T = any> = {
  [K in keyof T]?: T[K] extends object ? Toucheds<T[K]> : boolean
}

export type Statuses<T = any> = {
  [K in keyof T]?: T[K] extends object ? Statuses<T[K]> : Status
}

export type Visibles<T = any> = {
  [K in keyof T]?: T[K] extends object ? Visibles<T[K]> : boolean
}

export type Penddings<T = any> = {
  [K in keyof T]?: T[K] extends object ? Penddings<T[K]> : boolean
}

export type Displays<T = any> = {
  [K in keyof T]?: T[K] extends object ? Displays<T[K]> : boolean
}

export type Enums<T = any> = {
  [K in keyof T]?: T[K] extends object ? Enums<T[K]> : Enum
}

export type Datas<T = any> = {
  [K in keyof T]?: T[K] extends object ? Datas<T[K]> : any
}

export interface EntityType<T = any> {
  new (...args: any[]): T
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export interface FieldState<T = any> {
  value: any
  error: string
  touched: boolean
  visible: boolean
  display: boolean
  status: Status
  pendding: boolean
  data: any
}

export interface FormState<T = any> {
  values: T
  errors: Errors<T>
  toucheds: Toucheds<T>
  visibles: Visibles<T>
  displays: Displays<T>
  statuses: Statuses<T>
  penddings: Penddings<T>
  enums: Enums<T>
  datas: Datas<T>
  submitting: boolean
  validating: boolean
  dirty: boolean
  valid: boolean
  submitCount: number
  status: Status
}

export interface Actions<T = any> {
  setValues(fn: (values: T) => void): void
  setTouched(fn: (touched: Toucheds<T>) => void): void
  setVisibles(fn: (visibles: Visibles<T>) => void): void
  setErrors(fn: (errors: Errors<T>) => void): void
  setEnums(fn: (enums: Enums<T>) => void): void
  setSubmitting(isSubmitting: boolean): void
  setFormState: Dispatch<Action<FormState<T>>>
  resetForm(): void
  submitForm(): void
  validateForm(): Promise<void>
  validateField(name: string): Promise<void>
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

export interface Helpers {
  getValue: (name: string) => any
  getError: (name: string) => any
  getVisible: (name: string) => boolean
  getStatus: (name: string) => boolean
  getTouched: (name: string) => boolean
  getEnum: (name: string) => Enum
  createArrayHelper: (key: string) => ArrayHelper
}

export interface Result<T = any> {
  state: FormState<T>
  handlers: Handlers
  actions: Actions<T>
  helpers: Helpers
  handlerBuilder: HandlerBuilder<T>
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
  name?: string
  initValues?: (defaultValues: T) => T
  validate?: (values: T) => Errors<T>
  onSubmit?: (values: T, { state, actions }: { state: FormState<T>; actions: Actions<T> }) => any
  onError?: (
    errors: Errors<T>,
    { state, actions }: { state: FormState<T>; actions: Actions<T> },
  ) => any
  onReset?: ({ state, actions }: { state: FormState<T>; actions: Actions<T> }) => any
  effects?: (actions: Actions<T>) => any
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

export interface FieldConfig {
  label?: string
  showLabel?: boolean

  value?: any
  display?: boolean
  visible?: boolean
  status?: Status
  error?: string
  touched?: boolean

  required?: boolean
  order?: number
  enum?: Enum | (() => Enum)

  data?: any

  component?: any
  componentProps?: {
    [key: string]: any
  }

  gql?: GqlConfig
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
}

export type EnumItem = {
  value: any
  label: string
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
}
