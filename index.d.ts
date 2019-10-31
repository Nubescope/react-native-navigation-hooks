import {
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  CommandCompletedEvent,
  ModalDismissedEvent,
  BottomTabSelectedEvent,
  NavigationButtonPressedEvent,
  SearchBarUpdatedEvent,
  SearchBarCancelPressedEvent,
  PreviewCompletedEvent,
} from 'react-native-navigation'

export declare function useNavigationComponentDidAppear(
  handler: (event: ComponentDidAppearEvent) => void,
  componentId?: string,
): void

export declare function useNavigationComponentDidDisappear(
  handler: (event: ComponentDidDisappearEvent) => void,
  componentId?: string,
): void

export declare function useNavigationCommand(
  handler: (name: string, params: any) => void,
  commandName?: string,
): void

export declare function useNavigationCommandComplete(
  handler: (event: CommandCompletedEvent) => void,
  commandName?: string,
): void

export declare function useNavigationModalDismiss(
  handler: (event: ModalDismissedEvent) => void,
  componentId?: string,
): void

export declare function useNavigationBottomTabSelect(
  handler: (event: BottomTabSelectedEvent) => void,
): void

export declare function useNavigationButtonPress(
  handler: (event: NavigationButtonPressedEvent) => void,
  componentId?: string,
  buttonId?: string,
): void

export declare function useNavigationSearchBarUpdate(
  handler: (event: SearchBarUpdatedEvent) => void,
  componentId?: string,
): void

export declare function useNavigationSearchBarCancelPress(
  handler: (event: SearchBarCancelPressedEvent) => void,
  componentId?: string,
): void

export declare function useNavigationPreviewComplete(
  handler: (event: PreviewCompletedEvent) => void,
  componentId?: string,
): void
