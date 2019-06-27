const merge = require('webpack-merge');
const postcss = require('../../build/config/postcss.ts');
const typescript = require('../../build/config/typescript.ts');

const rules = [
  {
    test: /\.stories\.tsx?$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {parser: 'typescript'},
      },
    ],
    enforce: 'pre',
  },
];

const createWebpackConfig = ({config}) => {
  const merged = merge.smart(config, typescript, {
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    module: {
      rules,
    },
  }, postcss);

  return merged;
};

module.exports = createWebpackConfig;
