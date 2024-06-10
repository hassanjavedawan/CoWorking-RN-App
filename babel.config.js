module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            utils: './utils',
            screens: './screens',
            navigation: './navigation',
            hooks: './hooks',
            configs: './configs',
            components: './components',
            assets: './assets',
            constants: './constants',
            styles: './styles',
          },
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
