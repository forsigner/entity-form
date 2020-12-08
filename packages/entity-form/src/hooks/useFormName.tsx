import { useRef } from 'react'
import { entityStore } from '../stores'
import { uuid } from '../utils'
import { Config } from '../types'

export function useFormName<T = any>(config: Config<T> = {}): string {
  let entityName: string = ''
  const { entity: Entity } = config
  if (Entity) {
    const store = entityStore.get(Entity)
    entityName = store.name
  }
  const name = useRef(config.name || entityName || `entity_form_${uuid()}`)

  return name.current
}
