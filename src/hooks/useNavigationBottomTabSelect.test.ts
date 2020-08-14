import { renderHook } from '@testing-library/react-hooks'
import { Navigation, BottomTabSelectedEvent } from 'react-native-navigation'
import useNavigationBottomTabSelect from './useNavigationBottomTabSelect'

describe('useNavigationBottomTabSelect', () => {
  let triggerEvent: (event: BottomTabSelectedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerBottomTabSelectedListener: jest.fn((callback) => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  afterEach(jest.clearAllMocks)

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationBottomTabSelect(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationBottomTabSelect(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice', () => {
    const { result } = renderHook(() => {
      useNavigationBottomTabSelect(mockHandler)
    })

    const event1 = { selectedTabIndex: 1, unselectedTabIndex: 2 }
    triggerEvent(event1)

    const event2 = { selectedTabIndex: 1, unselectedTabIndex: 2 }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})
