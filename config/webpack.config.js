const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: [path.resolve(__dirname, "./webpack-communication.js")],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  target: "web",
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  output: {
    filename: "[name]-bundle-script.js",
    path: path.resolve(__dirname, "../public/"),
    publicPath: "/",
    hotUpdateChunkFilename: "[name]-hot-update.js",
    hotUpdateMainFilename: "[name]-hot-update.json",
  },
  devServer: {
    publicPath: "/",
    contentBase: path.resolve(__dirname, "../public"),
    hot: true,
    overlay: true,
    noInfo: true,
    stats: {
      colors: true,
    },
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
    historyApiFallback: {
      index: "/",
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "react-hot-loader/webpack" },
          {
            loader: "babel-loader"
          },
        ],
      },

      {
        test: /\.styl$/,
        use: [
          { loader: "css-hot-loader" },
          { loader: MiniCSSExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    overideBrowserslist: ["> 1%", "last 2 versions"],
                  }),
                ],
              },

            },
          },
          { loader: "stylus-loader" },
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name]-bundled-style.css",
      chunkFilename: "[id].css",
    }),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../frontend/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};