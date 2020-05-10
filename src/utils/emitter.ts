import mitt from 'mitt'

export const emitter = mitt()

export const FIELD_CHANGE = '__ENTITY__FIELD__CHANGE__'

export function emitFieldUpdate(names: string[]) {
  emitter.emit(FIELD_CHANGE, names)
}

export function onFieldUpdate(cb: (names: string[]) => void) {
  emitter.on(FIELD_CHANGE, names => {
    cb(names)
  })
}

export function onFieldChange(name: string, cb: () => void) {
  emitter.on(name, () => {
    setTimeout(() => {
      cb()
    }, 0)
  })
}
