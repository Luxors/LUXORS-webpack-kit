const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		common:	'./src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: 'dist/'
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
				test: /\.pug$/,
				use: ['pug-loader']
			},
		]
	},
	plugins: [
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
