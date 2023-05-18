// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: containerModule.name,
      library: { type: "system" },
      remotes: {
        shared: "shared@http://localhost:8001/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8002/remoteEntry.js",
        // remoteVite: "http://localhost:5001/assets/remoteEntry.js",
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
