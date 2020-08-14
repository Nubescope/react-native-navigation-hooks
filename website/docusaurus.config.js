module.exports = {
  title: 'React Native Navigation Hooks',
  tagline: 'A set of React hooks for React Native Navigation.',
  url: 'https://underscopeio.github.io',
  baseUrl: '/react-native-navigation-hooks/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'underscopeio',
  projectName: 'react-native-navigation-hooks',
  themeConfig: {
    navbar: {
      title: 'React Native Navigation Hooks',
      logo: {
        alt: 'Underscope logo',
        src: 'img/underscope-logo.png',
      },
      items: [
        { to: 'docs/before-you-start', label: 'Docs', position: 'left', activeBasePath: 'docs' },
        {
          href: 'https://github.com/underscopeio/react-native-navigation-hooks',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Installation',
              to: 'docs/installing',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Ask a question on Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-native-navigation-hooks',
            },
            {
              label: 'Submit on issue on GitHub',
              href: 'https://github.com/underscopeio/react-native-navigation-hooks/issues/new/choose',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/underscopeio/react-native-navigation-hooks',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/underscopeio',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          homePageId: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/underscopeio/react-native-navigation-hooks/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
