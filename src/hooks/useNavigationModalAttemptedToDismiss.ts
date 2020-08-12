import { useLayoutEffect, useContext } from 'react'
import { Navigation, ModalAttemptedToDismissEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: ModalAttemptedToDismissEvent) => any

type Options = {} & BaseEventHandlerOptions

function useNavigationModalAttemptedToDismiss(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string
): void

function useNavigationModalAttemptedToDismiss(
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
 * Registers listener to be called only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal * swiped down to dismiss.
 * [more info](https://wix.github.io/react-native-navigation/apievents#registermodalattemptedtodismisslistenerios-13-only)
 */
function useNavigationModalAttemptedToDismiss(
  handler: EventHandler,
  componentIdOrOptions: string | Options = {}
): void {
  const { global } = componentIdOrOptions as Options

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationModalAttemptedToDismiss', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalAttemptedToDismissListener(
      (event: ModalAttemptedToDismissEvent) => triggerIfComponentIdMatches(handler, event, componentId)
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

export default useNavigationModalAttemptedToDismiss
