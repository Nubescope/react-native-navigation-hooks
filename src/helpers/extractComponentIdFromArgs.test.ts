import extractComponentIdFromArgs from './extractComponentIdFromArgs'

describe('extractComponentIdFromArgs', () => {
  it('should return undefined ', () => {
    const componentId = extractComponentIdFromArgs(undefined)
    expect(componentId).toBeUndefined()
  })

  it('should return componentId is string argument', () => {
    const componentId = extractComponentIdFromArgs('componentId')
    expect(componentId).toBe('componentId')
  })

  it('should return componentId options provided', () => {
    const componentId = extractComponentIdFromArgs({ componentId: 'componentId' })
    expect(componentId).toBe('componentId')
  })
})
