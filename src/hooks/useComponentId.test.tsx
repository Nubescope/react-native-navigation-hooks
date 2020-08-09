import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useComponentId from './useComponentId'
import { ComponentIdProvider } from '../contexts/ComponentIdContext'

describe('useComponentId', () => {
  it('should return ComponentIdContext value', () => {
    const wrapper = ({ children }) => <ComponentIdProvider value="componentId">{children}</ComponentIdProvider>

    const { result, unmount } = renderHook(() => useComponentId(), { wrapper })

    unmount()

    expect(result.current).toBe('componentId')
    expect(result.error).toBeUndefined()
  })
})
