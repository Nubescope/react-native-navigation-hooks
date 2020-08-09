import { useLayoutEffect } from 'react'
import { Navigation, ModalAttemptedToDismissEvent } from 'react-native-navigation'

/**
 * Registers listener to be called only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal * swiped down to dismiss.
 * [more info](https://wix.github.io/react-native-navigation/apievents#registermodalattemptedtodismisslistenerios-13-only)
 */
function useNavigationModalAttemptedToDismiss(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ModalAttemptedToDismissEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalAttemptedToDismissListener(
      (event: ModalAttemptedToDismissEvent) => {
        const equalCommandId = event.componentId === componentId

        if (componentId && !equalCommandId) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationModalAttemptedToDismiss
