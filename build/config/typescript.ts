module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
          {
            loader: require.resolve('awesome-typescript-loader'),
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
};
