module.exports = function (app) {
  const webpack = require("webpack");
  const webpackConfig = require("../../config/webpack.config.js");
  const webpackCompiler = webpack(webpackConfig);

  //for hot reloading
  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));

  const webpackDevMiddleware = require("webpack-dev-middleware");
  app.use(webpackDevMiddleware(webpackCompiler, webpackConfig.devServer));
};

