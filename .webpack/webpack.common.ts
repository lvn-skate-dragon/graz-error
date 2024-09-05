import path from "path"
import { type Configuration, ProvidePlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

const projectRootDir = path.resolve(__dirname, "..")

const configuration: Configuration = {
  entry: path.resolve(projectRootDir, "src/main.tsx"),
  cache: {
    type: "filesystem",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        // This rule is required from webpack v5. https://github.com/webpack/webpack/issues/11467
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        resourceQuery: /\?url/,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        resourceQuery: "", // To enforce not read css with resource query
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
    ],
  },
  node: {
    global: true,
  },
  output: {
    publicPath: "/",
    filename: "main.[contenthash].js",
    chunkFilename: "js/[id].[contenthash].js",
    path: path.resolve(projectRootDir, "output"),
    assetModuleFilename: "assets/[name][ext][query]",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectRootDir, "index.html"),
    }),
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      http: false,
      https: false,
      stream: require.resolve("stream-browserify"),
      url: false,
      zlib: false,
      vm: require.resolve("vm-browserify")
    },
  },
}

export default configuration
