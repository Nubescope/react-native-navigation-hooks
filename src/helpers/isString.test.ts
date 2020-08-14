import isString from './isString'

describe('isString', () => {
  it('should return false', () => {
    expect(isString()).toBeFalsy()
    expect(isString({})).toBeFalsy()
    expect(isString([])).toBeFalsy()
    expect(isString(false)).toBeFalsy()
    expect(isString(1)).toBeFalsy()
  })

  it('should return true', () => {
    expect(isString('str')).toBeTruthy()
  })
})
