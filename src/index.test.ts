import { renderHook } from '@testing-library/react-hooks'
import {
  Navigation,
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  CommandCompletedEvent,
  ModalAttemptedToDismissEvent,
  ScreenPoppedEvent,
  ModalDismissedEvent,
  BottomTabSelectedEvent,
  BottomTabLongPressedEvent,
  NavigationButtonPressedEvent,
  SearchBarUpdatedEvent,
  SearchBarCancelPressedEvent,
  PreviewCompletedEvent,
  ComponentType,
} from 'react-native-navigation'

import {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
  useNavigationCommand,
  useNavigationCommandComplete,
  useNavigationModalAttemptedToDismiss,
  useNavigationModalDismiss,
  useNavigationScreenPop,
  useNavigationBottomTabSelect,
  useNavigationBottomTabPress,
  useNavigationBottomTabLongPress,
  useNavigationButtonPress,
  useNavigationSearchBarUpdate,
  useNavigationSearchBarCancelPress,
  useNavigationPreviewComplete,
} from './'

describe('useNavigationComponentDidAppear', () => {
  let triggerEvent: (event: ComponentDidAppearEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void
  let mockComponentType: ComponentType = 'Component'

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerComponentDidAppearListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationComponentDidAppear(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationComponentDidAppear(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationComponentDidAppear(mockHandler)
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
      useNavigationComponentDidAppear(mockHandler, 'COMPONENT_ID_1')
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
      useNavigationComponentDidAppear(mockHandler, 'COMPONENT_ID_1')
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

describe('useNavigationCommand', () => {
  let triggerEvent: (name: string, params: any) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerCommandListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

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

describe('useNavigationCommandComplete', () => {
  let triggerEvent: (event: CommandCompletedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerCommandCompletedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

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

describe('useNavigationModalAttemptedToDismiss', () => {
  let triggerEvent: (event: ModalAttemptedToDismissEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerModalAttemptedToDismissListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationModalAttemptedToDismiss(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationModalAttemptedToDismiss(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationModalAttemptedToDismiss(mockHandler)
    })

    const event1 = { componentId: 'COMPONENT_ID_1' }
    triggerEvent(event1)

    const event2 = { componentId: 'COMPONENT_ID_2' }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationModalAttemptedToDismiss(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationModalAttemptedToDismiss(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_2' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})

describe('useNavigationScreenPop', () => {
  let triggerEvent: (event: ScreenPoppedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerScreenPoppedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationScreenPop(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationScreenPop(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationScreenPop(mockHandler)
    })

    const event1 = { componentId: 'COMPONENT_ID_1' }
    triggerEvent(event1)

    const event2 = { componentId: 'COMPONENT_ID_2' }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationScreenPop(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationScreenPop(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_2' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})

describe('useNavigationModalDismiss', () => {
  let triggerEvent: (event: ModalDismissedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerModalDismissedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationModalDismiss(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationModalDismiss(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationModalDismiss(mockHandler)
    })

    const event1 = { componentId: 'COMPONENT_ID_1', modalsDismissed: 1, componentName: 'COMPONENT_NAME_1' }
    triggerEvent(event1)

    const event2 = { componentId: 'COMPONENT_ID_2', modalsDismissed: 1, componentName: 'COMPONENT_NAME_1' }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationModalDismiss(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1', modalsDismissed: 1, componentName: 'COMPONENT_NAME_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationModalDismiss(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_2', modalsDismissed: 1, componentName: 'COMPONENT_NAME_2' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})

describe('useNavigationBottomTabSelect', () => {
  let triggerEvent: (event: BottomTabSelectedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerBottomTabSelectedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

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

describe('useNavigationBottomTabPress', () => {
  let triggerEvent: (event: BottomTabLongPressedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerBottomTabPressedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

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

describe('useNavigationBottomTabLongPress', () => {
  let triggerEvent: (event: BottomTabLongPressedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerBottomTabLongPressedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationBottomTabLongPress(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toBeCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationBottomTabLongPress(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice', () => {
    const { result } = renderHook(() => {
      useNavigationBottomTabLongPress(mockHandler)
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

describe('useNavigationButtonPress', () => {
  let triggerEvent: (event: NavigationButtonPressedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerNavigationButtonPressedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationButtonPress(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationButtonPress(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
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
  })
})

describe('useNavigationSearchBarUpdate', () => {
  let triggerEvent: (event: SearchBarUpdatedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerSearchBarUpdatedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationSearchBarUpdate(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarUpdate(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarUpdate(mockHandler)
    })

    const event1 = { componentId: 'COMPONENT_ID_1', text: 'TEXT_1', isFocused: true }
    triggerEvent(event1)

    const event2 = { componentId: 'COMPONENT_ID_2', text: 'TEXT_2', isFocused: false }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarUpdate(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1', text: 'TEXT_1', isFocused: true }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarUpdate(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_2', text: 'TEXT_2', isFocused: true }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})

describe('useNavigationSearchBarCancelPress', () => {
  let triggerEvent: (event: SearchBarCancelPressedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerSearchBarCancelPressedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationSearchBarCancelPress(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarCancelPress(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler twice when componentId is not provided', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarCancelPress(mockHandler)
    })

    const event1 = { componentId: 'COMPONENT_ID_1', componentName: 'COMPONENT_NAME_1' }
    triggerEvent(event1)

    const event2 = { componentId: 'COMPONENT_ID_2', componentName: 'COMPONENT_NAME_2' }
    triggerEvent(event2)

    expect(mockHandler).toBeCalledTimes(2)
    expect(mockHandler).toHaveBeenNthCalledWith(1, event1)
    expect(mockHandler).toHaveBeenNthCalledWith(2, event2)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should call handler once if componentId provided', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarCancelPress(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_1', componentName: 'COMPONENT_NAME_1' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(1)
    expect(mockHandler).toBeCalledWith(event)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if componentId does not match', () => {
    const { result } = renderHook(() => {
      useNavigationSearchBarCancelPress(mockHandler, 'COMPONENT_ID_1')
    })

    const event = { componentId: 'COMPONENT_ID_2', componentName: 'COMPONENT_NAME_2' }
    triggerEvent(event)

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })
})

describe('useNavigationPreviewComplete', () => {
  let triggerEvent: (event: PreviewCompletedEvent) => void
  let mockRemoveSubscription: () => void
  let mockHandler: () => void

  beforeEach(() => {
    mockHandler = jest.fn(() => {})
    mockRemoveSubscription = jest.fn()

    Navigation.events = jest.fn().mockReturnValue({
      registerPreviewCompletedListener: jest.fn(callback => {
        triggerEvent = callback

        return { remove: mockRemoveSubscription }
      }),
    })
  })

  it('should remove the event listener on unmount', () => {
    const { result, unmount } = renderHook(() => {
      useNavigationPreviewComplete(() => {})
    })

    unmount()

    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
  })

  it('should never call the handler if no event was triggered', () => {
    const { result } = renderHook(() => {
      useNavigationPreviewComplete(() => {})
    })

    expect(mockHandler).toBeCalledTimes(0)

    expect(result.current).toBeUndefined()
    expect(result.error).toBeUndefined()
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
  })
})
