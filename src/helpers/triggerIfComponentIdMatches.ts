import { ComponentEvent } from 'react-native-navigation'

function triggerIfComponentIdMatches<T extends ComponentEvent>(
  handler: (event: T) => any,
  event: T,
  componentId?: string
): void {
  if (componentId && event.componentId !== componentId) {
    return
  }

  handler(event)
}

export default triggerIfComponentIdMatches
