const { resolve } = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    devServer: {
      clientLogLevel: 'info',
      overlay: true,
      progress: true,
    },
  },
};
