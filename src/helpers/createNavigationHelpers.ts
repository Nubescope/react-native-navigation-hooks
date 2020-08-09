import { EventsRegistry, Layout, LayoutRoot, LayoutStackChildren, Navigation, Options } from 'react-native-navigation'
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
  <P = {}>(name: Layout<P>): Promise<any>
  (name: string): Promise<any>
  <P = {}>(name: string, passProps?: P): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface ShowModalCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface ShowModalStackCommand {
  (layoutStackChildren: LayoutStackChildren): Promise<any>
  (layoutStackChildren: LayoutStackChildren[]): Promise<any>
  (name: string): Promise<any>
  <P = {}>(name: string, passProps?: P): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

interface ShowOverlayCommand {
  (layout: Layout): Promise<any>
  <P = {}>(name: string, passProps?: P, options?: Options): Promise<any>
}

export type NavigationHelpers = {
  setRoot: SetRootCommand
  setStackRoot: SetStackRootCommand
  push: PushCommand
  showModal: ShowModalCommand
  showModalStack: ShowModalStackCommand
  showOverlay: ShowOverlayCommand
  mergeOptions: (options: Options) => void
  updateProps: (props: object) => void
  dismissModal: (mergeOptions?: Options) => Promise<any>
  pop: (mergeOptions?: Options) => Promise<any>
  popTo: (mergeOptions?: Options) => Promise<any>
  popToRoot: (mergeOptions?: Options) => Promise<any>
  dismissOverlay: () => Promise<any>
  dismissAllModals: (mergeOptions?: Options) => Promise<any>
  getLaunchArgs: () => Promise<any>
  events: () => EventsRegistry
}

/**
 * Creates a set of action helpers for
 * [component](https://wix.github.io/react-native-navigation/api/component),
 * [root](https://wix.github.io/react-native-navigation/api/root),
 * [stack](https://wix.github.io/react-native-navigation/api/stack),
 * [modal](https://wix.github.io/react-native-navigation/api/modal),
 * [overlay](https://wix.github.io/react-native-navigation/api/overlay)
 * Navigation API
 */
function createRnnHelpers(
  /**
   * Component reference id. Used to give context to the Navigation functions that requires componentId parameter.
   */
  componentId: string
): NavigationHelpers {
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

  function showModalStack<P = {}>(
    nameOrLayoutStackChildren: string | LayoutStackChildren | LayoutStackChildren[],
    passProps?: P,
    options?: Options
  ) {
    let layoutStackChildren

    if (typeof nameOrLayoutStackChildren === 'string') {
      const layoutComponent = createLayout<P>(nameOrLayoutStackChildren, passProps, options) as LayoutStackChildren
      layoutStackChildren = [layoutComponent]
    } else {
      layoutStackChildren = Array.isArray(nameOrLayoutStackChildren)
        ? nameOrLayoutStackChildren
        : [nameOrLayoutStackChildren]
    }

    return Navigation.showModal({ stack: { children: layoutStackChildren } })
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

  const { getLaunchArgs, events, dismissAllModals } = Navigation

  return {
    setRoot,
    setStackRoot,
    push,
    showModal,
    showModalStack,
    showOverlay,
    mergeOptions,
    updateProps,
    dismissModal,
    pop,
    popTo,
    popToRoot,
    dismissOverlay,
    dismissAllModals,
    getLaunchArgs,
    events,
  }
}

export default createRnnHelpers
