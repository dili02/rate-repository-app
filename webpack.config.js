// eslint-disable-next-line no-undef
const path = require("path");
// eslint-disable-next-line no-undef
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

// eslint-disable-next-line no-undef
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push({
    test: /\.js$/,
    loader: "babel-loader",
    // eslint-disable-next-line no-undef
    include: [path.join(__dirname, "node_modules/react-router-native")],
  });

  return config;
};

