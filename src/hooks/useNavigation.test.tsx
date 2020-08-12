import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useNavigation from './useNavigation'
import { NavigationProvider } from '../contexts/NavigationContext'
import * as createNavigationCommands from '../helpers/createNavigationCommands'

const navigationCommandKeys = Object.keys(createNavigationCommands.default('test'))

describe('useNavigation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return helpers based on componentId retrieved from CompoenentIdProvider', () => {
    jest.spyOn(createNavigationCommands, 'default')

    const wrapper = ({ children }) => (
      <NavigationProvider value={{ componentId: 'componentId' }}>{children}</NavigationProvider>
    )

    const { result, unmount } = renderHook(() => useNavigation(), { wrapper })

    unmount()

    expect(createNavigationCommands.default).toHaveBeenCalledWith('componentId')

    expect(Object.keys(result.current)).toEqual(navigationCommandKeys)
    expect(result.error).toBeUndefined()
  })

  it('should return helpers based on componentId retrieved from hook argument', () => {
    jest.spyOn(createNavigationCommands, 'default')

    const { result, unmount } = renderHook(() => useNavigation('componentId'))

    unmount()

    expect(createNavigationCommands.default).toHaveBeenCalledWith('componentId')

    expect(Object.keys(result.current)).toEqual(navigationCommandKeys)
    expect(result.error).toBeUndefined()
  })

  it('should throw when not using NavigationProvider nor componentId as argument', () => {
    const { result, unmount } = renderHook(() => useNavigation())

    unmount()

    expect(result.error).toBeInstanceOf(Error)
  })
})
