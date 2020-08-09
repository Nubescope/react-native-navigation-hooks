import { useLayoutEffect } from 'react'
import { Navigation, PreviewCompletedEvent } from 'react-native-navigation'

/**
 * Registers listener to be called when preview peek is completed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#previewcompleted-ios-114-only)
 */
function useNavigationPreviewComplete(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: PreviewCompletedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerPreviewCompletedListener((event: PreviewCompletedEvent) => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationPreviewComplete
