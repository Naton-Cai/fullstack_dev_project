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
  ignorePatterns: ['node_modules/', 'coverage/'],

  overrides: [
  {
    files: ['public/javascripts/**/*.js'],
    env: {
      browser: true,
    },
  },
],
};
