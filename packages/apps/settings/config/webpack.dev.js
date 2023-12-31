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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: settingsModule.name,
      filename: "remoteEntry.js",
      remotes: {
        shared: "shared@http://localhost:8001/remoteEntry.js",
      },
      exposes: {
        "./App": "./src/bootstrap.tsx",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: false,
        },
        "styled-components": {
          singleton: true,
          eager: true,
          requiredVersion: false,
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
