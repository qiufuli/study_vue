/**
 * @name WebpackDllPlugin
 * @description 为了加快构建速度，dll.plugin来管理第三方包
 * @author	jinglf000
 * ###### Mon Jul 17 10:21:50 CST 2017
 *
 */
var path = require('path');
var webpack = require('webpack');
var config = require('../config')
var env = config.build.env
// vendor 使用的第三方包，vue vue-router vuex babel-polyfill element-ui axios
module.exports = {
	entry: {
		vendor : ['babel-polyfill', 'axios', 'vue/dist/vue.esm.js', 'vue-router', 'vuex', 'element-ui']
	},
	output: {
		path: path.join(__dirname, '../static/js'),
		filename: '[name].dll.js',
		library:'[name]_library'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '.', '[name]-manifest.json'),
			name: '[name]_library',
			context: __dirname
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': env
		})
	]
}

