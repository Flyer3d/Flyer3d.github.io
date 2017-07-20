module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  "extends": "airbnb-base",
  "rules": {
    "func-names": ["error", "never"],
    "comma-dangle": 0,
    "no-param-reassign": 0,
    "unused-default-export": ["off"],
    "prefer-arrow-callback": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": ["off"],
    "import/extensions": ["off"],
    "no-unused-expressions": [2, { allowShortCircuit: true }]
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  globals: {}
}
