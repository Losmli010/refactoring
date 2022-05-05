module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
