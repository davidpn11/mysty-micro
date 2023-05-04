// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:3000/`,
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
