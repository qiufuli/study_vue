var path = require('path')
var config = require('../config')
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCss ;

// 静态资源路径
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
// 合并提取所有.vue里面的文件
exports.cssLoaders = function (options) {
  options = options || {}
	//  css-loader for webpack
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
	}

	var postcssLoader = {
		loader: 'postcss-loader',
		options: {
			sourceMap: true
		}
	}

  // loader生成器函数
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader, postcssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
		// Object.assign，对象浅拷贝，深拷贝可以使用JSON.parse(JSON.stringify({}));
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
		extractCss = ExtractTextPlugin.extract({
			use: loaders,
			fallback: 'vue-style-loader'
		})
      return extractCss;
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 从vue文件中提取出，但对的css文件
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// 获取多个入口文件，入口文件的‘key’即是，最后打包成js的文件名，也是html对应的挂载点
exports.getEntries = function (globPath) {
	var entries = {};
	glob.sync(globPath).forEach(function(entry){
		const pathObj = path.parse(entry);
		const moduleName = pathObj.dir.replace(/\.*\/(\w)/g, function (str, p1, offset) {
			if (offset === 0) {
				return p1;
			}else {
				return p1.toUpperCase();
			}
		});
		entries[moduleName] = entry;
	});
	return entries;
}

// 输出 extractCss 实例
exports.extractCss = extractCss;
