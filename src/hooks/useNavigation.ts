import { useMemo, useContext } from 'react'
import { NavigationContext } from '../contexts'
import createNavigationHelpers from '../helpers/createNavigationHelpers'

/**
 * Returns a set of action helpers for
 * [component](https://wix.github.io/react-native-navigation/api/component),
 * [root](https://wix.github.io/react-native-navigation/api/root),
 * [stack](https://wix.github.io/react-native-navigation/api/stack),
 * [modal](https://wix.github.io/react-native-navigation/api/modal),
 * [overlay](https://wix.github.io/react-natwive-navigation/api/overlay)
 * Navigation API
 */
const useNavigation = (
  /**
   * Component reference id. Used to give context to the Navigation functions that requires componentId parameter.
   */
  componentId?: string
) => {
  const { componentId: id = componentId } = useContext(NavigationContext)

  if (!id) {
    throw new Error('Missing "componentId". Use NavigationContext or pass "componentId" as argument.')
  }

  return useMemo(() => createNavigationHelpers(id), [id])
}

export default useNavigation
