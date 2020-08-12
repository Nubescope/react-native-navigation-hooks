import { useLayoutEffect, useContext } from 'react'
import { Navigation, PreviewCompletedEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: PreviewCompletedEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationPreviewComplete(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationPreviewComplete(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Options to handle event trigger.
   */

  options?: Options
): void

/**
 * Registers listener to be called when preview peek is completed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#previewcompleted-ios-114-only)
 */
function useNavigationPreviewComplete(handler: EventHandler, componentIdOrOptions: string | Options = {}): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationPreviewComplete', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerPreviewCompletedListener((event: PreviewCompletedEvent) =>
      triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationPreviewComplete
