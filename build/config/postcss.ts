module.exports = {
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'pcss_postcss',
              plugins: () => [require('postcss-preset-env')({stage: 0})],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.pcss'],
  },
};
