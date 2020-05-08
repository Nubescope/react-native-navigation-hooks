import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
  useNavigationCommand,
  useNavigationCommandComplete,
  useNavigationModalAttemptedToDismiss,
  useNavigationModalDismiss,
  useNavigationScreenPop,
  useNavigationBottomTabSelect,
  useNavigationBottomTabPress,
  useNavigationBottomTabLongPress,
  useNavigationButtonPress,
  useNavigationSearchBarUpdate,
  useNavigationSearchBarCancelPress,
  useNavigationPreviewComplete,
} from 'react-native-navigation-hooks'

/**
 * Sample React Native Navigation Hooks app
 */

const App = ({ componentId }) => {
  /**
   * Handlers
   */

  const handleComponentDidAppear = useCallback(e => {
    console.log(`${e.componentName} appeared`)
  }, [])

  const handleComponentDidDisappear = useCallback(e => {
    console.log(`${e.componentName} disappeared`)
  }, [])

  const handleNavigationCommand = useCallback((commandName, { commandId, layout }) => {
    console.log(`Command ${commandName} (${commandId}) (${layout}) invoked`)
  }, [])

  const handleNavigationCommandComplete = useCallback(({ commandId, commandName, completionTime, params }) => {
    console.log(
      `Command ${commandName}, Time ${completionTime}, (${commandId}) invocation finished with params ${params}`
    )
  }, [])

  const handleNavigationModalAttemptedToDismiss = useCallback(e => {
    console.log(`Modal attempted dismissed on componentId:${e.componentId}`)
  }, [])

  const handleNavigationModalDismiss = useCallback(e => {
    console.log(`Modals dismissed: ${e.modalsDismissed} on componentId: ${e.componentId}`)
  }, [])

  const handleNavigationScreenPop = useCallback(e => {
    console.log(`Screen was popped on componentId: ${e.componentId}`)
  }, [])

  const handleNavigationBottomTabSelect = useCallback(e => {
    console.log(`Selected tab id ${e.selectedTabIndex}, unselected tab id ${e.unselectedTabIndex}`)
  }, [])

  const handleNavigationBottomTabPress = useCallback(e => {
    console.log(`Selected tab id ${e.tabIndex}`)
  }, [])

  const handleNavigationButtonPress = useCallback(e => {
    console.log(`Nav button press`, e)
  }, [])

  const handleNavigationBottomTabLongPress = useCallback(e => {
    console.log(`Selected tab id ${e.selectedTabIndex}`)
  }, [])

  const handleNavigationSearchBarUpdate = useCallback(e => {
    console.log(
      `Seach bar text changed to ${e.text}${e.focussed ? ' (focussed)' : ''} on componentId: ${e.componentId}`
    )
  }, [])

  const handleNavigationSearchBarCancelPress = useCallback(e => {
    console.log(`Seach bar cancel button pressed on componentName: ${e.componentName}`)
  }, [])

  const handleNavigationPreviewComplete = useCallback(e => {
    console.log(`Preview component ${e.previewComponentId} shown on ${e.componentId}`)
  }, [])

  /**
   * Listeners
   */

  // Listener called each time this component appears on screen (attached to the view hierarchy)
  useNavigationComponentDidAppear(handleComponentDidAppear, componentId)

  // Listener called each time this component disappears from screen (detached from the view heirarchy)
  useNavigationComponentDidDisappear(handleComponentDidDisappear, componentId)

  // Global listener called whenever a Navigation command (i.e push, pop, showModal etc) is invoked.
  useNavigationCommand(handleNavigationCommand)

  // Global listener called when a command finishes executing in native. If the command contains animations, for example pushed screen animation) the listener is invoked after the animation ends.
  useNavigationCommandComplete(handleNavigationCommandComplete)

  // Global listener called only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal swiped down to dismiss. more info
  useNavigationModalAttemptedToDismiss(handleNavigationModalAttemptedToDismiss)

  // Global listener called when modal dismissed.
  useNavigationModalDismiss(handleNavigationModalDismiss)

  // Global listener called when screen is popped.
  useNavigationScreenPop(handleNavigationScreenPop)

  // Global listener called when a BottomTab is selected by the user.
  useNavigationBottomTabSelect(handleNavigationBottomTabSelect)

  // Global listener called when a BottomTab is pressed by the user.
  useNavigationBottomTabPress(handleNavigationBottomTabPress)

  // Global listener called when a BottomTab is long pressed by the user.
  useNavigationBottomTabLongPress(handleNavigationBottomTabLongPress)

  // Current screen listener called whenever a TopBar button is pressed by the user.
  useNavigationButtonPress(handleNavigationButtonPress, componentId)

  // Global listener called when a SearchBar from NavigationBar gets updated (iOS 11+ only)
  useNavigationSearchBarUpdate(handleNavigationSearchBarUpdate)

  // Global listener called when the cancel button on the SearchBar from NavigationBar gets pressed (iOS 11+ only)
  useNavigationSearchBarCancelPress(handleNavigationSearchBarCancelPress)

  // Global listener called when preview peek is completed (iOS 11.4+ only)
  useNavigationPreviewComplete(handleNavigationPreviewComplete)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native Navigation Hooks Example</Text>
    </View>
  )
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  text: {
    textAlign: 'center',
    fontSize: 24,
    width: '80%',
  },
})

/**
 * Proptypes
 */

App.propTypes = {
  componentId: PropTypes.string,
}

/**
 * Exports
 */

export default App
