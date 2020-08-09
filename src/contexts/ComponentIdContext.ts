import { createContext } from 'react'

const ComponentIdContext = createContext<string | undefined>(undefined)

export const ComponentIdProvider = ComponentIdContext.Provider
export const ComponentIdConsumer = ComponentIdContext.Consumer

export default ComponentIdContext
