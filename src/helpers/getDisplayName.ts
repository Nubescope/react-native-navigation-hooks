import { ComponentType } from 'react'

/**
 * A helper function to get component's displaName with fallbacks.
 */
const getDisplayName = (Component: ComponentType) => Component.displayName || Component.name || 'Component'

export default getDisplayName
