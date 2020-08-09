import { useLayoutEffect } from 'react'
import { Navigation, SearchBarUpdatedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when a SearchBar from NavigationBar gets updated.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarupdated-ios-11-only)
 */
function useNavigationSearchBarUpdate(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: SearchBarUpdatedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarUpdatedListener((event: SearchBarUpdatedEvent) => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationSearchBarUpdate
