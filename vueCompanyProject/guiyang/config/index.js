// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var chalk = require('chalk')
// 日志替代函数
var debugLog = function () {
	return {
		info: function (con) {
			return console.log(chalk.blue(con));
		},
		debug: function (con) {
			return console.log(chalk.bgCyan.bold(con) + ' ');
		},
		warn: function (con) {
			return console.log(chalk.yellow.bold(con));
		},
		error: function (con) {
			return console.log(chalk.red.bold(con));
		},
		silent: function (con) {
			return console.log(chalk.underline.blue(con));
		}
	};
};

module.exports = {
  build: {
    env: require('./prod.env'),
	// 发布版本prod，主index文件目录
    index: path.resolve(__dirname, '../dist/index.html'),
	// 发布版本prod，静态资源路径
    assetsRoot: path.resolve(__dirname, '../dist'),
	// webpack 资源文件路径
    assetsSubDirectory: 'static',
	// 文件发布的服务器资源前缀
    assetsPublicPath: '/manageSys/',
	// 是否生成源地图
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
	// 开发代理服务配置，使用的是http_proxy_middle
	// https://github.com/chimurai/http-proxy-middleware
    proxyTable: {
		'/gyrcht': {
			target: 'http://localhost:9999',
			changeOrigin: true,
			logLevel: 'debug',
			logProvider: debugLog
			// pathRewrite: 路径重写
		},
		'/common': {
			target: 'http://localhost:9999',
			changeOrigin: true,
			logLevel: 'debug',
			logProvider: debugLog
			// pathRewrite: 路径重写
		},
		'/xmtyzjht': {
			target: 'http://localhost:9999',
			changeOrigin: true,
			logLevel: 'debug',
			logProvider: debugLog
			// pathRewrite: 路径重写
		},
		// 文件上传路径
		'/sysfiles': {
			target: 'http://localhost:9999',
			changeOrigin: true,
			logLevel: 'debug',
			logProvider: debugLog
			// pathRewrite: 路径重写
		},
		'/login/admin/**': { //登录
			target: 'http://localhost:9999',
			changeOrigin: true,
			logLevel: 'debug',
			logProvider: debugLog
			// pathRewrite: 路径重写
		},
		'/tyzx/**': { //登出
			target: 'http://localhost:9999',
			changeOrigin: true,
			logLevel: 'debug',
			logProvider: debugLog
			// pathRewrite: 路径重写
		}
	},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
