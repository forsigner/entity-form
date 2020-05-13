import { entityStore } from '../stores/entityStore'
import { EntityConfig } from '../types'

export function entity(name: string, entityConfig = {} as EntityConfig): ClassDecorator {
  return target => {
    entityStore.set(target, {
      name,
      entityConfig,
    })
  }
}
