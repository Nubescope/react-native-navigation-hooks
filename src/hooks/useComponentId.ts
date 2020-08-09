import { useContext } from 'react'
import ComponentIdContext from '../contexts/ComponentIdContext'

/**
 * Returns the componetId value obtainer from the ComponentIdContext
 */
export const useComponentId = () => useContext(ComponentIdContext)

export default useComponentId
