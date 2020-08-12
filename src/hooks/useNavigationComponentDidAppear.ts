import { useLayoutEffect, useContext } from 'react'
import { Navigation, ComponentDidAppearEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: ComponentDidAppearEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationComponentDidAppear(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationComponentDidAppear(
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
 * Registers listener to be called each time component appears on screen (attached to the view hierarchy)
 * [more info](https://wix.github.io/react-native-navigation/api/events/#componentdidappear)
 */

function useNavigationComponentDidAppear(handler: EventHandler, componentIdOrOptions: string | Options = {}): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationComponentDidAppear', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener((event: ComponentDidAppearEvent) =>
      triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationComponentDidAppear
