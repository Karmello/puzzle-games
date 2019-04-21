module.exports = function (api) {

  api.cache(true);

  const presets = [
    'react-app'
  ];

  const plugins = [
    [
      'babel-plugin-root-import'
    ]
  ];

  return {
    presets,
    plugins
  };
};