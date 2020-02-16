var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks，添加热更新代码
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 配置plugins 配置插件
var plugins = [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
	  inject: true,
	  chunks: ['app']
    }),
    new FriendlyErrorsPlugin()
];
// HtmlWebpackPlugin 需要为每一个单页添加一个 HtmlWebpackPlugin
var entries = utils.getEntries('./src/modules/**/*.html');
var htmlPlugins = [];
for (let page in entries){
	// 配置html文件
	const val = entries[page];
	const conf = {
		filename: path.basename(val),
		template: val,
		inject: true,
		chunks: [page],
		excludeChunks: ['app']
	}
	htmlPlugins.push(new HtmlWebpackPlugin(conf));
}
plugins = plugins.concat(htmlPlugins);


module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})
