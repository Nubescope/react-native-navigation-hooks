# React Native Navigation Hooks [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React%20Native%20Navigation%20Hooks!&url=https://github.com/underscopeio/react-native-navigation-hooks&via=underscopeio&hashtags=react,reactjs,reactnative,javascript,hooks,reactnativenavigation)

A set of React hooks for React Native Navigation

[![version](https://img.shields.io/npm/v/react-native-navigation-hooks.svg)](https://www.npmjs.com/package/react-native-navigation-hooks)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/react-native-navigation-hooks.svg)](https://www.npmjs.com/package/react-native-navigation-hooks)
[![downloads](https://img.shields.io/npm/dt/react-native-navigation-hooks.svg)](https://www.npmjs.com/package/react-native-navigation-hooks)
[![codecov](https://codecov.io/gh/underscopeio/react-native-navigation-hooks/branch/master/graph/badge.svg)](https://codecov.io/gh/underscopeio/react-native-navigation-hooks)

## Installation

- `npm install react-native-navigation-hooks --save`, or
- `yarn add react-native-navigation-hooks`

## Usage

### useNavigationComponentDidAppear

Called each time this component appears on screen (attached to the view hierarchy) [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=componentdidappear)

```js
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationComponentDidAppear(e => {
    console.log(`${e.componentName} (${e.componentId}) appeared`)
  })

  // Listen events only for this screen (componentId)
  useNavigationComponentDidAppear(e => {
    console.log(`${e.componentName} appeared`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationComponentDidDisappear

Called each time this component disappears from screen (detached from the view heirarchy) [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=componentdiddisappear)

```js
import { useNavigationComponentDidDisappear } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationComponentDidDisappear(e => {
    console.log(`${e.componentName} (${e.componentId}) disappeared`)
  })

  // Listen events only for this screen (componentId)
  useNavigationComponentDidDisappear(e => {
    console.log(`${e.componentName} disappeared`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationCommand

The commandListener is called whenever a Navigation command (i.e push, pop, showModal etc) is invoked. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registercommandlistener)

```js
import { useNavigationCommand } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationCommand((commandName, { commandId, layout }) => {
    console.log(`Command ${commandName} (${commandId}) invoked`)
  })

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationCommandComplete

Invoked when a command finishes executing in native. If the command contains animations, for example pushed screen animation,) the listener is invoked after the animation ends. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registercommandcompletedlistener)

```js
import { useNavigationCommandComplete } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationCommandComplete(({ commandId, commandName, completionTime, params }) => {
    console.log(`Command ${name} (${commandId}) invocation finished`)
  })

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationModalAttemptedToDismiss

Invoked only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal swiped down to dismiss. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registermodalattemptedtodismisslistenerios-13-only)

```js
import { useNavigationModalAttemptedToDismiss } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationModalAttemptedToDismiss(e => {
    console.log(`Modal attempted dismissed on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen (componentId)
  useNavigationModalAttemptedToDismiss(e => {
    console.log(`Modal attempted dismissed on componentId:${e.componentId}`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationModalDismiss

Invoked when modal dismissed. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registermodaldismissedlistener)

```js
import { useNavigationModalDismiss } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationModalDismiss(e => {
    console.log(`Modals dismissed: ${e.modalsDismissed} on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen (componentId)
  useNavigationModalDismiss(e => {
    console.log(`Modals dismissed: ${e.modalsDismissed}`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationScreenPop

Invoked when screen is popped. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registerscreenpoppedlistener)

```js
import { useNavigationScreenPop } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationScreenPop(e => {
    console.log(`Screen was popped on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen (componentId)
  useNavigationScreenPop(e => {
    console.log(`Screen was popped on componentId: ${e.componentId}`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationBottomTabSelect

Invoked when a BottomTab is selected by the user. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registerbottomtabselectedlistener)

```js
import { useNavigationBottomTabSelect } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationBottomTabSelect(e => {
    console.log(`Selected tab id ${e.selectedTabIndex}, unselected tab id ${e.unselectedTabIndex}`)
  })

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationBottomTabLongPress

Invoked when a BottomTab is long pressed by the user. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=registerbottomtablongpressedlistener)

```js
import { useNavigationBottomTabLongPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationBottomTabLongPress(e => {
    console.log(`Selected tab id ${e.selectedTabIndex}`)
  })

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationButtonPress

Emitted whenever a TopBar button is pressed by the user. [more info](https://wix.github.io/react-native-navigation/#/docs/topBar-buttons?id=handling-button-press-events)

```js
import { useNavigationButtonPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationButtonPress(e => {
    console.log(`Pressed ${e.buttonId} on componentId: ${e.componentId}`)
  })

  // Listen events only for this screen (componentId)
  useNavigationButtonPress(e => {
    console.log(`Pressed ${e.buttonId} on this screen`)
  }, componentId)

  // Listen events only for this screen (componentId) and specific buttonId (profileButton)
  useNavigationButtonPress(
    e => {
      console.log('Pressed profile button on this screen!')
    },
    componentId,
    'profileButton'
  )

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationSearchBarUpdate (iOS 11+ only)

Called when a SearchBar from NavigationBar gets updated. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=searchbarupdated-ios-11-only)

```js
import { useNavigationSearchBarUpdate } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationSearchBarUpdate(e => {
    console.log(
      `Seach bar text changed to ${e.text}${e.focussed ? ' (focussed)' : ''} on componentId: ${e.componentId}`
    )
  })

  // Listen events only for this screen (componentId)
  useNavigationSearchBarUpdate(e => {
    console.log(`Seach bar text changed to ${e.text}${e.focussed ? ' (focussed)' : ''} on this screen`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationSearchBarCancelPress (iOS 11+ only)

Called when the cancel button on the SearchBar from NavigationBar gets pressed. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=searchbarcancelpressed-ios-11-only)

```js
import { useNavigationSearchBarCancelPress } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationSearchBarCancelPress(e => {
    console.log(`Seach bar cancel button pressed on componentName: ${e.componentName}`)
  })

  // Listen events only for this screen (componentId)
  useNavigationSearchBarCancelPress(e => {
    console.log('Seach bar cancel button pressed on this screen')
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

### useNavigationPreviewComplete (iOS 11.4+ only)

Called when preview peek is completed. [more info](https://wix.github.io/react-native-navigation/#/docs/events?id=previewcompleted-ios-114-only)

```js
import { useNavigationPreviewComplete } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  // Global listener
  useNavigationPreviewComplete(e => {
    console.log(`Preview component ${e.previewComponentId} shown on ${e.componentId}`)
  })

  // Listen events only for this screen (componentId)
  useNavigationPreviewComplete(e => {
    console.log(`Preview component ${e.previewComponentId} shown on this screen`)
  }, componentId)

  return (
    <View>
      <Text>Screen Component</Text>
    </View>
  )
}
```

## Suggestions

### Memoize your handlers

You can take advantage of the [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) hook to memoize your handlers.

```js
import { useNavigationPreviewComplete } from 'react-native-navigation-hooks'

const ScreenComponent = ({ componentId }) => {
  const handler = useCallback(
    e => {
      console.log(`Parameter: ${parameter}`)
    },
    [paramenter]
  )

  useNavigationButtonPress(handler, componentId, 'profileButton')
}
```
