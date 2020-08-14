import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Navigation, PreviewCompletedEvent } from 'react-native-navigation'
import useNavigationPreviewComplete from './useNavigationPreviewComplete'
import { NavigationProvider } from '../contexts/NavigationContext'

describe('useNavigationPreviewComplete', () => {
  let triggerEvent: (event: PreviewCompletedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()
    jest.spyOn(console, 'warn').mockReturnValue()

    Navigation.events = jest.fn().mockReturnValue({
      registerPreviewCompletedListener: jest.fn((callback) => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  afterEach(jest.clearAllMocks)

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationPreviewComplete(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationPreviewComplete(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).toBeCalled()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationPreviewComplete(mockHandler)
    })

    const event1 = {
      componentId: 'COMPONENT_ID_1',
      componentName: 'COMPONENT_NAME_1',
      previewComponentId: 'PREVIEW_COMPONENT_ID_1',
    }
    triggerEvent(event1)

    const event2 = {
      componentId: 'COMPONENT_ID_2',
      componentName: 'COMPONENT_NAME_2',
      previewComponentId: 'PREVIEW_COMPONENT_ID_2',
    }
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
      useNavigationPreviewComplete(mockHandler, 'COMPONENT_ID_1')
    })

    const event = {
      componentId: 'COMPONENT_ID_1',
      componentName: 'COMPONENT_NAME_1',
      previewComponentId: 'PREVIEW_COMPONENT_ID_1',
    }
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
        useNavigationPreviewComplete(mockHandler, 'COMPONENT_ID_1')
      },
      { wrapper }
    )

    const event = {
      componentId: 'COMPONENT_ID_1',
      componentName: 'COMPONENT_NAME_1',
      previewComponentId: 'PREVIEW_COMPONENT_ID_1',
    }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toBeCalled()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationPreviewComplete(mockHandler, 'COMPONENT_ID_1')
    })

    const event = {
      componentId: 'COMPONENT_ID_2',
      componentName: 'COMPONENT_NAME_2',
      previewComponentId: 'PREVIEW_COMPONENT_ID_2',
    }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
    expect(console.warn).not.toBeCalled()
  })
})
