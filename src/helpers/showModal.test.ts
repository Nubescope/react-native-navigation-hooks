import { Navigation } from 'react-native-navigation'
import showModal from './showModal'

jest.mock('react-native-navigation', () => ({
  Navigation: {
    showModal: jest.fn(),
  },
}))

describe('showModal', () => {
  it('should call Navigation.showModal using name', async () => {
    await showModal('componentName')

    expect(Navigation.showModal).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
      },
    })
  })

  it('should call Navigation.showModal using name and passProps', async () => {
    await showModal('componentName', { prop1: 'value1' })

    expect(Navigation.showModal).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
        passProps: { prop1: 'value1' },
      },
    })
  })

  it('should call Navigation.showModal using name, passProps and options', async () => {
    await showModal('componentName', { prop1: 'value1' }, { popGesture: true })

    expect(Navigation.showModal).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
        passProps: { prop1: 'value1' },
        options: { popGesture: true },
      },
    })
  })

  it('should call Navigation.showModal using name and options', async () => {
    await showModal('componentName', undefined, { popGesture: true })

    expect(Navigation.showModal).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
        options: { popGesture: true },
      },
    })
  })

  it('should call Navigation.showModal using a Layout', async () => {
    await showModal({
      component: {
        name: 'componentName',
      },
    })

    expect(Navigation.showModal).toHaveBeenCalledWith({
      component: {
        name: 'componentName',
      },
    })
  })
})
