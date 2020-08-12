import { renderHook } from '@testing-library/react-hooks'
import { Navigation, CommandCompletedEvent } from 'react-native-navigation'
import useNavigationCommandComplete from './useNavigationCommandComplete'

describe('useNavigationCommandComplete', () => {
  let triggerEvent: (event: CommandCompletedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerCommandCompletedListener: jest.fn((callback) => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  afterEach(jest.clearAllMocks)

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationCommandComplete(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationCommandComplete(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentName is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationCommandComplete(mockHandler)
    })

    const event1 = { commandId: 'COMMAND_ID_1', commandName: 'COMMAND_NAME_1', params: {}, completionTime: 1 }
    triggerEvent(event1)

    const event2 = { commandId: 'COMMAND_ID_2', commandName: 'COMMAND_NAME_2', params: {}, completionTime: 2 }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentName provided', () => {
    const { result } = renderHook(() => {
      useNavigationCommandComplete(mockHandler, 'COMMAND_NAME_1')
    })

    const event = { commandId: 'COMMAND_ID_1', commandName: 'COMMAND_NAME_1', params: {}, completionTime: 1 }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentName does not match', () => {
    const { result } = renderHook(() => {
      useNavigationCommandComplete(mockHandler, 'COMMAND_NAME_1')
    })

    const event = { commandId: 'COMMAND_ID_2', commandName: 'COMMAND_NAME_2', params: {}, completionTime: 1 }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})
