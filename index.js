import { useEffect } from 'react'
import { Navigation } from 'react-native-navigation'

function useNavigationComponentDidAppear(handler, componentId) {
  useEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationComponentDidDisappear(handler, componentId) {
  useEffect(() => {
    const subscription = Navigation.events().registerComponentDidDisappearListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationCommand(handler, commandName) {
  useEffect(() => {
    const subscription = Navigation.events().registerCommandListener((name, params) => {
      const equalCommandName = name === commandName

      if (equalCommandName || !commandName) {
        handler(name, params)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationCommandComplete(handler, commandName) {
  useEffect(() => {
    const subscription = Navigation.events().registerCommandCompletedListener(event => {
      const equalCommandName = event.commandName === commandName

      if (equalCommandName || !commandName) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationModalDismiss(handler, componentId) {
  useEffect(() => {
    const subscription = Navigation.events().registerModalDismissedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationBottomTabSelect(handler) {
  useEffect(() => {
    const subscription = Navigation.events().registerBottomTabSelectedListener(handler)

    return () => subscription.remove()
  }, [])
}

function useNavigationButtonPress(handler, componentId, buttonId) {
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
  }, [])
}

function useNavigationSearchBarUpdate(handler, componentId) {
  useEffect(() => {
    const subscription = Navigation.events().registerSearchBarUpdatedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationSearchBarCancelPress(handler, componentId) {
  useEffect(() => {
    const subscription = Navigation.events().registerSearchBarCancelPressedListener(event => {
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
}

function useNavigationPreviewComplete(handler, componentId) {
  useEffect(() => {
    const subscription = Navigation.events().registerPreviewCompletedListener(event => {
      console.warn('event', event)
      const equalComponentId = event.componentId === componentId

      if (equalComponentId || !componentId) {
        handler(event)
      }
    })

    return () => subscription.remove()
  }, [])
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
