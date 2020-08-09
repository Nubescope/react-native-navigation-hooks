import { useLayoutEffect } from 'react'
import { Navigation, NavigationButtonPressedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when a TopBar button is pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#navigationbuttonpressed-event)
 */
function useNavigationButtonPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: NavigationButtonPressedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string,

  /**
   * Navigation button reference id.
   */
  buttonId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      (event: NavigationButtonPressedEvent) => {
        const equalComponentId = event.componentId === componentId
        const equalButtonId = event.buttonId === buttonId

        if ((componentId && !equalComponentId) || (buttonId && !equalButtonId)) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId, buttonId])
}

export default useNavigationButtonPress
