import { useLayoutEffect, useContext } from 'react'
import { Navigation, SearchBarCancelPressedEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: SearchBarCancelPressedEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationSearchBarCancelPress(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationSearchBarCancelPress(
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
 * Registers listener to be called when the cancel button on the SearchBar from NavigationBar gets pressed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarcancelpressed-ios-11-only)
 */
function useNavigationSearchBarCancelPress(handler: EventHandler, componentIdOrOptions: string | Options = {}): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationSearchBarCancelPress', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarCancelPressedListener(
      (event: SearchBarCancelPressedEvent) => triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationSearchBarCancelPress
