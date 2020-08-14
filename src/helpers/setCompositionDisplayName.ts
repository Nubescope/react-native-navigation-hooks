import { ComponentType } from 'react'
import getDisplayName from './getDisplayName'

/**
 * A helper function to set HOC container's displayName.
 */
const setCompositionDisplayName = (
  /**
   * The HOC container component.
   */
  container: ComponentType<any>,
  /**
   * The component that will with wrapped.
   */
  component: ComponentType<any>
) => {
  const containerName = getDisplayName(container)
  const componentName = getDisplayName(component)

  container.displayName = `${containerName}(${componentName})`
}

export default setCompositionDisplayName
