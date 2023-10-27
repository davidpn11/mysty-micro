// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const sharedModule = {
  port: 8001,
  name: "shared",
};

const federationConfig = {
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
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: sharedModule.port,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: `http://localhost:${sharedModule.port}/`,
  },
  plugins: [
    new ModuleFederationPlugin(federationConfig),
    // new FederatedTypesPlugin(federationConfig), still not working
  ],
};

module.exports = merge(commonConfig, devConfig);
