import { useLayoutEffect } from 'react'
import { Navigation, CommandCompletedEvent } from 'react-native-navigation'

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

export default useNavigationCommandComplete
