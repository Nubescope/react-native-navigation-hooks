import { Navigation } from 'react-native-navigation'
import App from './App'

/**
 * Register Components
 */

Navigation.registerComponent('com.RNNHooksSample.MainScreen', () => App)

/**
 * Register AppLaunched
 */

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.RNNHooksSample.MainScreen',
            },
          },
        ],
      },
    },
  })
})
