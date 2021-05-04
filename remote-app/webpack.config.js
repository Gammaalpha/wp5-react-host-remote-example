const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
const Dotenv = require("dotenv-webpack");
const depsPackage = (packageName) => ({
  [`${packageName}`]: {
    eager: true,
    singleton: true,
    requiredVersion: deps[`${packageName}`],
  },
});
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
          ...depsPackage("react"),
          ...depsPackage("react-dom"),
          ...depsPackage("styled-components"),
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
