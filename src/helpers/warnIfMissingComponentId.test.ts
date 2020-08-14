import warnIfMissingComponentId from './warnIfMissingComponentId'

describe('warnIfMissingComponentId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockReturnValue()
  })

  afterEach(jest.clearAllMocks)

  it('should warn if componentId not provided and global is false', () => {
    warnIfMissingComponentId('hook', undefined, false)

    expect(console.warn).toBeCalledWith(
      '"hook" hook declared without providing "componentId" context. Make sure you are passing "componentId" as argument or wrapping your screen with "NavigationProvider" or "withNavigation" HOC'
    )
  })

  it('should warn if componentId not nor global params provided', () => {
    warnIfMissingComponentId('hook')

    expect(console.warn).toBeCalledWith(
      '"hook" hook declared without providing "componentId" context. Make sure you are passing "componentId" as argument or wrapping your screen with "NavigationProvider" or "withNavigation" HOC'
    )
  })

  it('should not warn if global parameter provided provided ', () => {
    warnIfMissingComponentId('hook', undefined, true)

    expect(console.warn).not.toBeCalled()
  })

  it('should not warn componentId provided and global is true', () => {
    warnIfMissingComponentId('hook', 'componentId', true)

    expect(console.warn).not.toBeCalled()
  })

  it('should not warn componentId provided and global is false', () => {
    warnIfMissingComponentId('hook', 'componentId', false)

    expect(console.warn).not.toBeCalled()
  })
})
