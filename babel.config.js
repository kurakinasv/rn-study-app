process.env.EXPO_ROUTER_APP_ROOT = '../../src/app';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      ['module:react-native-dotenv'],
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            app: './src/app',
            assets: './src/assets',
            components: './src/components',
            config: './src/config',
            hooks: './src/hooks',
            screens: './src/screens/*',
            stores: './src/stores/*',
            styles: './src/styles/*',
            utils: './src/utils/*',
          },
        },
      ],
    ],
  };
};
