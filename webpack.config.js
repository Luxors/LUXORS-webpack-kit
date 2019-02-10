const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
	entry: {
		common:	'./src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	devServer: {
		overlay: true,
		port: 9000,
		open: 'Chrome'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
					},				
					{
						loader: 'postcss-loader',
						options: {
							config: { path: './postcss.config.js' }
						}
					},

				]
			},
			{ 
				test: /\.pug$/,
				use: ['pug-loader']
			},
			{
				test: /\.(gif|png|jpe?g|svg|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name][hash].[ext]'
						}
					}, 
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 70
							}
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name][hash].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		}),
	]
}

module.exports = (env, options) => {
	let production = options.mode ==="production";

	config.devtool = production ? false : 'eval-soursemap';

	return config;
}
