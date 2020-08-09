import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import hoistNonReactStatic from 'hoist-non-react-statics'
import { ComponentIdProvider } from '../contexts/ComponentIdContext'
import setCompositionDisplayName from '../helpers/setCompositionDisplayName'

/**
 * A public higher-order component to access the ComponentIdContext componentId value
 */
const withComponentIdProvider = <P extends {}>(WrappedComponent: NavigationFunctionComponent<P>) => {
  const ComponentIdProviderContainer: NavigationFunctionComponent<P> = ({ componentId, ...props }) => (
    <ComponentIdProvider value={componentId}>
      <WrappedComponent componentId={componentId} {...(props as P)} />
    </ComponentIdProvider>
  )

  setCompositionDisplayName(ComponentIdProviderContainer, WrappedComponent)

  hoistNonReactStatic(ComponentIdProviderContainer, WrappedComponent)

  return ComponentIdProviderContainer
}

export default withComponentIdProvider
