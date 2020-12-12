const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_debugger: true,
            keep_classnames: false,
            keep_fnames: false,
            module: false
          },
          keep_classnames: false,
          keep_fnames: false,
          module: false
        }
      })
    ]
  }
}
