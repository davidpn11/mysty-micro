const {
  default: createStyledComponentsTransformer,
} = require("typescript-plugin-styled-components");
const webpack = require("webpack");
const path = require("path");

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  watchOptions: {
    ignored: [
      "../",
      "**/node_modules",
      "**/*.test.tsx",
      "**/__mocks__/**",
      "**/__tests__/**",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|pdf)$/,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
        include: path.resolve(process.cwd(), "src"),
        exclude: [/node_modules/, path.resolve(process.cwd(), "../**")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
  ],
};
