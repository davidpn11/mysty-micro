// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

const sharedModule = {
  port: 8001,
  name: "shared",
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: sharedModule.port,
  },
  output: {
    publicPath: `http://localhost:${sharedModule.port}/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: sharedModule.name,
      filename: "remoteEntry.js",
      exposes: {
        "./Components": "./src/components",
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
