module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': 'off',
    indent: 'off',
    'react/jsx-indent': 'off',
    'no-console': 'off',
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['off'],
    'no-return-assign': ['off'],
    'react/jsx-no-bind': ['off'],
    "import/no-unresolved": "off"
  },
};
