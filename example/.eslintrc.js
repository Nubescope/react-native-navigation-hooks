module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    jest: true,
    jasmine: true,
    'detox/detox': true,
  },
  plugins: ['react', 'react-hooks', 'prettier', 'detox'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
}
