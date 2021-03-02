import { Layout, Navigation, Options } from 'react-native-navigation'
import createLayout from './createLayout'

import setRoot, { SetRootCommand } from './setRoot'
import showModal, { ShowModalCommand } from './showModal'
import showOverlay, { ShowOverlayCommand } from './showOverlay'

interface SetStackRootCommand {
  <P = {}>(layout: Layout<P> | Layout<P>[]): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface PushCommand {
  <P = {}>(layout: Layout<P>): Promise<any>
  (name: string): Promise<any>
  <P = {}>(name: string, passProps?: P): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

export type NavigationCommands = {
  setStackRoot: SetStackRootCommand

  push: PushCommand

  mergeOptions: (options: Options) => void

  updateProps: (props: object) => void

  dismissModal: (mergeOptions?: Options) => Promise<any>

  pop: (mergeOptions?: Options) => Promise<any>

  popToRoot: (mergeOptions?: Options) => Promise<any>

  dismissOverlay: () => Promise<any>

  /**
   * @deprecated Use setRoot import from 'react-native-navigation-hooks'
   */
  setRoot: SetRootCommand

  /**
   * @deprecated Use setRoot import from 'react-native-navigation-hooks'
   */
  showModal: ShowModalCommand

  /**
   * @deprecated Use showOverlay import from 'react-native-navigation-hooks'
   */
  showOverlay: ShowOverlayCommand

  /**
   * @deprecated Use Navigation.popTo instead
   */
  popTo: (componentId: string, mergeOptions?: Options) => Promise<any>

  /**
   * @deprecated Use Navigation.setDefaultOptions instead
   */
  setDefaultOptions: (options: Options) => void

  /**
   * @deprecated Use Navigation.dismissAllModals instead
   */
  dismissAllModals: (mergeOptions?: Options) => Promise<any>

  /**
   * @deprecated Use Navigation.getLaunchArgs instead
   */
  getLaunchArgs: () => Promise<any>
}

/**
 * Creates a set of action helpers for
 * [component](https://wix.github.io/react-native-navigation/api/component),
 * [root](https://wix.github.io/react-native-navigation/api/root),
 * [stack](https://wix.github.io/react-native-navigation/api/stack),
 * [modal](https://wix.github.io/react-native-navigation/api/modal),
 * [overlay](https://wix.github.io/react-native-navigation/api/overlay)
 * Navigation API exposing multiple function types for the each function as a list of overloads.
 */
function createNavigationCommands(
  /**
   * Component reference id. Used to give context to the Navigation functions that requires componentId parameter.
   */
  componentId: string
): NavigationCommands {
  function setStackRoot<P = {}>(nameOrLayout: string | Layout<P> | Array<Layout<P>>, passProps?: P, options?: Options) {
    const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

    return Navigation.setStackRoot(componentId, layout)
  }

  function push<P = {}>(nameOrLayout: string | Layout<P>, passProps?: P, options?: Options) {
    const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

    return Navigation.push(componentId, layout)
  }

  function mergeOptions(options: Options) {
    return Navigation.mergeOptions(componentId, options)
  }

  function updateProps(props: object) {
    return Navigation.updateProps(componentId, props)
  }

  // eslint-disable-next-line no-shadow
  function dismissModal(mergeOptions?: Options) {
    return mergeOptions ? Navigation.dismissModal(componentId, mergeOptions) : Navigation.dismissModal(componentId)
  }

  // eslint-disable-next-line no-shadow
  function pop(mergeOptions?: Options) {
    return mergeOptions ? Navigation.pop(componentId, mergeOptions) : Navigation.pop(componentId)
  }

  // eslint-disable-next-line no-shadow
  function popTo(componentId: string, mergeOptions?: Options) {
    return mergeOptions ? Navigation.popTo(componentId, mergeOptions) : Navigation.popTo(componentId)
  }

  // eslint-disable-next-line no-shadow
  function popToRoot(mergeOptions?: Options) {
    return mergeOptions ? Navigation.popToRoot(componentId, mergeOptions) : Navigation.popToRoot(componentId)
  }

  function dismissOverlay() {
    return Navigation.dismissOverlay(componentId)
  }

  const { setDefaultOptions, dismissAllModals, getLaunchArgs } = Navigation

  return {
    setStackRoot,
    push,
    mergeOptions,
    updateProps,
    dismissModal,
    pop,
    popTo,
    popToRoot,
    dismissOverlay,
    setRoot,
    showModal,
    showOverlay,
    setDefaultOptions,
    dismissAllModals,
    getLaunchArgs,
  }
}

export default createNavigationCommands
