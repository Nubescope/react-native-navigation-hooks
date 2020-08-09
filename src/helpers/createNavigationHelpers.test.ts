import { Navigation } from 'react-native-navigation'
import createNavigationHelpers from './createNavigationHelpers'

jest.mock('react-native-navigation', () => ({
  Navigation: {
    setRoot: jest.fn(),
    setStackRoot: jest.fn(),
    push: jest.fn(),
    showModal: jest.fn(),
    showOverlay: jest.fn(),
    mergeOptions: jest.fn(),
    updateProps: jest.fn(),
    dismissModal: jest.fn(),
    pop: jest.fn(),
    popTo: jest.fn(),
    popToRoot: jest.fn(),
    dismissOverlay: jest.fn(),
    getLaunchArgs: jest.fn(),
    events: jest.fn(),
    dismissAllModals: jest.fn(),
  },
}))

describe('createNavigationHelpers', () => {
  describe('setRoot', () => {
    const { setRoot } = createNavigationHelpers('componentId')

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

  describe('setStackRoot', () => {
    const { setStackRoot } = createNavigationHelpers('componentId')

    it('should call Navigation.setStackRoot using name', async () => {
      await setStackRoot('componentName')

      expect(Navigation.setStackRoot).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
        },
      })
    })

    it('should call Navigation.setStackRoot using name and passProps', async () => {
      await setStackRoot('componentName', { prop1: 'value1' })

      expect(Navigation.setStackRoot).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
        },
      })
    })

    it('should call Navigation.setStackRoot using name, passProps and options', async () => {
      await setStackRoot('componentName', { prop1: 'value1' }, { popGesture: true })

      expect(Navigation.setStackRoot).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
          options: { popGesture: true },
        },
      })
    })

    it('should call Navigation.setStackRoot using name and options', async () => {
      await setStackRoot('componentName', undefined, { popGesture: true })

      expect(Navigation.setStackRoot).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
          options: { popGesture: true },
        },
      })
    })

    it('should call Navigation.setStackRoot using a Layout', async () => {
      await setStackRoot({
        component: {
          name: 'componentName',
        },
      })

      expect(Navigation.setStackRoot).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
        },
      })
    })
  })

  describe('push', () => {
    const { push } = createNavigationHelpers('componentId')

    it('should call Navigation.push using name', async () => {
      await push('componentName')

      expect(Navigation.push).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
        },
      })
    })

    it('should call Navigation.push using name and passProps', async () => {
      await push('componentName', { prop1: 'value1' })

      expect(Navigation.push).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
        },
      })
    })

    it('should call Navigation.push using name, passProps and options', async () => {
      await push('componentName', { prop1: 'value1' }, { popGesture: true })

      expect(Navigation.push).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
          options: { popGesture: true },
        },
      })
    })

    it('should call Navigation.push using name and options', async () => {
      await push('componentName', undefined, { popGesture: true })

      expect(Navigation.push).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
          options: { popGesture: true },
        },
      })
    })

    it('should call Navigation.push using a Layout', async () => {
      await push({
        component: {
          name: 'componentName',
        },
      })

      expect(Navigation.push).toHaveBeenCalledWith('componentId', {
        component: {
          name: 'componentName',
        },
      })
    })
  })

  describe('showModal', () => {
    const { showModal } = createNavigationHelpers('componentId')

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

  describe('showModalStack', () => {
    const { showModalStack } = createNavigationHelpers('componentId')

    it('should call Navigation.showModal using name', async () => {
      await showModalStack('componentName')

      expect(Navigation.showModal).toHaveBeenCalledWith({
        stack: {
          children: [
            {
              component: {
                name: 'componentName',
              },
            },
          ],
        },
      })
    })

    it('should call Navigation.showModal using name and passProps', async () => {
      await showModalStack('componentName', { prop1: 'value1' })

      expect(Navigation.showModal).toHaveBeenCalledWith({
        stack: {
          children: [
            {
              component: {
                name: 'componentName',
                passProps: { prop1: 'value1' },
              },
            },
          ],
        },
      })
    })

    it('should call Navigation.showModal using name, passProps and options', async () => {
      await showModalStack('componentName', { prop1: 'value1' }, { popGesture: true })

      expect(Navigation.showModal).toHaveBeenCalledWith({
        stack: {
          children: [
            {
              component: {
                name: 'componentName',
                passProps: { prop1: 'value1' },
                options: { popGesture: true },
              },
            },
          ],
        },
      })
    })

    it('should call Navigation.showModal using name and options', async () => {
      await showModalStack('componentName', undefined, { popGesture: true })

      expect(Navigation.showModal).toHaveBeenCalledWith({
        stack: {
          children: [
            {
              component: {
                name: 'componentName',
                options: { popGesture: true },
              },
            },
          ],
        },
      })
    })

    it('should call Navigation.showModal using a LayoutStackChildren', async () => {
      await showModalStack({
        component: { name: 'componentName' },
        externalComponent: { name: 'externalComponentName' },
      })

      expect(Navigation.showModal).toHaveBeenCalledWith({
        stack: {
          children: [
            {
              component: { name: 'componentName' },
              externalComponent: { name: 'externalComponentName' },
            },
          ],
        },
      })
    })

    it('should call Navigation.showModal when LayoutStackChildren[] provided', async () => {
      await showModalStack([
        {
          component: { name: 'component1' },
          externalComponent: { name: 'externalComponentName1' },
        },
        {
          component: { name: 'component2' },
          externalComponent: { name: 'externalComponentName2' },
        },
      ])

      expect(Navigation.showModal).toHaveBeenCalledWith({
        stack: {
          children: [
            {
              component: { name: 'component1' },
              externalComponent: { name: 'externalComponentName1' },
            },
            {
              component: { name: 'component2' },
              externalComponent: { name: 'externalComponentName2' },
            },
          ],
        },
      })
    })
  })

  describe('showOverlay', () => {
    const { showOverlay } = createNavigationHelpers('componentId')

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

  describe('mergeOptions', () => {
    const { mergeOptions } = createNavigationHelpers('componentId')

    it('should call Navigation.mergeOptions with componentId', () => {
      mergeOptions({ popGesture: true })

      expect(Navigation.mergeOptions).toHaveBeenCalledWith('componentId', { popGesture: true })
    })
  })

  describe('updateProps', () => {
    const { updateProps } = createNavigationHelpers('componentId')

    it('should call Navigation.updateProps with componentId', () => {
      updateProps({ prop1: 'value1' })

      expect(Navigation.updateProps).toHaveBeenCalledWith('componentId', { prop1: 'value1' })
    })
  })

  describe('dismissModal', () => {
    const { dismissModal } = createNavigationHelpers('componentId')

    it('should call Navigation.dismissModal with componentId', async () => {
      await dismissModal()

      expect(Navigation.dismissModal).toHaveBeenCalledWith('componentId')
    })

    it('should call Navigation.dismissModal using componentId and mergeOptions', async () => {
      await dismissModal({ popGesture: true })

      expect(Navigation.dismissModal).toHaveBeenCalledWith('componentId', { popGesture: true })
    })

    it('should call Navigation.dismissModal using only componentId', async () => {
      await dismissModal(null)

      expect(Navigation.dismissModal).toHaveBeenCalledWith('componentId')
    })
  })

  describe('pop', () => {
    const { pop } = createNavigationHelpers('componentId')

    it('should call Navigation.pop with componentId', async () => {
      await pop()

      expect(Navigation.pop).toHaveBeenCalledWith('componentId')
    })

    it('should call Navigation.pop using componentId and mergeOptions', async () => {
      await pop({ popGesture: true })

      expect(Navigation.pop).toHaveBeenCalledWith('componentId', { popGesture: true })
    })
  })

  describe('popTo', () => {
    const { popTo } = createNavigationHelpers('componentId')

    it('should call Navigation.popTo with componentId', async () => {
      await popTo()

      expect(Navigation.popTo).toHaveBeenCalledWith('componentId')
    })

    it('should call Navigation.popTo using componentId and mergeOptions', async () => {
      await popTo({ popGesture: true })

      expect(Navigation.popTo).toHaveBeenCalledWith('componentId', { popGesture: true })
    })
  })

  describe('popToRoot', () => {
    const { popToRoot } = createNavigationHelpers('componentId')

    it('should call Navigation.popToRoot with componentId', async () => {
      await popToRoot()

      expect(Navigation.popToRoot).toHaveBeenCalledWith('componentId')
    })

    it('should call Navigation.popToRoot using componentId and mergeOptions', async () => {
      await popToRoot({ popGesture: true })

      expect(Navigation.popToRoot).toHaveBeenCalledWith('componentId', { popGesture: true })
    })
  })

  describe('dismissOverlay', () => {
    const { dismissOverlay } = createNavigationHelpers('componentId')

    it('should call Navigation.dismissOverlay with componentId', async () => {
      await dismissOverlay()

      expect(Navigation.dismissOverlay).toHaveBeenCalledWith('componentId')
    })
  })

  describe('events', () => {
    const { events } = createNavigationHelpers('componentId')

    it('should return Navigation.events function as is', () => {
      events()

      expect(Navigation.events).toHaveBeenCalled()
    })
  })

  describe('getLaunchArgs', () => {
    const { getLaunchArgs } = createNavigationHelpers('componentId')

    it('should return Navigation.getLaunchArgs function as is', async () => {
      await getLaunchArgs()

      expect(Navigation.getLaunchArgs).toHaveBeenCalled()
    })
  })

  describe('dismissAllModals', () => {
    const { dismissAllModals } = createNavigationHelpers('componentId')

    it('should return Navigation.dismissAllModals function as is', async () => {
      await dismissAllModals()

      expect(Navigation.dismissAllModals).toHaveBeenCalled()
    })
  })
})
