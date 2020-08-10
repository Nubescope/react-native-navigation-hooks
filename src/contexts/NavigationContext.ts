import { createContext } from 'react'

export type NavigationContext = {
  componentId?: string
}

const NavigationContext = createContext<NavigationContext>({})

export const NavigationProvider = NavigationContext.Provider
export const NavigationConsumer = NavigationContext.Consumer

export default NavigationContext
