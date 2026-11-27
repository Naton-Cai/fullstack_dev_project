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

  // Enable browser globals for frontend JavaScript files.
  overrides: [
    {
      files: ['public/javascripts/**/*.js'],
      env: {
        browser: true,
      },
    },
  ],
};