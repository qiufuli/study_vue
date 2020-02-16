'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const mulitPage = require('./mulit-page')
const path = require('path');

const entries = mulitPage.getEntries('src/pages/**/*.html');
const appExcludeChunks = entries.map((item) => item.moduleName);

const customerConfig = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST ||  config.dev.host,
    port: process.env.PORT ||  config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      excludeChunks: appExcludeChunks
      // chunks: ['app']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'login.html',
    //   template: './src/pages/login/login.html',
    //   inject: true,
    //   excludeChunks: ['app']
    // })
  ]
};

// // 添加多个入口的html文件（多个new HtmlWebpackPlugin）

const htmlPlugins = [];
for (let i = 0; i < entries.length; i += 1) {
  const cur = entries[i];
  const otherExcludeChunks = appExcludeChunks.map((item) => item === cur.moduleName ? 'app' : item);
  const conf = {
    filename: cur.fileName,
    template: cur.path,
    inject: true,
    excludeChunks: otherExcludeChunks
  }
  htmlPlugins.push(new HtmlWebpackPlugin(conf));
  customerConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
// customerConfig.plugins.concat(htmlPlugins);

// 合并配置
const devWebpackConfig = merge(baseWebpackConfig, customerConfig);

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
