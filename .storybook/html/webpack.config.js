const merge = require('webpack-merge');
const postcss = require('../../build/config/postcss.ts');
const typescript = require('../../build/config/typescript.ts');

const rules = [
  {
    test: /\.stories\.ts?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {parser: 'typescript'},
      },
    ],
    enforce: 'pre',
  },
  {
    test: /\.pcss$/,
    loaders: [
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: false,
        },
      },
    ],
  },
];

const createWebpackConfig = ({config}) => {
  const merged = merge.smart(config, typescript, postcss, {
    module: {
      rules,
    },
  });

  return merged;
};

module.exports = createWebpackConfig;
