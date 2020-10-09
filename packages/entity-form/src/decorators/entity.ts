import { entityStore } from '../stores/entityStore'
import { EntityConfig } from '../types'

/**
 *
 * @param name unique entity name
 * @param entityConfig form config
 */
export function entity(
  name: string,
  entityConfig = {
    showResetButton: false,
    showSubmitButton: true,
  } as EntityConfig,
): ClassDecorator {
  return (target) => {
    const config = { ...entityConfig }

    // set default showResetButton to false
    if (!Reflect.has(config, 'showResetButton')) {
      config.showResetButton = false
    }

    entityStore.set(target, {
      name,
      entityConfig,
    })
  }
}
