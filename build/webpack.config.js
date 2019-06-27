const merge = require('webpack-merge');
const postcss = require('./config/postcss.ts');
const typescript = require('./config/typescript.ts');

const createWebpackConfig = () => {
  const merged = merge.smart(typescript, postcss, {
    resolve: {
      extensions: ['.ts', '.js'],
    }
  });

  return merged;
};

module.exports = createWebpackConfig;
