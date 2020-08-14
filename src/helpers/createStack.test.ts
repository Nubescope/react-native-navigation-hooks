import createStack from './createStack'

describe('createStack', () => {
  it('should create a stack with one children based on name', () => {
    const stack = createStack('componentName')

    expect(stack).toEqual({
      children: [
        {
          component: {
            name: 'componentName',
          },
        },
      ],
    })
  })

  it('should create a stack with one children based on name, props', () => {
    const stack = createStack('componentName', { prop1: 'value1' })

    expect(stack).toEqual({
      children: [
        {
          component: {
            name: 'componentName',
            passProps: { prop1: 'value1' },
          },
        },
      ],
    })
  })

  it('should create a stack with one children based on name, props and options', () => {
    const stack = createStack('componentName', { prop1: 'value1' }, { popGesture: true })

    expect(stack).toEqual({
      children: [
        {
          component: {
            name: 'componentName',
            passProps: { prop1: 'value1' },
            options: { popGesture: true },
          },
        },
      ],
    })
  })

  it('should create a stack with one children if layout stack children provided', () => {
    const stack = createStack({
      component: {
        name: 'componentName',
        passProps: { prop1: 'value1' },
        options: { popGesture: true },
      },
      externalComponent: {
        name: 'externalComponent',
      },
    })

    expect(stack).toEqual({
      children: [
        {
          component: {
            name: 'componentName',
            passProps: { prop1: 'value1' },
            options: { popGesture: true },
          },
          externalComponent: {
            name: 'externalComponent',
          },
        },
      ],
    })
  })

  it('should create a stack with one children if layout id and stack children provided', () => {
    const stack = createStack(
      {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
          options: { popGesture: true },
        },
        externalComponent: {
          name: 'externalComponent',
        },
      },
      'stackId'
    )

    expect(stack).toEqual({
      id: 'stackId',
      children: [
        {
          component: {
            name: 'componentName',
            passProps: { prop1: 'value1' },
            options: { popGesture: true },
          },
          externalComponent: {
            name: 'externalComponent',
          },
        },
      ],
    })
  })

  it('should create a stack with one children if layout id, stack children and options provided', () => {
    const stack = createStack(
      {
        component: {
          name: 'componentName',
          passProps: { prop1: 'value1' },
          options: { popGesture: true },
        },
        externalComponent: {
          name: 'externalComponent',
        },
      },
      'stackId',
      { popGesture: false }
    )

    expect(stack).toEqual({
      id: 'stackId',
      options: { popGesture: false },
      children: [
        {
          component: {
            name: 'componentName',
            passProps: { prop1: 'value1' },
            options: { popGesture: true },
          },
          externalComponent: {
            name: 'externalComponent',
          },
        },
      ],
    })
  })

  it('should create a stack with one children if layout stack children array provided', () => {
    const firstChild = {
      component: {
        name: 'componentName1',
        passProps: { prop1: 'value1' },
        options: { popGesture: true },
      },
      externalComponent: {
        name: 'externalComponent1',
      },
    }

    const secondChild = {
      component: {
        name: 'componentName2',
        passProps: { prop1: 'value1' },
        options: { popGesture: true },
      },
      externalComponent: {
        name: 'externalComponent2',
      },
    }
    const stack = createStack([firstChild, secondChild])

    expect(stack).toEqual({
      children: [firstChild, secondChild],
    })
  })
})
