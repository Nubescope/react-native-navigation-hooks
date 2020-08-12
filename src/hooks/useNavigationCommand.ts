import { useLayoutEffect } from 'react'
import { Navigation } from 'react-native-navigation'

/**
 * Registers listener to be called when a Navigation command (i.e push, pop, showModal etc) is invoked.
 * [more info](https://wix.github.io/react-native-navigation/api/events/#registercommandlistener)
 */
function useNavigationCommand(
  /**
   * Function called each time the event is triggered.
   */
  handler: (name: string, params: any) => any,

  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  commandName?: string
) {
  useLayoutEffect(() => {
    const subscription = Navigation.events().registerCommandListener((name: string, params: any) => {
      if (commandName && name !== commandName) {
        return
      }

      handler(name, params)
    })

    return () => subscription.remove()
  }, [handler, commandName])
}
export default useNavigationCommand
