import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Navigation, NavigationButtonPressedEvent } from 'react-native-navigation'
import useNavigationButtonPress from './useNavigationButtonPress'
import { NavigationProvider } from '../contexts/NavigationContext'

describe('useNavigationButtonPress', () => {
  let triggerEvent: (event: NavigationButtonPressedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()
    jest.spyOn(console, 'warn').mockReturnValue()

    Navigation.events = jest.fn().mockReturnValue({
      registerNavigationButtonPressedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  afterEach(jest.clearAllMocks)

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationButtonPress(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler)
    })

    const event1 = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event1)

    const event2 = { componentId: 'COMPONENT_ID_2', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toBeCalled()
  })

  it('should call handler once if componentId matches by context', () => {
    const wrapper = ({ children }) => (
      <NavigationProvider value={{ componentId: 'COMPONENT_ID_1' }}>{children}</NavigationProvider>
    )

    const { result } = renderHook(
      () => {
        useNavigationButtonPress(mockHandler, 'COMPONENT_ID_1')
      },
      { wrapper }
    )

    const event = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toBeCalled()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_2', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toBeCalled()
  })

  it('should call the handler if buttonId provided', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler, undefined, 'BUTTON_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should never call the handler if buttonId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler, undefined, 'BUTTON_ID_2')
    })

    const event = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should call the handler only if componentId and buttonId matches', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler, 'COMPONENT_ID_1', 'BUTTON_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toHaveBeenCalled()
  })

  it('should call the handler only if componentId and buttonId passed as options', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(mockHandler, { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' })
    })

    const event = { componentId: 'COMPONENT_ID_1', buttonId: 'BUTTON_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toHaveBeenCalled()
  })
})
