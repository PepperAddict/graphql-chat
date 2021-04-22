const express = require("express");
const app = express();
const path = require("path");

//webpack server for live reloading
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../webpack.config.js");
const webpackCompiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(webpackCompiler, webpackConfig.devServer));
app.use(webpackHotMiddleware(webpackCompiler));

app.get("/", (req, res) => {
  res.write(
    webpackDevMiddleware.fileSystem.readFileSync(
      path.join(__dirname, "../dist/", "index.html")
    )
  );
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Express server listening on port ${port}`));
