import { useLayoutEffect } from 'react'
import { Navigation, BottomTabSelectedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when a BottomTab is selected by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtabselectedlistener)
 */
function useNavigationBottomTabSelect(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: BottomTabSelectedEvent) => void
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

export default useNavigationBottomTabSelect
