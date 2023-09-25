const {
  default: createStyledComponentsTransformer,
} = require("typescript-plugin-styled-components");
const path = require("path");

const styledComponentsTransformer = createStyledComponentsTransformer();

function getCommonConfig(port) {
  return {
    output: {
      publicPath: "http://localhost:" + port + "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: port,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
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
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
  };
}

module.exports = { getCommonConfig };
