import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigationBottomTabSelect } from 'react-native-navigation-hooks'

import { TestLabels } from '../testIDs'

/**
 * SecondaryScreen
 */

const SecondaryScreen = ({ componentId }) => {
  /**
   * State
   */

  const [text, setText] = useState('RNNHooks example')

  /**
   * Handler
   */

  const handleNavigationBottomTabSelect = useCallback(() => {
    setText(TestLabels.SECONDARY_TAB_SELECTED)
  }, [])

  /**
   * Listeners
   */

  // Listener called when a BottomTab is selected by the user.
  useNavigationBottomTabSelect(handleNavigationBottomTabSelect, componentId)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
    fontSize: 16,
    width: '80%',
  },
})

/**
 * PropTypes
 */

SecondaryScreen.propTypes = {
  componentId: PropTypes.string,
}

/**
 * Exports
 */

export default SecondaryScreen
