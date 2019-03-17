'use strict';

const path = require('path');

const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = (process.env.NODE_ENV !== 'production');

module.exports = {
	// Tells Webpack which built-in optimizations to use
	// In 'production' mode, Webpack will minify and uglify our JS code
	// If you leave this out, Webpack will default to 'production'
	mode: (devMode ? 'development' : 'production'),
	// Webpack needs to know where to start the bundling process,
	// so we define the main JS and Sass files, both under
	// the './src' directory
	entry: {
		main: [
			'./src/styles/main_page/style.scss',
			'./src/scripts/main.js',
		],
	},
	// This is where we define the path where Webpack will place
	// the bundled JS file
	output: {
		path: path.resolve(__dirname, 'public'),

		// Specify the base path for all the assets within your
		// application. This is relative to the output path, so in
		// our case it will be ./public/assets
		publicPath: '/assets',

		// The name of the output bundle. Path is also relative
		// to the output path
		filename: (devMode ? 'assets/js/[name].js' : 'assets/js/[name].min.js'),
		libraryTarget: 'var',
		library: 'EntryPoint'
	},
	watch: devMode,
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: (devMode  ? "source-map" : "nosources-source-map"), // source-map, eval, cheap-inline-module-source-map
	plugins: [
		new webpack.DefinePlugin({
			devMode: JSON.stringify(devMode)
		}),
		new webpack.ProvidePlugin({
			'$': "jquery",
			'jQuery': "jquery",
			'Cookies': "js-cookie"
		}),
		// Configuration options for MiniCssExtractPlugin. Here I'm only
		// indicating what the CSS outputted file name should be and
		// the location
		new MiniCssExtractPlugin({
			filename: (devMode ? 'assets/css/[name].css' : 'assets/css/[name].min.css'),
			chunkFilename: (devMode ? 'assets/css/[id].css' : 'assets/css/[id].min.css')
		}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		// Array of rules that tells Webpack how the modules (output)
		// will be created
		rules: [
			{
				// Look for JavaScript files and apply the babel-loader
				// excluding the './node_modules' directory. It uses the
				// configuration in `.babelrc`
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				// Look for Sass files and process them according to the
				// rules specified in the different loaders
				test: /\.(sa|sc|c)ss$/,

				// Use the following loaders from right-to-left, so it will
				// use sass-loader first and ending with MiniCssExtractPlugin
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					},
				]
			},
			{
				// Adds support to load images in your CSS rules. It looks for
				// .png, .jpg, .jpeg and .gif
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							// The image will be named with the original name and
							// extension
							name: '[name].[ext]',

							// Indicates where the images are stored and will use
							// this path when generating the CSS files.
							// Example, in main.scss I have
							// url('../../public/assets/images/venice-italy.jpg')
							// and when generating the CSS file, it will be outputted
							// as url(../images/venice-italy.jpg), which is relative
							// to /styles/main.css
							publicPath: '../images',

							// When this option is 'true', the loader will emit the
							// image to output.path
							emitFile: false
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							publicPath: '../fonts',
							emitFile: false
						}
					}
				],
			}
		]
	}
};