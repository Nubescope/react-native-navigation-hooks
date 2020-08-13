import { Options, LayoutStackChildren, LayoutStack } from 'react-native-navigation'
import createLayout from './createLayout'

/**
 * Creates navigation LayoutStack exposing multiple function types for the same function as a list of overloads.
 * [more info](https://wix.github.io/react-native-navigation/api/layout-stack)
 */
function createStack(layoutStackChildren: LayoutStackChildren, id?: string, options?: Options): LayoutStack
function createStack(layoutStackChildrenArray: LayoutStackChildren[], id?: string, options?: Options): LayoutStack
function createStack(name: string): LayoutStack
function createStack<P = {}>(name: string, passProps?: P): LayoutStack
function createStack<P = {}>(name: string, passProps?: P, options?: Options): LayoutStack
function createStack<P = {}>(
  nameOrLayoutStackChildren: string | LayoutStackChildren | LayoutStackChildren[],
  passPropsOrId?: P | string,
  options?: Options
): LayoutStack {
  let stackOptions
  let id: string | undefined
  let layoutStackChildren

  if (typeof nameOrLayoutStackChildren === 'string') {
    const layoutComponent = createLayout<P>(
      nameOrLayoutStackChildren,
      passPropsOrId as P,
      options
    ) as LayoutStackChildren
    layoutStackChildren = [layoutComponent]
  } else {
    stackOptions = options
    id = passPropsOrId as string
    layoutStackChildren = Array.isArray(nameOrLayoutStackChildren)
      ? nameOrLayoutStackChildren
      : [nameOrLayoutStackChildren]
  }

  return { id, children: layoutStackChildren, options: stackOptions }
}

export default createStack
