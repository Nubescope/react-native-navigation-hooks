module.exports = {
  docs: {
    'Getting Started': ['before-you-start', 'installing', 'migration-guide'],
    'API Reference': [
      'helpers',
      'hocs',
      'contexts',
      'suggestions',
      {
        type: 'category',
        label: 'Hooks',
        items: [
          'use-navigation',
          'use-navigation-bottom-tab-select',
          'use-navigation-bottom-tab-press',
          'use-navigation-bottom-tab-long-press',
          'use-navigation-button-press',
          'use-navigation-component-did-appear',
          'use-navigation-component-did-disappear',
          'use-navigation-command',
          'use-navigation-command-complete',
          'use-navigation-modal-attempted-to-dismiss',
          'use-navigation-modal-dismiss',
          'use-navigation-screen-pop',
          'use-navigation-search-bar-update',
          'use-navigation-search-bar-cancel-press',
        ],
      },
    ],
  },
}
