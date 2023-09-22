// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const settingsModule = {
  port: 8003,
  name: "settings",
};

const devConfig = {
  entry: "./src/main.tsx",
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  devServer: {
    port: settingsModule.port,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:${settingsModule.port}/`,
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
