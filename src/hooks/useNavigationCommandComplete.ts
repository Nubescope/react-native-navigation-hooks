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
  handler: (event: CommandCompletedEvent) => any,

  /**
   * Name of the executed navegation command. Ex. "push".
   */
  commandName?: string
): void {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerCommandCompletedListener((event: CommandCompletedEvent) => {
      if (commandName && event.commandName !== commandName) {
        return
      }

      handler(event)
    })

    return () => subscription.remove()
  }, [handler, commandName])
}

export default useNavigationCommandComplete
