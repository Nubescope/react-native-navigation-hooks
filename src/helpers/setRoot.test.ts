import { Navigation } from 'react-native-navigation'
import setRoot from './setRoot'

jest.mock('react-native-navigation', () => ({
  Navigation: {
    setRoot: jest.fn(),
  },
}))

describe('setRoot', () => {
  it('should call Navigation.setRoot using name', async () => {
    await setRoot('componentName')

    expect(Navigation.setRoot).toHaveBeenCalledWith({
      root: {
        component: {
          name: 'componentName',
        },
      },
    })
  })

  it('should call Navigation.setRoot using name and passProps', async () => {
    await setRoot('componentName', { prop1: 'value1' })

    expect(Navigation.setRoot).toHaveBeenCalledWith({
      root: {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
        },
      },
    })
  })

  it('should call Navigation.setRoot using name, passProps and options', async () => {
    await setRoot('componentName', { prop1: 'value1' }, { popGesture: true })

    expect(Navigation.setRoot).toHaveBeenCalledWith({
      root: {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
          options: { popGesture: true },
        },
      },
    })
  })

  it('should call Navigation.setRoot using name and options', async () => {
    await setRoot('componentName', undefined, { popGesture: true })

    expect(Navigation.setRoot).toHaveBeenCalledWith({
      root: {
        component: {
          name: 'componentName',
          options: { popGesture: true },
        },
      },
    })
  })

  it('should call Navigation.setRoot using a Layout', async () => {
    await setRoot({
      component: {
        name: 'componentName',
      },
    })

    expect(Navigation.setRoot).toHaveBeenCalledWith({
      root: {
        component: {
          name: 'componentName',
        },
      },
    })
  })

  it('should call Navigation.setRoot using a LayoutRoot', async () => {
    await setRoot({
      root: {
        component: {
          name: 'componentName',
        },
      },
    })

    expect(Navigation.setRoot).toHaveBeenCalledWith({
      root: {
        component: {
          name: 'componentName',
        },
      },
    })
  })
})
