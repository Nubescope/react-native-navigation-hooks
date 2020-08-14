export type BaseEventHandlerOptions = {
  /**
   * Component reference id. If provided it listens for event only for this screen.
   */
  componentId?: string

  /**
   * Indicates the event will be handled globally. (default: false)
   */
  global?: boolean
}
