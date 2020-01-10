const path = require('path');

module.exports = {
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    // 任何涉及到url的都会加上publicPath
    publicPath:'dist/'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:8192,
            name:'img/[name]-[hash:8].[ext]'
          },
        }]
      },
      {
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['es2015']
          }
        }
      }
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  }
}