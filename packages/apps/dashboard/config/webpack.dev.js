// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const dashboardModule = {
  port: 8002,
  name: "dashboard",
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  devServer: {
    port: dashboardModule.port,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: `http://localhost:${dashboardModule.port}/`,
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new MFLiveReloadPlugin({
      container: dashboardModule.name,
      port: dashboardModule.port,
    }),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: dashboardModule.name,
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
