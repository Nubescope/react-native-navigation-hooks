# React Native Navigation Hooks [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React%20Native%20Navigation%20Hooks!&url=https://github.com/underscopeio/react-native-navigation-hooks&via=underscopeio&hashtags=react,reactjs,reactnative,javascript,hooks,reactnativenavigation)

A set of React hooks for React Native Navigation

[![version](https://img.shields.io/npm/v/react-native-navigation-hooks.svg)](https://www.npmjs.com/package/react-native-navigation-hooks)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-native-navigation-hooks.svg)](https://www.npmjs.com/package/react-native-navigation-hooks)
[![downloads](https://img.shields.io/npm/dt/react-native-navigation-hooks.svg)](https://www.npmjs.com/package/react-native-navigation-hooks)
[![codecov](https://codecov.io/gh/underscopeio/react-native-navigation-hooks/branch/master/graph/badge.svg)](https://codecov.io/gh/underscopeio/react-native-navigation-hooks)

## Supported versions

<table>
    <tr>
        <td>RN Navigation</td>
        <td align="center">>= 2.21.0</td>
        <td align="center">>= 4.0.7</td>
        <td align="center">>= 4.5.0</td>
        <td align="center">>= 6.5.0</td>
    </tr>
    <tr>
        <td>RN Navigation Hooks</td>
        <td align="center"><= 3.x.x</td>
        <td align="center"> 4.x.x</td>
        <td align="center"> 5.x.x</td>
        <td align="center"> 6.x.x</td>
    </tr>
</table>

## Installation

- `npm install react-native-navigation-hooks --save`, or
- `yarn add react-native-navigation-hooks`

## Hooks

### `useNavigation`

This hook provides you a set of navigation helpers that aims to reduce the boilerplate required to perform common navigation actions specially those that need the `componentId` argument.

In order to use this hook your screens must use the `<NavigationProvider>` to pass the `componentId` to the three below so the `useNavigation` hook can read it.

You can take advantage of the [withNavigationProvider](#withNavigationProvider) or you could also use the `<NavigationProvider>` manually.

```tsx
Navigation.registerComponent('MyScreenComponent', () => withNavigationProvider(MyScreenComponent))

// or

import { ComponentIdContext } from 'react-native-navigation-hooks'

Navigation.registerComponent(
  'MyScreenComponent',
  () => (props): ReactElement => {
    return (
      <NavigationProvider>
        <MyScreenComponent {...props} />
      </NavigationProvider>>
    )
  },
  () => MyScreenComponent
)
```

Then you just need to use `useNavigation` without worrying about the `componentId` and boilerplate code 💪

📜 &#12644;**Before**

```tsx
import { Navigation } from 'react-native-navigation'

const MyScreen = ({ componentId }) => {
  const handleShowModalPress = () =>
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'ModalScreen',
            },
          },
        ],
      },
    })

  return <Text onPress={handleShowModalPress}>Show Modal</Text>
}
```

💅 &#12644;**After**

```tsx
import { useNavigation } from 'react-native-navigation-hooks'

const MyScreen = () => {
  const { showModal } = useNavigation()

  const handleShowModalPress = () => showModal('ModalScreen')

  return <Text onPress={handleShowModalPress}>Show Modal</Text>
}
```

You can check the list of the supported methods and the arguments overload [here](./src/helpers/createNavigationHelpers.ts).

### `useNavigationComponentDidAppear`

Called each time this component appears on screen (attached to the view hierarchy) [more info](https://wix.github.io/react-native-navigation/api/events/#componentdidappear)

```tsx
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationComponentDidAppear(e => {
    console.log(`${e.componentName} appeared`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationComponentDidAppear(
    e => {
      console.log(`${e.componentName} appeared`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationComponentDidAppear(
    e => {
      console.log(`${e.componentName} appeared`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationComponentDidDisappear`

Called each time this component disappears from screen (detached from the view heirarchy) [more info](https://wix.github.io/react-native-navigation/api/events/#componentdiddisappear)

```tsx
import { useNavigationComponentDidDisappear } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationComponentDidDisappear(e => {
    console.log(`${e.componentName} appeared`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationComponentDidDisappear(
    e => {
      console.log(`${e.componentName} appeared`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationComponentDidDisappear(
    e => {
      console.log(`${e.componentName} appeared`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationCommand`

The commandListener is called whenever a Navigation command (i.e push, pop, showModal etc) is invoked. [more info](https://wix.github.io/react-native-navigation/api/events/#registercommandlistener)

```tsx
import { useNavigationCommand } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationCommand((commandName, { commandId, layout }) => {
    console.log(`Command ${commandName} (${commandId}) invoked`)
  })

  // Filtering event by commandName
  useNavigationCommand((commandName, { commandId, layout }) => {
    console.log(`Command ${commandName} (${commandId}) invoked`)
  }, 'commandName')

  return <Text>Screen Component</Text>
}
```

### `useNavigationCommandComplete`

Invoked when a command finishes executing in native. If the command contains animations, for example pushed screen animation,) the listener is invoked after the animation ends. [more info](https://wix.github.io/react-native-navigation/api/events/#registercommandcompletedlistener)

```tsx
import { useNavigationCommandComplete } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationCommandComplete(({ commandId, commandName, completionTime, params }) => {
    console.log(`Command ${name} (${commandId}) invocation finished`)
  })

  // Filtering event by commandName
  useNavigationCommandComplete(({ commandId, commandName, completionTime, params }) => {
    console.log(`Command ${name} (${commandId}) invocation finished`)
  }, 'commandName')

  return <Text>Screen Component</Text>
}
```

### `useNavigationModalAttemptedToDismiss`

Invoked only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal swiped down to dismiss. [more info](https://wix.github.io/react-native-navigation/api/events/#registermodalattemptedtodismisslistenerios-13-only)

```tsx
import { useNavigationModalAttemptedToDismiss } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationModalAttemptedToDismiss(e => {
    console.log(`Modal attempted dismissed on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationModalAttemptedToDismiss(
    e => {
      console.log(`Modal attempted dismissed on componentId: ${e.componentId}`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationModalAttemptedToDismiss(
    e => {
      console.log(`Modal attempted dismissed on componentId: ${e.componentId}`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationModalDismiss`

Invoked when modal dismissed. [more info](https://wix.github.io/react-native-navigation/api/events/#registermodaldismissedlistener)

```tsx
import { useNavigationModalDismiss } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationModalDismiss(e => {
    console.log(`Modals dismissed: ${e.modalsDismissed} on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationModalDismiss(
    e => {
      console.log(`Modals dismissed: ${e.modalsDismissed} on componentId: ${e.componentId}`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationModalDismiss(
    e => {
      console.log(`Modals dismissed: ${e.modalsDismissed} on componentId: ${e.componentId}`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationScreenPop`

Invoked when screen is popped. [more info](https://wix.github.io/react-native-navigation/api/events/#registerscreenpoppedlistener)

```tsx
import { useNavigationScreenPop } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationScreenPop(e => {
    console.log(`Screen was popped on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationScreenPop(
    e => {
      console.log(`Screen was popped on componentId: ${e.componentId}`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationScreenPop(
    e => {
      console.log(`Screen was popped on componentId: ${e.componentId}`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationBottomTabSelect`

Invoked when a BottomTab is selected by the user. [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtabselectedlistener)

```tsx
import { useNavigationBottomTabSelect } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationBottomTabSelect(e => {
    console.log(`Selected tab id ${e.selectedTabIndex}, unselected tab id ${e.unselectedTabIndex}`)
  })

  return <Text>Screen Component</Text>
}
```

### `useNavigationBottomTabPress`

Invoked when a BottomTab is pressed by the user. [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtabpressedlistener)

```tsx
import { useNavigationBottomTabPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationBottomTabPress(e => {
    console.log(`Selected tab id ${e.tabIndex}`)
  })

  return <Text>Screen Component</Text>
}
```

### `useNavigationBottomTabLongPress`

Invoked when a BottomTab is long pressed by the user. [more info](https://wix.github.io/react-native-navigation/api/events/#registerbottomtablongpressedlistener)

```tsx
import { useNavigationBottomTabLongPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationBottomTabLongPress(e => {
    console.log(`Selected tab id ${e.selectedTabIndex}`)
  })

  return <Text>Screen Component</Text>
}
```

### `useNavigationButtonPress`

Emitted whenever a TopBar button is pressed by the user. [more info](https://wix.github.io/react-native-navigation/api/events/#navigationbuttonpressed-event)

```tsx
import { useNavigationButtonPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen and all buttons when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationButtonPress(e => {
    console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen and all buttons by providing componentId as paramenter
  useNavigationButtonPress(
    e => {
      console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationButtonPress(
    e => {
      console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`)
    },
    { global: true }
  )

  // Listen events only for this screen and a specifi buttonc by providing componentId and button as options
  useNavigationButtonPress(
    e => {
      console.log('Pressed profile button on this screen!')
    },
    { componentId, buttonId: 'profileButton' }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationSearchBarUpdate (iOS 11+ only)`

Called when a SearchBar from NavigationBar gets updated. [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarupdated-ios-11-only)

```tsx
import { useNavigationSearchBarUpdate } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationSearchBarUpdate(e => {
    console.log(`Seach bar text changed to ${e.text}${e.focussed ? ' (focussed)' : ''} on this screen`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationSearchBarUpdate(
    e => {
      console.log(`Seach bar text changed to ${e.text}${e.focussed ? ' (focussed)' : ''} on this screen`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationSearchBarUpdate(
    e => {
      console.log(
        `Seach bar text changed to ${e.text}${e.focussed ? ' (focussed)' : ''} on componentId: ${e.componentId}`
      )
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationSearchBarCancelPress (iOS 11+ only)`

Called when the cancel button on the SearchBar from NavigationBar gets pressed. [more info](https://wix.github.io/react-native-navigation/api/events/#searchbarcancelpressed-ios-11-only)

```tsx
import { useNavigationSearchBarCancelPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationSearchBarCancelPress(e => {
    console.log('Seach bar cancel button pressed on this screen')
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationSearchBarCancelPress(
    e => {
      console.log('Seach bar cancel button pressed on this screen')
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationSearchBarCancelPress(
    e => {
      console.log(`Seach bar cancel button pressed on componentName: ${e.componentName}`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

### `useNavigationPreviewComplete (iOS 11.4+ only)`

Called when preview peek is completed. [more info](https://wix.github.io/react-native-navigation/api/events/#previewcompleted-ios-114-only)

```tsx
import { useNavigationPreviewComplete } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Listen events only for this screen when using withNavigation HOC or <NavigationProvider> (if neither of those are provided it will warn you at least you provide a `{ global: true}` option)
  useNavigationPreviewComplete(e => {
    console.log(`Preview component ${e.previewComponentId} shown on this screen`)
  })

  // Listen events only for this screen by providing componentId as paramenter
  useNavigationPreviewComplete(
    e => {
      console.log(`Preview component ${e.previewComponentId} shown on this screen`)
    },
    { componentId }
  )

  // Global event handler. You should probably never use this but just in case.
  useNavigationPreviewComplete(
    e => {
      console.log(`Preview component ${e.previewComponentId} shown on ${e.componentId}`)
    },
    { global: true }
  )

  return <Text>Screen Component</Text>
}
```

## Suggestions

### Memoize your handlers

You can take advantage of the [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) hook to memoize your handlers.

```tsx
import { useNavigationButtonPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  const handler = useCallback(
    e => {
      console.log(`Parameter: ${parameter}`)
    },
    [paramenter]
  )

  useNavigationButtonPress(handler, { buttonId: 'profileButton' })
}
```
