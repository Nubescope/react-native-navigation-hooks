import { useLayoutEffect, useContext } from 'react'
import { Navigation, NavigationButtonPressedEvent } from 'react-native-navigation'
import { NavigationContext } from '../contexts'
import triggerIfComponentIdMatches from '../helpers/triggerIfComponentIdMatches'
import extractComponentIdFromArgs from '../helpers/extractComponentIdFromArgs'
import isString from '../helpers/isString'
import warnIfMissingComponentId from '../helpers/warnIfMissingComponentId'
import { BaseEventHandlerOptions } from '../types/BaseEventHandlerOptions'

type EventHandler = (event: NavigationButtonPressedEvent) => any

type Options = {
  /**
   * Navigation button reference id.
   */

  buttonId?: string
} & BaseEventHandlerOptions

function useNavigationButtonPress(
  /**
   * Function called each time the event is triggered.
   */

  handler: EventHandler,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */

  componentId?: string,

  /**
   * Navigation button reference id.
   */

  buttonId?: string
): void

function useNavigationButtonPress(
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
 * Registers listener to be called when a TopBar button is pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#navigationbuttonpressed-event)
 */
function useNavigationButtonPress(
  handler: EventHandler,
  componentIdOrOptions: string | Options = {},
  buttonIdFromArgs?: string
): void {
  const { global } = componentIdOrOptions as Options
  const buttonId = isString(buttonIdFromArgs) ? buttonIdFromArgs : (componentIdOrOptions as Options).buttonId

  let { componentId } = useContext(NavigationContext)
  componentId = componentId || extractComponentIdFromArgs(componentIdOrOptions)

  warnIfMissingComponentId('useNavigationButtonPress', componentId, global)

  useLayoutEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener((event) => {
      if (buttonId && event.buttonId !== buttonId) {
        return
      }

      triggerIfComponentIdMatches(handler, event, componentId)
    })

    return () => subscription.remove()
  }, [handler, componentId, buttonId])
}

export default useNavigationButtonPress
