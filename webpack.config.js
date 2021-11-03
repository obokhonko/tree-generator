const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const LIB_PREFIX = 'ui-seed';

module.exports = (env, args) => {
	const isProduction = args['mode'] === 'production';
	return {
		entry: {
			app: './src/main.tsx'
		},
		output: {
			filename: 'app.js',
			path: path.resolve(__dirname, 'dist'),
			assetModuleFilename: 'images/[hash][ext][query]'
		},
		target: 'web',
		devtool: isProduction ? false : 'source-map',
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.svg'],
			mainFields: ['module', 'browser', 'main']
		},
		devServer: {
			open: false,
			port: 3030
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					// eslint
					enforce: 'pre',
					use: [
						{
							options: {
								eslintPath: require.resolve('eslint')
							},
							loader: require.resolve('eslint-loader')
						}
					],
					exclude: /node_modules/
				},
				{
					test: /\.(jsx|tsx|js|ts)$/,
					// typescript
					exclude: /node_modules/,
					use: [{
						loader: 'ts-loader',
						options: {
							transpileOnly: !isProduction,
							silent: !isProduction,
							compilerOptions: {
								module: 'es2015',
								sourceMap: !isProduction,
								configFile: path.resolve('./tsconfig.json')
							}
						}
					}]
				},
				{
					test: /\.(png|svg|jpg|gif)$/i,
					type: 'asset/resource'
				},
				{
					test: /\.less$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'less-loader',
							options: {
								lessOptions: {
									strictMath: true,
									modifyVars: {
										'@lib-prefix': LIB_PREFIX
									}
								}
							}
						}
					]
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				PRODUCTION: JSON.stringify(true),
				LIB_PREFIX: JSON.stringify(LIB_PREFIX)
			}),
			new ESLintPlugin({}),
			new HtmlWebpackPlugin({template: './src/static/index.html'}),
			new MiniCssExtractPlugin()
		]
	};
};
