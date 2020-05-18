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
import { ScreenProps } from '../interfaces'

/**
 * Home
 */

const Home = ({ componentId }: ScreenProps) => {
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

  useNavigationComponentDidAppear(handleComponentDidAppear, componentId)

  useNavigationComponentDidDisappear(handleComponentDidDisappear, componentId)

  useNavigationCommand(handleNavigationCommand)

  useNavigationModalAttemptedToDismiss(handleNavigationModalAttemptedToDismiss)

  useNavigationModalDismiss(handleNavigationModalDismiss)

  useNavigationBottomTabPress(handleNavigationBottomTabPress)

  useNavigationBottomTabLongPress(handleNavigationBottomTabLongPress)

  useNavigationButtonPress(handleNavigationButtonPress, componentId)

  useNavigationSearchBarUpdate(handleNavigationSearchBarUpdate)

  useNavigationSearchBarCancelPress(handleNavigationSearchBarCancelPress)

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
