const merge = require('webpack-merge');
const postcss = require('./config/postcss.js');
const typescript = require('./config/typescript.js');

const createWebpackConfig = () => {
  const merged = merge.smart(typescript, postcss, {
    resolve: {
      extensions: ['.ts', '.js'],
    }
  });

  return merged;
};

module.exports = createWebpackConfig;
