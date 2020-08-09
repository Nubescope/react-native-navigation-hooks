import React from 'react'
import { render, cleanup } from '@testing-library/react-native'
import withComponentIdProvider from './withComponentIdProvider'
import { View } from 'react-native'
import { ComponentIdConsumer } from '../contexts/ComponentIdContext'

describe('withComponentIdProvider', () => {
  afterEach(cleanup)

  it('should wrap compenent with ComponentIdProvider and bypass props', () => {
    const Component = ({ componentId, prop1 }) => (
      <View testID={`root-${componentId}`}>
        <ComponentIdConsumer>{id => <View testID={`with-${id}-${prop1}`} />}</ComponentIdConsumer>
      </View>
    )

    const WrappedComponent = withComponentIdProvider(Component)

    const { getByTestId } = render(<WrappedComponent componentId="id" prop1="value1" />)

    expect(getByTestId('root-id')).toBeTruthy()
    expect(getByTestId('with-id-value1')).toBeTruthy()
  })
})
