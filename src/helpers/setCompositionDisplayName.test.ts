import { ComponentType } from 'react'
import setCompositionDisplayName from './setCompositionDisplayName'

describe('setCompositionDisplayName', () => {
  it('should set container displayName', () => {
    const MyComponent = () => null
    const Container: ComponentType = () => null

    setCompositionDisplayName(Container, MyComponent)

    expect(Container.displayName).toBe('Container(MyComponent)')
  })
})
