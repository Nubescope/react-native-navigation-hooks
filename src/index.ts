import { useLayoutEffect } from 'react'
import {
  Navigation,
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  CommandCompletedEvent,
  ModalAttemptedToDismissEvent,
  ModalDismissedEvent,
  ScreenPoppedEvent,
  BottomTabSelectedEvent,
  BottomTabPressedEvent,
  BottomTabLongPressedEvent,
  NavigationButtonPressedEvent,
  SearchBarUpdatedEvent,
  PreviewCompletedEvent,
  SearchBarCancelPressedEvent,
} from 'react-native-navigation'

/**
 * Registers listener to be called each time component appears on screen (attached to the view hierarchy)
 * [more info](https://wix.github.io/react-native-navigation/api/events/#componentdidappear)
 */

function useNavigationComponentDidAppear(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ComponentDidAppearEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener((event: ComponentDidAppearEvent) => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

/**
 * Registers listener to be called each time component disappears from screen (detached from the view heirarchy) * [more info](https://wix.github.io/react-native-navigation/api/events/#componentdiddisappear)
 */
function useNavigationComponentDidDisappear(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ComponentDidDisappearEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(
      (event: ComponentDidDisappearEvent) => {
        const equalComponentId = event.componentId === componentId

        if (componentId && !equalComponentId) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

/**
 * Registers listener to be called when a Navigation command (i.e push, pop, showModal etc) is invoked.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registercommandlistener)
 */
function useNavigationCommand(
  /**
   * Function called each time the event is triggered.
   */
  handler: (name: string, params: any) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  commandName?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerCommandListener((name: string, params: any) => {
      const equalCommandName = name === commandName

      if (commandName && !equalCommandName) {
        return
      }

      handler(name, params)
    })

    return () => subscription.remove()
  }, [handler, commandName])
}

/**
 * Registers listener to be called when a command finishes executing in native. If the command contains
 * animations, for example pushed screen animation) the listener is invoked after the animation ends.
 * [more info]https://wix.github.io/react-native-navigation/api/events/#registercommandcompletedlistener)
 */
function useNavigationCommandComplete(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: CommandCompletedEvent) => void,

  /**
   * Name of the executed navegation command. Ex. "push".
   */
  commandName?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerCommandCompletedListener((event: CommandCompletedEvent) => {
      const equalCommandName = event.commandName === commandName

      if (commandName && !equalCommandName) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, commandName])
}

/**
 * Registers listener to be called only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal * swiped down to dismiss.
 * [more info](https://wix.github.io/react-native-navigation/apievents#registermodalattemptedtodismisslistenerios-13-only)
 */
function useNavigationModalAttemptedToDismiss(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ModalAttemptedToDismissEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalAttemptedToDismissListener(
      (event: ModalAttemptedToDismissEvent) => {
        const equalCommandId = event.componentId === componentId

        if (componentId && !equalCommandId) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

/**
 * Registers listener to be called when modal is dismissed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registermodaldismissedlistener)
 */
function useNavigationModalDismiss(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ModalDismissedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerModalDismissedListener((event: ModalDismissedEvent) => {
      const equalComponentId = event.componentId === componentId

      if (componentId && !equalComponentId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

/**
 * Registers listener to be called when screen is popped.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerscreenpoppedlistener)
 */
function useNavigationScreenPop(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: ScreenPoppedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerScreenPoppedListener((event: ScreenPoppedEvent) => {
      const equalCommandId = event.componentId === componentId

      if (componentId && !equalCommandId) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

/**
 * Registers listener to be called when a BottomTab is selected by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtabselectedlistener)
 */
function useNavigationBottomTabSelect(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: BottomTabSelectedEvent) => void
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

/**
 * Registers listener to be called when a BottomTab is pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtabpressedlistener)
 */
function useNavigationBottomTabPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: BottomTabPressedEvent) => void
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabPressedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

/**
 * Registers listener to be called when a BottomTab is long pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtablongpressedlistener)
 */
function useNavigationBottomTabLongPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: BottomTabLongPressedEvent) => void
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerBottomTabLongPressedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

/**
 * Registers listener to be called when a TopBar button is pressed by the user.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#navigationbuttonpressed-event)
 */
function useNavigationButtonPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: NavigationButtonPressedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string,

  /**
   * Navigation button reference id.
   */
  buttonId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      (event: NavigationButtonPressedEvent) => {
        const equalComponentId = event.componentId === componentId
        const equalButtonId = event.buttonId === buttonId

        if ((componentId && !equalComponentId) || (buttonId && !equalButtonId)) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId, buttonId])
}

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

/**
 * Registers listener to be called when the cancel button on the SearchBar from NavigationBar gets pressed.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarcancelpressed-ios-11-only)
 */
function useNavigationSearchBarCancelPress(
  /**
   * Function called each time the event is triggered.
   */
  handler: (event: SearchBarCancelPressedEvent) => void,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerSearchBarCancelPressedListener(
      (event: SearchBarCancelPressedEvent) => {
        const equalComponentId = event.componentId === componentId

        if (componentId && !equalComponentId) {
          return
        }

        handler(event)
      }
    )

    return () => subscription.remove()
  }, [handler, componentId])
}

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

export {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
  useNavigationCommand,
  useNavigationCommandComplete,
  useNavigationModalAttemptedToDismiss,
  useNavigationModalDismiss,
  useNavigationScreenPop,
  useNavigationBottomTabSelect,
  useNavigationBottomTabPress,
  useNavigationBottomTabLongPress,
  useNavigationButtonPress,
  useNavigationSearchBarUpdate,
  useNavigationSearchBarCancelPress,
  useNavigationPreviewComplete,
}
