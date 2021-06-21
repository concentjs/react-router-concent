module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    'constructor-super': 0,
    camelcase: 0,
    'no-unused-vars': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
  }
}
