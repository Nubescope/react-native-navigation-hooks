import { renderHook } from '@testing-library/react-hooks'
import { Navigation, BottomTabLongPressedEvent } from 'react-native-navigation'
import useNavigationBottomTabPress from './useNavigationBottomTabPress'

describe('useNavigationBottomTabPress', () => {
  let triggerEvent: (event: BottomTabLongPressedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerBottomTabPressedListener: jest.fn((callback) => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  afterEach(jest.clearAllMocks)

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationBottomTabPress(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationBottomTabPress(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice', () => {
    const { result } = renderHook(() => {
      useNavigationBottomTabPress(mockHandler)
    })

    const event1 = { selectedTabIndex: 1 }
    triggerEvent(event1)

    const event2 = { selectedTabIndex: 1 }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})
