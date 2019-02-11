const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
	entry: {
		main:	'./src/index.js'
		// 'js/scripts.js': './src/js/scripts.js',
		// 'css/main': './src/scss/main.scss'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './public')
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
				exclude: '/node_modules/',
				use: {
          loader: "babel-loader"
        }
			},
			{
				test: /\.(css|scss)$/,
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
							name: 'images/[name].[ext]',
							outputPath: 'img/'
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
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		}),
		new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/fonts'),
        to: path.resolve(__dirname, 'public/fonts'),
      },
      {
        from: path.resolve(__dirname, 'src/img'),
        to: path.resolve(__dirname, 'public/img'),
      },
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'public/'),
      },
    ])
	]
}

module.exports = (env, options) => {
	let production = options.mode ==="production";

	config.devtool = production ? false : 'eval-soursemap';

	return config;
}
