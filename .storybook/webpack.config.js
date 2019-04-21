const path = require('path');

module.exports = async ({ config, mode }) => {

  config.resolve.alias['~'] = path.resolve('./');
  config.resolve.modules.push(path.resolve('./src'));

  return config;
};