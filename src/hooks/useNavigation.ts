import { useMemo } from 'react'
import createNavigationHelpers from '../helpers/createNavigationHelpers'
import useComponentId from './useComponentId'

/**
 * Returns a set of action helpers for
 * [component](https://wix.github.io/react-native-navigation/api/component),
 * [root](https://wix.github.io/react-native-navigation/api/root),
 * [stack](https://wix.github.io/react-native-navigation/api/stack),
 * [modal](https://wix.github.io/react-native-navigation/api/modal),
 * [overlay](https://wix.github.io/react-native-navigation/api/overlay)
 * Navigation API
 */
const useNavigation = (
  /**
   * Component reference id. Used to give context to the Navigation functions that requires componentId parameter.
   */
  componentId?: string
) => {
  const componentIdFromProvider = useComponentId()

  const id = componentId || componentIdFromProvider

  if (!id) {
    throw new Error('Missing componentId. Use ComponentIdContext or pass componentId as argument.')
  }

  return useMemo(() => createNavigationHelpers(id), [id])
}

export default useNavigation
