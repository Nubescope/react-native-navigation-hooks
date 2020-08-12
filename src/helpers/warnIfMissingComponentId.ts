function warnIfMissingComponentId(hookName: string, componentId?: string, global?: boolean): void {
  if (global || componentId) {
    return
  }

  console.warn(
    `"${hookName}" hook declared without providing "componentId" context. Make sure you are passing "componentId" as argument or wrapping your screen with "NavigationProvider" or "withNavigation" HOC`
  )
}

export default warnIfMissingComponentId
