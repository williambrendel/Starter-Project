"use strict";

// Don't forget to do "npm i" to install all the packages
// npx webpack --config webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require('terser-webpack-plugin');
// const CssUrlRelativePlugin = require('css-url-relative-plugin');
const resolvePath = require("./resolvePath");

/**
 * Utility function to create a webpack config object.
 * 
 * @param {object} options - The input function to be asyncified
 * 
 * @returns {object} the config object.
 */
const getConfig = options => {
  const {
    mode = "production",
    minimize = true,
    path: _path,
    entry,
    isModule = true
  } = options || {};
  const config = {
    mode,
    optimization: {
      minimize,
    },
    entry: resolvePath(entry),
    output: {
      filename: "[name].js",
      path: resolvePath(_path)
    },
    experiments: {},
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      // new CssUrlRelativePlugin(/* options */),
      new MiniCssExtractPlugin({filename: "[name].css"})
    ],
    optimization : {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            // Add Terser options here (optional)
          },
        })
      ],
      minimize: true
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + "/";
                }
              }
            },
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            {
              // Autoprefixer usw.
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                        ident: "postcss"
                      },
                    ],
                  ],
                },
              },
            }
          ]
        },
      ],
    }
  };

  isModule && (
    config.output.library = {
      type: "module"
    },
    config.experiments.outputModule = true
  );

  return config;
}

// Exports.
module.exports = Object.freeze(Object.defineProperty(getConfig, "getConfig", {
  value: getConfig
}));