const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: baseWebpackConfig.externals.paths.dist,
		port: 8081,
		overlay: {
      warnings: true,
      errors: true
    },
		open: 'Chrome'
	},
  plugins: [
		new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
	]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})