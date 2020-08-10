import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import hoistNonReactStatic from 'hoist-non-react-statics'
import { NavigationProvider } from '../contexts/NavigationContext'
import setCompositionDisplayName from '../helpers/setCompositionDisplayName'

/**
 * A public higher-order component to access the NavigationContext componentId value
 */
const withNavigationProvider = <P extends {}>(WrappedComponent: NavigationFunctionComponent<P>) => {
  const NavigationProviderContainer: NavigationFunctionComponent<P> = ({ componentId, ...props }) => (
    <NavigationProvider value={{ componentId }}>
      <WrappedComponent componentId={componentId} {...(props as P)} />
    </NavigationProvider>
  )

  setCompositionDisplayName(NavigationProviderContainer, WrappedComponent)

  hoistNonReactStatic(NavigationProviderContainer, WrappedComponent)

  return NavigationProviderContainer
}

export default withNavigationProvider
