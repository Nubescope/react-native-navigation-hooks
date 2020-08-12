import { useLayoutEffect, useContext } from 'react'
import { Navigation, ComponentDidDisappearEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: ComponentDidDisappearEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationComponentDidDisappear(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationComponentDidDisappear(
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
 * Registers listener to be called each time component disappears from screen (detached from the view heirarchy)
 * [more info](https://wix.github.io/react-native-navigation/api/events/#componentdiddisappear)
 */

function useNavigationComponentDidDisappear(handler: EventHandler, componentIdOrOptions: string | Options = {}): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationComponentDidDisappear', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(
      (event: ComponentDidDisappearEvent) => triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationComponentDidDisappear
