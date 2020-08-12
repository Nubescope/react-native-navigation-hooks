import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useNavigation from './useNavigation'
import { NavigationProvider } from '../contexts/NavigationContext'
import * as createNavigationHelpers from '../helpers/createNavigationHelpers'

const navigationHelperKeys = Object.keys(createNavigationHelpers.default('test'))

describe('useNavigation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return helpers based on componentId retrieved from CompoenentIdProvider', () => {
    jest.spyOn(createNavigationHelpers, 'default')

    const wrapper = ({ children }) => (
      <NavigationProvider value={{ componentId: 'componentId' }}>{children}</NavigationProvider>
    )

    const { result, unmount } = renderHook(() => useNavigation(), { wrapper })

    unmount()

    expect(createNavigationHelpers.default).toHaveBeenCalledWith('componentId')

    expect(Object.keys(result.current)).toEqual(navigationHelperKeys)
    expect(result.error).toBeUndefined()
  })

  it('should return helpers based on componentId retrieved from hook argument', () => {
    jest.spyOn(createNavigationHelpers, 'default')

    const { result, unmount } = renderHook(() => useNavigation('componentId'))

    unmount()

    expect(createNavigationHelpers.default).toHaveBeenCalledWith('componentId')

    expect(Object.keys(result.current)).toEqual(navigationHelperKeys)
    expect(result.error).toBeUndefined()
  })

  it('should throw when not using NavigationProvider nor componentId as argument', () => {
    const { result, unmount } = renderHook(() => useNavigation())

    unmount()

    expect(result.error).toBeInstanceOf(Error)
  })
})