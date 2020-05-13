import { entityStore } from '../stores/entityStore'

// export function entity(name: string, entityConfig?: EntityConfig): ClassDecorator {
export function entity(name: string): ClassDecorator {
  return target => {
    entityStore.set(target, name)
  }
}
