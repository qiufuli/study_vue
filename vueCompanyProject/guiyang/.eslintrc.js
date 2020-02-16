// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
	// 使用 tab键缩进
	"indent": [2, 'tab'],
	// 强制使用分号
	"semi": [2, "always"],
	"semi-spacing": [2, {            // 它强制分号之后有空格，禁止分号之前有空格。 http://eslint.cn/docs/rules/semi-spacing
		"before": false,
		"after": true
	}],
	// 换行符使用 window \n\r换行
	"linebreak-style": [2, "windows"],
	// 可以使用 tab键
	"no-tabs": [0],
	// 禁用拖尾逗号 {bar : 'baz',qux : 'qex',}
	"comma-dangle": [2, "never"],
	// 可以使用 ++
	"no-plusplus": [0],
	// 函数参数可以直接赋值
	"no-param-reassign": [0],
	// 函数可以不返回值
	"consistent-return": [0],
	"object-shorthand": [0]
  }
}
