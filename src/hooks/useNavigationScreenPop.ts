import { useLayoutEffect } from 'react'
import { Navigation, ScreenPoppedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when screen is popped.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerscreenpoppedlistener)
 */
function useNavigationScreenPop(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ScreenPoppedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerScreenPoppedListener((event: ScreenPoppedEvent) => {
      const equalCommandId = event.componentId === componentId

      if (componentId && !equalCommandId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationScreenPop
