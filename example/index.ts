import { Navigation } from 'react-native-navigation'
import { startApp } from './src/App'

/**
 * Register AppLaunched
 */

Navigation.events().registerAppLaunchedListener(() => startApp())
