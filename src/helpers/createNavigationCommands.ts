import { Layout, LayoutRoot, Navigation, Options } from 'react-native-navigation'
import createLayout from './createLayout'

interface SetRootCommand {
  (layoutRoot: LayoutRoot): Promise<any>
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface SetStackRootCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface PushCommand {
  <P = {}>(layout: Layout<P>): Promise<any>
  (name: string): Promise<any>
  <P = {}>(name: string, passProps?: P): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface ShowModalCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface ShowOverlayCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

export type NavigationCommands = {
  setRoot: SetRootCommand
  setStackRoot: SetStackRootCommand
  push: PushCommand
  showModal: ShowModalCommand
  showOverlay: ShowOverlayCommand
  mergeOptions: (options: Options) => void
  updateProps: (props: object) => void
  dismissModal: (mergeOptions?: Options) => Promise<any>
  pop: (mergeOptions?: Options) => Promise<any>
  popTo: (mergeOptions?: Options) => Promise<any>
  popToRoot: (mergeOptions?: Options) => Promise<any>
  dismissOverlay: () => Promise<any>
  setDefaultOptions: (options: Options) => void
  dismissAllModals: (mergeOptions?: Options) => Promise<any>
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

  function setStackRoot<P = {}>(nameOrLayout: string | Layout<P> | Array<Layout<P>>, passProps?: P, options?: Options) {
    const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

    return Navigation.setStackRoot(componentId, layout)
  }

  function push<P = {}>(nameOrLayout: string | Layout<P>, passProps?: P, options?: Options) {
    const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

    return Navigation.push(componentId, layout)
  }

  function showModal<P = {}>(nameOrLayout: string | Layout<P>, passProps?: P, options?: Options) {
    const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

    return Navigation.showModal(layout)
  }

  function showOverlay<P = {}>(nameOrLayout: string | Layout<P>, passProps?: P, options?: Options) {
    const layout = typeof nameOrLayout === 'string' ? createLayout<P>(nameOrLayout, passProps, options) : nameOrLayout

    return Navigation.showOverlay(layout)
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
  function popTo(mergeOptions?: Options) {
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
    setRoot,
    setStackRoot,
    push,
    showModal,
    showOverlay,
    mergeOptions,
    updateProps,
    dismissModal,
    pop,
    popTo,
    popToRoot,
    dismissOverlay,
    setDefaultOptions,
    dismissAllModals,
    getLaunchArgs,
  }
}

export default createNavigationCommands
