const uglifyWebpackPlugin = require('uglifyjs-webpack-plugin'); //压缩js
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');
module.exports= webpackMerge(baseConfig,{
  plugins:[
    new uglifyWebpackPlugin()
  ],
})
// module.exports = {
//   plugins:[
//     new uglifyWebpackPlugin()
//   ],
// }