const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		bundle: [
			path.resolve(__dirname, 'src/js/index.js'),
			path.resolve(__dirname, 'src/js/firebaseInitilizer.js'),
		],
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name][contenthash].js',
		assetModuleFilename: '[name][ext]',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				}, // babel-loader is used to transpile ES6 to ES5
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html'),
		}),
		new HtmlWebpackPlugin({
			filename: '404.html',
			template: path.resolve(__dirname, 'src/404.html'),
		}),
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		port: 4000,
		open: {
			app: 'Google Chrome',
		}, // open browser
		hot: true, // hot reload
		compress: true, // enable gzip compression
		historyApiFallback: true,
	},
}
