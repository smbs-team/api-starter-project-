module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __appRoot: 'writeable'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
    'no-tabs': 'off',
    'indent': 'off',
    "import/no-unresolved": "off",
    "no-underscore-dangle": [
      "error",
      { "allow": ["__appRoot"] }
    ]
  }
};
