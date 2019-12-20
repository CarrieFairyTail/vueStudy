module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'prefer-promise-reject-errors': 'off',
    'eqeqeq': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
