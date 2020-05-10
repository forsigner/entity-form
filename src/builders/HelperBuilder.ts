import { getState } from 'stook'
import get from 'lodash.get'
import { Actions, ArrayHelper, FieldState, FormState } from '../types'

export class HelperBuilder<T> {
  state: FormState = getState(this.name)
  constructor(private name: string, private actions: Actions<T>) {}

  getValue = (name: string) => {
    return get(this.state.values, name)
  }

  getError = (name: string) => {
    return get(this.state.values, name)
  }

  getVisible = (name: string) => {
    return get(this.state.visibles, name) as boolean
  }

  getTouched = (name: string) => {
    return get(this.state.toucheds, name) as boolean
  }

  getDisplay = (name: string) => {
    return get(this.state.displays, name) as boolean
  }

  getStatus = (name: string) => {
    return get(this.state.statuses, name) as any
  }

  getPendding = (name: string) => {
    return get(this.state.penddings, name) as boolean
  }

  getData = (name: string) => {
    return get(this.state.datas, name)
  }

  getFieldState = (name: string): FieldState => {
    return {
      value: this.getValue(name),
      error: this.getError(name),
      visible: this.getVisible(name),
      touched: this.getTouched(name),
      display: this.getDisplay(name),
      status: this.getStatus(name),
      pendding: this.getPendding(name),
      data: this.getData(name),
    }
  }

  createArrayHelper = (name: string) => {
    const state = getState(this.name)
    const { setValues } = this.actions
    return {
      isFirst(index) {
        return index === 0
      },
      isLast(index) {
        return index === get(state.values, name).length - 1
      },
      push(obj) {
        setValues(values => {
          get(values, name).push(obj)
        })
      },
      remove(index) {
        setValues(values => {
          get(values, name).splice(index, 1)
        })
      },
      swap(indexA, indexB) {
        setValues(values => {
          const A = get(values, name).slice(indexA, indexA + 1)
          const B = get(values, name).slice(indexB, indexB + 1)
          get(values, name).splice(indexA, 1, ...B)
          get(values, name).splice(indexB, 1, ...A)
        })
      },
      // move(from, to) {
      //   // TODO:
      // },
    } as ArrayHelper
  }
}
