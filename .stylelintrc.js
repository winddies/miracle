const { getStylelintConfig } = require('@iceworks/spec');

module.exports = getStylelintConfig('common', {
  extends: ['stylelint-config-prettier'],
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'block-no-empty': null,
  },
});
