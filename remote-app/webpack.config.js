const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
const sharedDeps = [
  "react",
  "react-dom",
  "styled-components",
  "react-redux",
  "@reduxjs/toolkit",
  "typescript",
  "prop-types",
]; // add more packages to this array to share across remotes  and shell
const Dotenv = require("dotenv-webpack");

/**
 * Creates a singleton object with dependencies with their required version
 * @returns object of objects
 */
const setSingletonSharedDeps = () => {
  console.log("Setting singleton shared deps...");
  return sharedDeps.reduce(
    (acc, curr) =>
      Object.assign(acc, {
        [curr]: {
          eager: true,
          singleton: true,
          requiredVersion: deps[curr],
        },
      }),
    {}
  );
};

module.exports = (env) => {
  console.log("Target: ", env.target);

  return {
    mode: "development",
    target: "web",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
    },
    devServer: {
      port: 3001,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "./public"),
      watchContentBase: true,
      hot: true,
      open: true,
      compress: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // tsx
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        //scss to css
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" },
          ],
          include: /\.module\.scss$/,
        },
        // css
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: "10000",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "test_remote",
        filename: "test_remoteEntry.js",
        remotes: {},
        exposes: {
          "./CustomButton": "./src/components/CustomButton/CustomButton",
          "./customMessage": "./src/functions/customMessage",
        },
        shared: {
          ...deps,
          ...setSingletonSharedDeps(),
        },
      }),
      new HtmlWebpackPlugin({
        inject: "body",
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
        favicon: "./public/favicon.ico",
      }),
      new Dotenv({
        path: path.resolve(
          __dirname,
          `.env${env.target !== undefined ? `.${env.target}` : ""}`
        ),
        allowEmptyValues: true,
      }),
    ],
  };
};
