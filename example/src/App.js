import { Navigation } from 'react-native-navigation'

import { Screens, Root, Pushed, Secondary, Modal } from './screens'
import { TestIDs } from './testIDs'

/**
 * Register Screens
 */

Navigation.registerComponent(Screens.Root, () => Root)
Navigation.registerComponent(Screens.Pushed, () => Pushed)
Navigation.registerComponent(Screens.Secondary, () => Secondary)
Navigation.registerComponent(Screens.Modal, () => Modal)

/**
 * Start app
 */

export const startApp = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          // Root
          {
            stack: {
              children: [
                {
                  component: {
                    name: Screens.Root,
                    options: {
                      topBar: {
                        rightButtons: [
                          {
                            id: 'id',
                            text: 'Button',
                            testID: TestIDs.NAV_BAR_BTN,
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Root',
                  selectedTextColor: 'green',
                },
              },
            },
          },

          // Secondary
          {
            stack: {
              children: [
                {
                  component: {
                    name: Screens.Secondary,
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Secondary',
                  selectedTextColor: 'green',
                  testID: TestIDs.SECONDARY_TAB,
                },
              },
            },
          },
        ],
      },
    },
  })
}
