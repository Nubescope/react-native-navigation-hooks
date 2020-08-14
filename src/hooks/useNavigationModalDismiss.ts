import { useLayoutEffect, useContext } from 'react'
import { Navigation, ModalDismissedEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: ModalDismissedEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationModalDismiss(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationModalDismiss(
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
 * Registers listener to be called when modal is dismissed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registermodaldismissedlistener)
 */
function useNavigationModalDismiss(handler: EventHandler, componentIdOrOptions: string | Options = {}): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationModalDismiss', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalDismissedListener((event: ModalDismissedEvent) =>
      triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationModalDismiss
