module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  rules: {
    'linebreak-style': 'off',
  },
  ignorePatterns: ['node_modules/', 'coverage/'],
};
