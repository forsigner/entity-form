import isEqual from 'react-fast-compare'
import get from 'lodash.get'
import { FieldProps } from '../types'

export function handleFieldMemo(prev: FieldProps, next: FieldProps) {
  const { name: n1 } = prev
  const { name: n2 } = next
  const {
    status: st1,
    errors: err1,
    values: val1,
    toucheds: t1,
    visibles: vis1,
    enums: enums1,
  } = prev.result.state
  const {
    status: st2,
    errors: err2,
    values: val2,
    toucheds: t2,
    visibles: vis2,
    enums: enum2,
  } = next.result.state

  if (
    st1 === st2 &&
    get(val1, n1) === get(val2, n2) &&
    get(t1, n1) === get(t2, n2) &&
    get(vis1, n1) === get(vis2, n2) &&
    get(err1, n1) === get(err2, n2) &&
    isEqual(get(enums1, n1), get(enum2, n2))
  ) {
    return true
  }
  return false
}
