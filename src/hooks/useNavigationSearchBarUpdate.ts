import { useLayoutEffect, useContext } from 'react'
import { Navigation, SearchBarUpdatedEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: SearchBarUpdatedEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationSearchBarUpdate(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationSearchBarUpdate(
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
 * Registers listener to be called when a SearchBar from NavigationBar gets updated.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarupdated-ios-11-only)
 */
function useNavigationSearchBarUpdate(handler: EventHandler, componentIdOrOptions: string | Options = {}): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationSearchBarUpdate', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarUpdatedListener((event: SearchBarUpdatedEvent) =>
      triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationSearchBarUpdate
