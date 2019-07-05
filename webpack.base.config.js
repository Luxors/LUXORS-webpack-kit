const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './public'),
  // assets: 'assets/'
}

module.exports = {

	externals: {
    paths: PATHS
	},
	
	entry: {
		app:	PATHS.src
	},
	output: {
		filename: `js/[name].js`,
		path: PATHS.dist,
		publicPath: '/'
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
							outputPath: 'images/'
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
      filename: `css/[name].css`,
      chunkFilename: "[id].css"
    }),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.pug`,
			// filename: './index.pug'
		}),
		new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/fonts`,
        to: `${PATHS.dist}/fonts`
      },
      {
        from: `${PATHS.src}/images`,
        to: `${PATHS.dist}/images`
      },
      {
        from: `${PATHS.src}/static`,
        to: '',
      },
    ])
	]
}

// module.exports = (env, options) => {
// 	let production = options.mode ==="production";

// 	config.devtool = production ? false : 'eval-soursemap';

// 	return config;
// }

// module.exports = () => {
// 	return config;
// }
