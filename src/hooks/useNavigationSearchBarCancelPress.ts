import { useLayoutEffect } from 'react'
import { Navigation, SearchBarCancelPressedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when the cancel button on the SearchBar from NavigationBar gets pressed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarcancelpressed-ios-11-only)
 */
function useNavigationSearchBarCancelPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: SearchBarCancelPressedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarCancelPressedListener(
      (event: SearchBarCancelPressedEvent) => {
        const equalComponentId = event.componentId === componentId

        if (componentId && !equalComponentId) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationSearchBarCancelPress
