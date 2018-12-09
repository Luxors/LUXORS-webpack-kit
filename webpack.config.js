let path = require('path');

let config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: 'dist/'
	},
	devServer: {
		overlay: true,
		open: 'chrome'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
}

module.exports = (env, options) => {
	let production = options.mode ==="production";

	config.devtool = production ? false : 'eval-soursemap';

	return config;
}
