import { useLayoutEffect } from 'react'
import { Navigation, BottomTabPressedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when a BottomTab is pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtabpressedlistener)
 */
function useNavigationBottomTabPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: BottomTabPressedEvent) => any
): void {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabPressedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

export default useNavigationBottomTabPress
