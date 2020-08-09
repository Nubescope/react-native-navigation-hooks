import { renderHook } from '@testing-library/react-hooks'
import { Navigation, ComponentDidDisappearEvent, ComponentType } from 'react-native-navigation'
import useNavigationComponentDidDisappear from './useNavigationComponentDidDisappear'

describe('useNavigationComponentDidDisappear', () => {
  let triggerEvent: (event: ComponentDidDisappearEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void
  let mockComponentType: ComponentType = 'Component'

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerComponentDidDisappearListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationComponentDidDisappear(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationComponentDidDisappear(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationComponentDidDisappear(mockHandler)
    })

    const event1 = {
      componentId: 'COMPONENT_ID_1',
      componentName: 'COMPONENT_NAME_1',
      componentType: mockComponentType,
      passProps: {},
    }
    triggerEvent(event1)

    const event2 = {
      componentId: 'COMPONENT_ID_2',
      componentName: 'COMPONENT_NAME_2',
      componentType: mockComponentType,
      passProps: {},
    }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationComponentDidDisappear(mockHandler, 'COMPONENT_ID_1')
    })

    const event = {
      componentId: 'COMPONENT_ID_1',
      componentName: 'COMPONENT_NAME_1',
      componentType: mockComponentType,
      passProps: {},
    }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationComponentDidDisappear(mockHandler, 'COMPONENT_ID_1')
    })

    const event = {
      componentId: 'COMPONENT_ID_2',
      componentName: 'COMPONENT_NAME_2',
      componentType: mockComponentType,
      passProps: {},
    }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})
