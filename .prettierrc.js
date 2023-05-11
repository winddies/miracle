const { getPrettierConfig } = require('@iceworks/spec');

module.exports = getPrettierConfig('common', {
  printWidth: 120,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
});
