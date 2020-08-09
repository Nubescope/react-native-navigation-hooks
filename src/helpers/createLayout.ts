import { Options, Layout } from 'react-native-navigation'

/**
 * Creates basic navigation Layout only with component field.
 * [more info](https://wix.github.io/react-native-navigation/api/layout-component)
 */
function createLayout<P>(
  /**
   * Name of your component
   */
  name: string,
  /**
   * Properties to pass down to the component
   */
  passProps?: P,
  /**
   * Styling options
   */
  options?: Options
): Layout<P> {
  return {
    component: {
      name,
      passProps: passProps ? passProps : undefined,
      options: options ? options : undefined,
    },
  }
}

export default createLayout
