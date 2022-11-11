var path = require('path');

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'class-methods-use-this': 'off',
    'no-shadow': [2, { allow: ['error', 'reject', 'resolve'] }],
    'func-names': 'off',
    'no-await-in-loop': 'off',
    'linebreak-style': 0,
    'import/no-cycle': 'off',
  },
  globals: {
    window: true,
    CONFIG: true,
    sendResponse: true,
    buildResponseData: true,
  },
};
