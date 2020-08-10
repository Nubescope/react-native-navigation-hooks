import React from 'react'
import { render, cleanup } from '@testing-library/react-native'
import withNavigationProvider from './withNavigationProvider'
import { View } from 'react-native'
import { NavigationConsumer } from '../contexts/NavigationContext'

describe('withNavigationProvider', () => {
  afterEach(cleanup)

  it('should wrap compenent with NavigationProvider and bypass props', () => {
    const Component = ({ componentId, prop1 }) => (
      <View testID={`root-${componentId}`}>
        <NavigationConsumer>{({ componentId: id }) => <View testID={`with-${id}-${prop1}`} />}</NavigationConsumer>
      </View>
    )

    const WrappedComponent = withNavigationProvider(Component)

    const { getByTestId } = render(<WrappedComponent componentId="id" prop1="value1" />)

    expect(getByTestId('root-id')).toBeTruthy()
    expect(getByTestId('with-id-value1')).toBeTruthy()
  })
})
