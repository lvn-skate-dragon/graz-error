import { cpus } from "os"
import { merge } from "webpack-merge"
import TerserPlugin from "terser-webpack-plugin"

import common from "./webpack.common"

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: cpus().length - 1,
      }),
    ],
  },
})
