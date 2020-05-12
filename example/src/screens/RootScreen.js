import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Button, Alert } from 'react-native'
import {
  useNavigationComponentDidAppear,
  useNavigationComponentDidDisappear,
  useNavigationCommand,
  useNavigationModalAttemptedToDismiss,
  useNavigationModalDismiss,
  useNavigationBottomTabPress,
  useNavigationBottomTabLongPress,
  useNavigationButtonPress,
  useNavigationSearchBarUpdate,
  useNavigationSearchBarCancelPress,
  useNavigationPreviewComplete,
} from 'react-native-navigation-hooks'
import { Navigation } from 'react-native-navigation'

import { Screens } from '.'
import { TestLabels, TestIDs } from '../testIDs'

/**
 * Home
 */

const Home = ({ componentId }) => {
  /**
   * State
   */

  const [text, setText] = useState('RNNHooks example')

  /**
   * Handlers
   */

  const handleComponentDidAppear = useCallback(() => {
    setText(TestLabels.DID_APPEAR)
  }, [])

  const handleComponentDidDisappear = useCallback(() => {
    Alert.alert(TestLabels.DID_DISAPPEAR)
  }, [])

  const handleNavigationCommand = useCallback(() => {
    setText(TestLabels.NAV_COMMAND)
  }, [])

  const handleNavigationModalAttemptedToDismiss = useCallback(e => {
    console.warn(`Modal attempted dismissed on componentId:${e.componentId}`)
  }, [])

  const handleNavigationModalDismiss = useCallback(() => {
    Alert.alert(TestLabels.MODAL_DISMISSED)
  }, [])

  const handleNavigationBottomTabPress = useCallback(() => {
    Alert.alert(TestLabels.BOTTOM_TAB_PRESSED)
  }, [])

  const handleNavigationButtonPress = useCallback(() => {
    Alert.alert(TestLabels.NAV_BAR_BUTTON_PRESSED)
  }, [])

  const handleNavigationBottomTabLongPress = useCallback(() => {
    Alert.alert(TestLabels.BOTTOM_TAB_LONG_PRESSED)
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

  const handlePushButtonPress = useCallback(
    () =>
      Navigation.push(componentId, {
        component: {
          name: Screens.Pushed,
        },
      }),
    [componentId]
  )

  const handleOpenModalButtonPress = useCallback(
    () =>
      Navigation.showModal({
        component: {
          name: Screens.Modal,
        },
      }),
    []
  )

  /**
   * Listeners
   */

  // Listener called each time this component appears on screen (attached to the view hierarchy)
  useNavigationComponentDidAppear(handleComponentDidAppear, componentId)

  // Listener called each time this component disappears from screen (detached from the view heirarchy)
  useNavigationComponentDidDisappear(handleComponentDidDisappear, componentId)

  // Listener called whenever a Navigation command (i.e push, pop, showModal etc) is invoked.
  useNavigationCommand(handleNavigationCommand)

  // Global listener called only on iOS pageSheet modal when swipeToDismiss flag is set to true and modal swiped down to dismiss. (iOS 13+ only)
  useNavigationModalAttemptedToDismiss(handleNavigationModalAttemptedToDismiss)

  // Global listener called when modal dismissed.
  useNavigationModalDismiss(handleNavigationModalDismiss)

  // Listener called when a BottomTab is pressed by the user.
  useNavigationBottomTabPress(handleNavigationBottomTabPress, componentId)

  // Listener called when a BottomTab is long pressed by the user.
  useNavigationBottomTabLongPress(handleNavigationBottomTabLongPress, componentId)

  // Current screen listener called whenever a TopBar button is pressed by the user.
  useNavigationButtonPress(handleNavigationButtonPress, componentId)

  // Global listener called when a SearchBar from NavigationBar gets updated (iOS 11+ only)
  useNavigationSearchBarUpdate(handleNavigationSearchBarUpdate)

  // Global listener called when the cancel button on the SearchBar from NavigationBar gets pressed (iOS 11+ only)
  useNavigationSearchBarCancelPress(handleNavigationSearchBarCancelPress)

  // Global listener called when preview peek is completed (iOS 11.4+ only)
  useNavigationPreviewComplete(handleNavigationPreviewComplete)

  return (
    <View style={styles.container} testID="welcome">
      <Text style={styles.text}>{text}</Text>
      <Button title="Push" onPress={handlePushButtonPress} testID={TestIDs.PUSH_BTN} />
      <Button title="Open Modal" onPress={handleOpenModalButtonPress} testID={TestIDs.MODAL_BTN} />
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
    fontSize: 20,
    width: '80%',
    marginBottom: 20,
  },
})

/**
 * Proptypes
 */

Home.propTypes = {
  componentId: PropTypes.string,
}

/**
 * Exports
 */

export default Home
