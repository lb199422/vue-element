const { resolve } = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    devtool: "source-map",
  },
};
