import { Navigation } from 'react-native-navigation'
import showOverlay from './showOverlay'

jest.mock('react-native-navigation', () => ({
  Navigation: {
    showOverlay: jest.fn(),
  },
}))

describe('showOverlay', () => {
  it('should call Navigation.showOverlay using name', async () => {
    await showOverlay('componentName')

    expect(Navigation.showOverlay).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
      },
    })
  })

  it('should call Navigation.showOverlay using name and passProps', async () => {
    await showOverlay('componentName', { prop1: 'value1' })

    expect(Navigation.showOverlay).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
        passProps: { prop1: 'value1' },
      },
    })
  })

  it('should call Navigation.showOverlay using name, passProps and options', async () => {
    await showOverlay('componentName', { prop1: 'value1' }, { popGesture: true })

    expect(Navigation.showOverlay).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
        passProps: { prop1: 'value1' },
        options: { popGesture: true },
      },
    })
  })

  it('should call Navigation.showOverlay using name and options', async () => {
    await showOverlay('componentName', undefined, { popGesture: true })

    expect(Navigation.showOverlay).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
        options: { popGesture: true },
      },
    })
  })

  it('should call Navigation.showOverlay using a Layout', async () => {
    await showOverlay({
      component: {
        name: 'componentName',
      },
    })

    expect(Navigation.showOverlay).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
      },
    })
  })
})
