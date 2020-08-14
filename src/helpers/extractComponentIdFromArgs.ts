import isString from './isString'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

function extractComponentIdFromArgs<T extends BaseEventHandlerOptions>(
  componentIdOrOptions?: string | T
): string | undefined {
  if (componentIdOrOptions === undefined) {
    return
  }

  if (isString(componentIdOrOptions)) {
    return componentIdOrOptions
  }

  return (componentIdOrOptions as T).componentId
}

export default extractComponentIdFromArgs
