import { EntityStoreValue } from '../types'

class EntityStore {
  private key = Symbol('stook#entiy-form')

  set(entityClass: any, value: EntityStoreValue) {
    Reflect.defineMetadata(this.key, value, entityClass)
  }

  get(entityClass: any): EntityStoreValue {
    return Reflect.getMetadata(this.key, entityClass)
  }
}

export const entityStore = new EntityStore()
