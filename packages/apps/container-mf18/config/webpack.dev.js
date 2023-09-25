// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { getCommonConfig } = require("@mysty-micro/build-tools");
const { merge } = require("webpack-merge");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const commonConfig = getCommonConfig(8000);

const containerModule = {
  port: 8000,
  name: "container",
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  devServer: {
    port: containerModule.port,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:${containerModule.port}/`,
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
    new MFLiveReloadPlugin({
      container: containerModule.name,
      port: containerModule.port,
    }),
    new ModuleFederationPlugin({
      name: containerModule.name,
      remotes: {
        shared: "shared@http://localhost:8001/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8002/remoteEntry.js",
        settings: "settings@http://localhost:8003/remoteEntry.js",
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
