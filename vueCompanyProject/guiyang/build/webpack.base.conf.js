var path = require('path')
var utils = require('./utils')
var os = require('os')
var HappyPack = require('happypack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var isProduction = process.env.NODE_ENV === 'production'
// 配置自定义 docs标签用于输出描述性内容
var extractDoc = new ExtractTextPlugin('doc.md');
vueLoaderConfig.docs = extractDoc.extract('raw-loader');
// 使用多进程，加快构建
// var happyThreadPool = HappyPack.ThreadPool({size: 2});

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
// 主架构入口文件
let entries = {app: ['babel-polyfill', './src/main.js']};
// 其他页面入口文件
Object.assign(entries, utils.getEntries('./src/modules/**/*.js'));

// // 对js和vue进行格式校验的预处理
// const preLoader = {
// 	test: /\.(js|vue)$/,
// 	// loader: 'eslint-loader',
// 	loader: 'happypack/loader?id=eslint',
// 	enforce: 'pre',
// 	include: [resolve('src'), resolve('test')],
// 	exclude: /node_modules/
// };
// // 判断是否是开发环境
// if (!isProduction) {
// // if (true) {
// 	preLoader.loader = 'eslint-loader';
// 	preLoader.options = {
// 		formatter: require('eslint-friendly-formatter')
// 	}
// }


// webpack 配置文件
var webpackBaseConfig = {
	// cache: true,
	context: path.resolve(__dirname, '../'),
	// 构建依赖图表的入口文件
	entry: entries,
	// 输出文件
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	// 易用性配置
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'@m1': resolve('src/styles/s1/images'),
			'@theme' : resolve('theme')
		}
	},
	// 配置处理逻辑
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				// loader: 'happypack/loader?id=eslint',
				enforce: 'pre',
				include: [resolve('src'), resolve('test')],
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: ['babel-loader?cacheDirectory=true'],
				include: [resolve('src'), resolve('test')],
				exclude: [resolve('node_modules')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		// new HappyPack({
		// 	id: 'babel',
		// 	loaders: ['babel-loader']
		// }),
		// new HappyPack({
		// 	id: 'eslint',
		// 	cache: false,
		// 	loaders: [{
		// 		loader: 'eslint-loader',
		// 		options: {
		// 			formatter: require('eslint-friendly-formatter')
		// 		}
		// 	}],
		// 	})
		// extractDoc
	]

}

module.exports = webpackBaseConfig;

// console.log(require('./vendor-manifest.json'));
