module.exports = {
  extends: 'standard',
  env: {
    node: true,
    es6: true
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-useless-escape': 'off',
    eqeqeq: ['error', 'smart'],
    'no-console': 'error',
    camelcase: ['error'],
    'no-extra-bind': ['error'],
    'no-multi-spaces': ['error'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'arrow-parens': ['error', 'as-needed'],
    'no-var': 'error',
    'comma-spacing': ['error', { before: false, after: true }]
  }
}
