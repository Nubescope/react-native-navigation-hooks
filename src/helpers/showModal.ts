import { Layout, Navigation, Options } from 'react-native-navigation'
import createLayout from './createLayout'

export interface ShowModalCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

function showModal<P = {}>(nameOrLayout: string | Layout<P>, passProps?: P, options?: Options) {
  const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

  return Navigation.showModal(layout)
}

export default showModal
