import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigationCommandComplete } from 'react-native-navigation-hooks'
import { Navigation } from 'react-native-navigation'

import { TestLabels } from '../testIDs'

/**
 * ModalScreen
 */

const ModalScreen = ({ componentId }) => {
  /**
   * State
   */

  const [text, setText] = useState('')

  /**
   * Handlers
   */

  const handleNavigationCommandComplete = useCallback(() => {
    setText(TestLabels.NAV_COMMAND_COMPLETED)
  }, [])

  const handleDismissPress = useCallback(() => {
    Navigation.dismissModal(componentId)
  }, [componentId])

  /**
   * Listeners
   */

  // Listener called when a command finishes executing in native. If the command contains animations, for example pushed screen animation) the listener is invoked after the animation ends.
  useNavigationCommandComplete(handleNavigationCommandComplete)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button title={TestLabels.DISMISS} onPress={handleDismissPress} />
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
  },
})

/**
 * PropTypes
 */

ModalScreen.propTypes = {
  componentId: PropTypes.string,
}

/**
 * Exports
 */

export default ModalScreen
