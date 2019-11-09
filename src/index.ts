import { useEffect } from 'react'
import {
  Navigation,
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  CommandCompletedEvent,
  ModalDismissedEvent,
  BottomTabSelectedEvent,
  NavigationButtonPressedEvent,
  SearchBarUpdatedEvent,
  PreviewCompletedEvent,
  SearchBarCancelPressedEvent,
} from 'react-native-navigation'

function useNavigationComponentDidAppear(handler: (event: ComponentDidAppearEvent) => void, componentId: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

function useNavigationComponentDidDisappear(handler: (event: ComponentDidDisappearEvent) => void, componentId: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

function useNavigationCommand(handler: (name: string, params: any) => void, commandName: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerCommandListener((name, params) => {
      const equalCommandName = name === commandName

      if (equalCommandName || !commandName) {
        handler(name, params)
      }
    })

    return () => subscription.remove()
  }, [handler, commandName])
}

function useNavigationCommandComplete(handler: (event: CommandCompletedEvent) => void, commandName: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerCommandCompletedListener(event => {
      // @ts-ignore: This is related to this issue https://github.com/wix/react-native-navigation/issues/5641
      const equalCommandName = event.commandName === commandName
      
      // Until the PR is merged this will work only on IOS (more info: https://github.com/wix/react-native-navigation/pull/5643)
      if (equalCommandName || !commandName) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, commandName])
}

function useNavigationModalDismiss(handler: (event: ModalDismissedEvent) => void, componentId: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerModalDismissedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

function useNavigationBottomTabSelect(handler: (event: BottomTabSelectedEvent) => void) {
  useEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(handler)

    return () => subscription.remove()
  }, [handler])
}

function useNavigationButtonPress(
  handler: (event: NavigationButtonPressedEvent) => void,
  componentId: string,
  buttonId: string
) {
  useEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(event => {
      const equalComponentId = event.componentId === componentId
      const equalButtonId = event.buttonId === buttonId

      if (equalComponentId && equalButtonId) {
        handler(event)
      } else if (!buttonId && equalComponentId) {
        handler(event)
      } else if (!componentId && equalButtonId) {
        handler(event)
      } else if (!componentId && !buttonId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId, buttonId])
}

function useNavigationSearchBarUpdate(handler: (event: SearchBarUpdatedEvent) => void, componentId: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerSearchBarUpdatedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

function useNavigationSearchBarCancelPress(handler: (event: SearchBarCancelPressedEvent) => void, componentId: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerSearchBarCancelPressedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

function useNavigationPreviewComplete(handler: (event: PreviewCompletedEvent) => void, componentId: string) {
  useEffect(() => {
    const subscription = Navigation.events().registerPreviewCompletedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [handler, componentId])
}

export {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
  useNavigationCommand,
  useNavigationCommandComplete,
  useNavigationModalDismiss,
  useNavigationBottomTabSelect,
  useNavigationButtonPress,
  useNavigationSearchBarUpdate,
  useNavigationSearchBarCancelPress,
  useNavigationPreviewComplete,
}
