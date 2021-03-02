import { Navigation } from 'react-native-navigation'
import createNavigationCommands from './createNavigationCommands'
import { setRoot, showModal, showOverlay } from './'

jest.mock('react-native-navigation', () => ({
  Navigation: {
    setStackRoot: jest.fn(),
    push: jest.fn(),
    mergeOptions: jest.fn(),
    updateProps: jest.fn(),
    dismissModal: jest.fn(),
    pop: jest.fn(),
    popTo: jest.fn(),
    popToRoot: jest.fn(),
    dismissOverlay: jest.fn(),
    getLaunchArgs: jest.fn(),
    setDefaultOptions: jest.fn(),
    dismissAllModals: jest.fn(),
  },
}))

jest.mock('./setRoot')
jest.mock('./showModal')
jest.mock('./showOverlay')

describe('createNavigationCommands', () => {
  describe('setRoot (backward compatibillity)', () => {
    const { setRoot: setRootCommand } = createNavigationCommands('componentId')

    it('should call setRoot helper with same parameters', async () => {
      await setRootCommand('componentName')

      expect(setRoot).toHaveBeenCalledWith('componentName')
    })
  })

  describe('showModal (backward compatibillity)', () => {
    const { showModal: showModalCommand } = createNavigationCommands('componentId')

    it('should call showModal helper with same parameters', async () => {
      await showModal('componentName')

      expect(showModalCommand).toHaveBeenCalledWith('componentName')
    })
  })

  describe('showOverlay (backward compatibillity)', () => {
    const { showOverlay: showOverlayCommand } = createNavigationCommands('componentId')

    it('should call showOverlay helper with same parameters', async () => {
      await showOverlay('componentName')

      expect(showOverlayCommand).toHaveBeenCalledWith('componentName')
    })
  })

  describe('setDefaultOptions (backward compatibillity)', () => {
    const { setDefaultOptions } = createNavigationCommands('componentId')

    it('should return Navigation.setDefaultOptions function as is', () => {
      setDefaultOptions({})

      expect(Navigation.setDefaultOptions).toHaveBeenCalledWith({})
    })
  })

  describe('getLaunchArgs (backward compatibillity)', () => {
    const { getLaunchArgs } = createNavigationCommands('componentId')

    it('should return Navigation.getLaunchArgs function as is', async () => {
      await getLaunchArgs()

      expect(Navigation.getLaunchArgs).toHaveBeenCalled()
    })
  })

  describe('dismissAllModals (backward compatibillity)', () => {
    const { dismissAllModals } = createNavigationCommands('componentId')

    it('should return Navigation.dismissAllModals function as is', async () => {
      await dismissAllModals()

      expect(Navigation.dismissAllModals).toHaveBeenCalled()
    })
  })

  describe('setStackRoot', () => {
    const { setStackRoot } = createNavigationCommands('componentId')

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
    const { push } = createNavigationCommands('componentId')

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

  describe('mergeOptions', () => {
    const { mergeOptions } = createNavigationCommands('componentId')

    it('should call Navigation.mergeOptions with componentId', () => {
      mergeOptions({ popGesture: true })

      expect(Navigation.mergeOptions).toHaveBeenCalledWith('componentId', { popGesture: true })
    })
  })

  describe('updateProps', () => {
    const { updateProps } = createNavigationCommands('componentId')

    it('should call Navigation.updateProps with componentId', () => {
      updateProps({ prop1: 'value1' })

      expect(Navigation.updateProps).toHaveBeenCalledWith('componentId', { prop1: 'value1' })
    })
  })

  describe('dismissModal', () => {
    const { dismissModal } = createNavigationCommands('componentId')

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
    const { pop } = createNavigationCommands('componentId')

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
    const { popTo } = createNavigationCommands('componentId')

    it('should call Navigation.popTo with componentId', async () => {
      await popTo('targetComponentId')

      expect(Navigation.popTo).toHaveBeenCalledWith('targetComponentId')
    })

    it('should call Navigation.popTo using componentId and mergeOptions', async () => {
      await popTo('targetComponentId', { popGesture: true })

      expect(Navigation.popTo).toHaveBeenCalledWith('targetComponentId', { popGesture: true })
    })
  })

  describe('popToRoot', () => {
    const { popToRoot } = createNavigationCommands('componentId')

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
    const { dismissOverlay } = createNavigationCommands('componentId')

    it('should call Navigation.dismissOverlay with componentId', async () => {
      await dismissOverlay()

      expect(Navigation.dismissOverlay).toHaveBeenCalledWith('componentId')
    })
  })
})
