import { useLayoutEffect } from 'react'
import { Navigation, BottomTabLongPressedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when a BottomTab is long pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtablongpressedlistener)
 */
function useNavigationBottomTabLongPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: BottomTabLongPressedEvent) => void
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabLongPressedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

export default useNavigationBottomTabLongPress
