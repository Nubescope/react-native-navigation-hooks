import { renderHook } from '@testing-library/react-hooks'
import { Navigation } from 'react-native-navigation'
import useNavigationCommand from './useNavigationCommand'

describe('useNavigationCommand', () => {
  let triggerEvent: (name: string, params: any) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerCommandListener: jest.fn((callback) => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  afterEach(jest.clearAllMocks)

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationCommand(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationCommand(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when commandName is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationCommand(mockHandler)
    })

    triggerEvent('COMMAND_NAME_1', 'PARAMS_1')
    triggerEvent('COMMAND_NAME_2', 'PARAMS_2')

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, 'COMMAND_NAME_1', 'PARAMS_1')
    expect(mockHandler).toHaveBeenNthCalledWith(2, 'COMMAND_NAME_2', 'PARAMS_2')

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentName provided', () => {
    const { result } = renderHook(() => {
      useNavigationCommand(mockHandler, 'COMMAND_NAME_2')
    })

    triggerEvent('COMMAND_NAME_1', 'PARAMS_1')
    triggerEvent('COMMAND_NAME_2', 'PARAMS_2')

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toHaveBeenNthCalledWith(1, 'COMMAND_NAME_2', 'PARAMS_2')

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationCommand(mockHandler, 'COMMAND_NAME_2')
    })

    triggerEvent('COMMAND_NAME_1', 'PARAMS_1')

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})
