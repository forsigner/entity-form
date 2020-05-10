import get from 'lodash.get'
import isEqual from 'react-fast-compare'

import { FormState } from '../types'

interface Parent {
  name: string
  isArray: boolean
}

/**
 * 数组的子元素是否是 object
 * @param arr 数组
 */
function hasObjectChild(arr: any[]) {
  return arr.every(i => typeof i === 'object')
}

function getNames(s1: any, s2: any, names = [] as string[]) {
  return function traval(stateObj: any, parent: Parent) {
    if (typeof stateObj !== 'object') return []

    for (const key of Object.keys(stateObj)) {
      const value = stateObj[key]
      const isAry = Array.isArray(value)
      const name = parent.name
        ? parent.isArray
          ? `${parent.name}[${key}]`
          : `${parent.name}.${key}`
        : key

      if (typeof value === 'object') {
        // 不是 array，说明是 pure object
        if (!isAry) {
          traval(value, { name, isArray: false })
          continue
        }

        // 数组子元素是对象
        if (hasObjectChild(value)) {
          traval(value, { name, isArray: true })
          continue
        }

        // 数组子元素是原始值
        const changed = !isEqual(get(s1, name), get(s2, name))
        if (changed && !names.includes(name)) names.push(name)
        continue
      }

      const changed = !isEqual(get(s1, name), get(s2, name))
      if (changed && !names.includes(name)) names.push(name)
    }
    return names
  }
}

export function getChangedNames(prevState: FormState, nextState: FormState): string[] {
  let names = getNames(prevState.values, nextState.values)(prevState.toucheds, {
    name: '',
    isArray: false,
  })

  // names = getNames(
  //   prevState.touched,
  //   nextState.touched,
  //   names,
  // )(prevState.touched, {
  //   name: '',
  //   isArray: false,
  // })

  // names = getNames(
  //   prevState.errors,
  //   nextState.errors,
  //   names,
  // )(prevState.errors, {
  //   name: '',
  //   isArray: false,
  // })

  // console.log('names:', names)
  return names
}
