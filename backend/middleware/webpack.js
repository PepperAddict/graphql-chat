module.exports = function (app) {
  const webpack = require("webpack");
    const webpackConfig = require("../../config/webpack.config.js");

  //for hot reloading
  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));

  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, webpackConfig.devServer));

};
