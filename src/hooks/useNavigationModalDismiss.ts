import { useLayoutEffect } from 'react'
import { Navigation, ModalDismissedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when modal is dismissed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registermodaldismissedlistener)
 */
function useNavigationModalDismiss(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ModalDismissedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalDismissedListener((event: ModalDismissedEvent) => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationModalDismiss
