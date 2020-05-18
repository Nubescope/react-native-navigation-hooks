import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useNavigationScreenPop } from 'react-native-navigation-hooks'

import { TestLabels } from '../testIDs'
import { ScreenProps } from '../interfaces'

/**
 * PushedScreen
 */

const PushedScreen = ({ componentId }: ScreenProps) => {
  const handleNavigationScreenPop = useCallback(() => {
    Alert.alert(TestLabels.POPPED)
  }, [])

  // Listener called when screen is popped.
  useNavigationScreenPop(handleNavigationScreenPop, componentId)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PushedScreen</Text>
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

PushedScreen.propTypes = {
  componentId: PropTypes.string,
}

/**
 * Exports
 */

export default PushedScreen
