import getDisplayName from './getDisplayName'

describe('getDisplayName', () => {
  it('should get displayName if any', () => {
    const MyComponent = () => null
    MyComponent.displayName = 'MyComponentDisplayName'

    const displayName = getDisplayName(MyComponent)

    expect(displayName).toBe('MyComponentDisplayName')
  })

  it('should get comoponent name if has no displayName', () => {
    const MyComponent = () => null

    const displayName = getDisplayName(MyComponent)

    expect(displayName).toBe('MyComponent')
  })

  it('should get default comoponent name', () => {
    const MyComponent = () => null
    Object.defineProperty(MyComponent, 'name', { value: null })

    const displayName = getDisplayName(MyComponent)

    expect(displayName).toBe('Component')
  })
})
