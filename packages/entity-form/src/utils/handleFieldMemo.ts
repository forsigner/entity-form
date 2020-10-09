import isEqual from 'react-fast-compare'
import get from 'lodash.get'
import { FieldProps } from '../types'

export function handleFieldMemo(prev: FieldProps, next: FieldProps) {
  if (prev.memo) return prev.memo()

  const { name: n1 } = prev
  const { name: n2 } = next
  const {
    status: st1,
    errors: err1,
    values: val1,
    toucheds: t1,
    disableds: d1,
    visibles: vis1,
    displays: dis1,
    datas: datas1,
    enums: enums1,
  } = prev.result.state
  const {
    status: st2,
    errors: err2,
    values: val2,
    toucheds: t2,
    disableds: d2,
    displays: dis2,
    datas: datas2,
    visibles: vis2,
    enums: enum2,
  } = next.result.state

  if (
    st1 === st2 &&
    get(val1, n1) === get(val2, n2) &&
    get(t1, n1) === get(t2, n2) &&
    get(d1, n1) === get(d2, n2) &&
    get(vis1, n1) === get(vis2, n2) &&
    get(err1, n1) === get(err2, n2) &&
    get(dis1, n1) === get(dis2, n2) &&
    get(datas1, n1) === get(datas2, n2) &&
    isEqual(get(enums1, n1), get(enum2, n2))
  ) {
    return true
  }
  return false
}
