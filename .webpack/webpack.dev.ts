import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

import { mergeWithRules } from "webpack-merge"
import "webpack-dev-server"

import common from "./webpack.common"

export default mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "replace"
    }
  }
})(common, {
  mode: "development",
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
})
