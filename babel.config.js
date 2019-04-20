module.exports = function (api) {

  api.cache(true);

  const presets = [
    '@babel/preset-flow',
    '@babel/preset-react'
  ];

  const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-root-import',
    '@babel/plugin-transform-modules-commonjs'
  ];

  return {
    presets,
    plugins
  };
}