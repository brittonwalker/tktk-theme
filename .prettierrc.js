module.exports = {
  ...require('@wordpress/prettier-config'),
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: true,
      },
    },
  ],
};
