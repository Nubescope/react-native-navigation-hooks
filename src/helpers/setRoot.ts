import { Layout, LayoutRoot, Navigation, Options } from 'react-native-navigation'
import createLayout from './createLayout'

export interface SetRootCommand {
  (layoutRoot: LayoutRoot): Promise<any>
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

function setRoot<P = {}>(nameOrLayout: string | Layout | LayoutRoot, passProps?: P, options?: Options) {
  let layoutRoot

  if (typeof nameOrLayout === 'string') {
    layoutRoot = { root: createLayout<P>(nameOrLayout, passProps, options) } as LayoutRoot
  } else if ((nameOrLayout as LayoutRoot).root) {
    layoutRoot = nameOrLayout as LayoutRoot
  } else {
    layoutRoot = { root: nameOrLayout } as LayoutRoot
  }

  return Navigation.setRoot(layoutRoot)
}

export default setRoot
