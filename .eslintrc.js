module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint-config-airbnb',
  parserOptions: {
      'ecmaFeatures': {
        'jsx': true
      }
  },
  env: {
    browser: true,

    // Allow mocha globals.
    mocha: true
  },
  rules: {
    'arrow-body-style': 'off',

    // We don't want to break the builds because a line is too long.
    'max-len': 'warn',

    // Allow `return` in if/else blocks
    'no-else-return': 'off',

    // Dissallow unused variables but allow unused function arguments.
    'no-unused-vars': ['error', { args: 'none' }],

    // Allow underscore vars on specific dependency APIs.
    'no-underscore-dangle': ['error', {
      allow: ['__Rewire__', '__ResetDependency__']
    }],

    // Do not enforce whitespace rules around code blocks.
    'padded-blocks': 'off',

    //
    // IN REVIEW
    // The rules below this point are not yet decided.
    //

    // Disabling extended comma-dangle rule, which is "always-multiline".
    // That setting enforces trailing commas on multi-line arrays and objects.
    // The rule will affect almost every file in our applications. It can be
    // fixed via codemod if we choose.
    'comma-dangle': 'off',

    // AirBnB implements this rule in order to prevent accidental mutation of
    // objects passed into function.
    'no-param-reassign': 'off',

    // AirBnB disallows the for..in statement.
    // https://github.com/airbnb/javascript#iterators--nope
    // This seems like a good best practice to me but we should discuss futher
    // before enforcing that rule. Here we are overriding that configuration to
    // re-enable it.
    'no-restricted-syntax': [
      'error',
      // 'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],

    // Change from "error" to "warn". We don't want trailing spaces to break
    // the build.
    'no-trailing-spaces': 'warn',

    // Change from "error" to "warn". Whether to enforce the rule at all is
    // still under discussion:
    // https://github.banksimple.com/frontend/eslint-config/issues/1
    'react/prefer-stateless-function': 'warn',

    // AirBnB errors on this, but we just want it warn us:
    'react/require-default-props': 'warn',
  }
};
