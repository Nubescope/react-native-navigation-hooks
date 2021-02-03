import { Layout, Navigation, Options } from 'react-native-navigation'
import createLayout from './createLayout'

export interface ShowOverlayCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

function showOverlay<P = {}>(nameOrLayout: string | Layout<P>, passProps?: P, options?: Options) {
  const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

  return Navigation.showOverlay(layout)
}

export default showOverlay
