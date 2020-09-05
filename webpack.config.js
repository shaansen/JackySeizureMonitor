const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.jsx",
  output: {
    path: "/",
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["react", "es2015"],
        },
      },
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        test: /\.less$/,
        loader: "less-loader", // compiles Less to CSS
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
    }),
  ],
};
