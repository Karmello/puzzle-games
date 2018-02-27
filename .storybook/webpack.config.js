const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


module.exports = (baseConfig, env) => {
  
  const config = genDefaultConfig(baseConfig, env);
  
  config.resolve.modules.push(path.resolve('./src'));

  config.module.rules.push({
    test: /\.scss/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader', options: { sourceMap: true } },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [path.join(__dirname, './../src')]
        }
      }
    ]
  });
  
  return config;
};