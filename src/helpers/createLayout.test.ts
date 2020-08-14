import createLayout from './createLayout'

describe('createLayout', () => {
  it('should create a layout passing name', () => {
    const layout = createLayout('componentName')

    expect(layout).toEqual({
      component: {
        name: 'componentName',
      },
    })
  })

  it('should create a layout passing name and props', () => {
    const layout = createLayout('componentName', { prop1: 'value1' })
    expect(layout).toEqual({
      component: {
        name: 'componentName',
        passProps: {
          prop1: 'value1',
        },
      },
    })
  })

  it('should create a layout passing name and options', () => {
    const layout = createLayout('componentName', undefined, { popGesture: true })

    expect(layout).toEqual({
      component: {
        name: 'componentName',
        options: {
          popGesture: true,
        },
      },
    })
  })

  it('should create a layout passing name props and options', () => {
    const layout = createLayout('componentName', { prop1: 'value1' }, { popGesture: true })

    expect(layout).toEqual({
      component: {
        name: 'componentName',
        passProps: {
          prop1: 'value1',
        },
        options: {
          popGesture: true,
        },
      },
    })
  })

  it('should create a layout and remove the passProps and options when fields are null', () => {
    const layout = createLayout('componentName', null, null)

    expect(layout).toEqual({
      component: {
        name: 'componentName',
      },
    })
  })
})
