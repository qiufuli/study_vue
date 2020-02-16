/**
 * 版本检测
 * 对node 和 npm版本进行检测，要求版本大于package.json里声明的engines内容
 */


// 彩色输出
var chalk = require('chalk')
// 语义化版本控制，有一些常用的api用于比较版本
var semver = require('semver')
// package 配置
var packageConfig = require('../package.json')
// node shell脚本API，用于执行一系列的判断
var shell = require('shelljs')
// 同步执行子进程的任务，并格式化后的的结果
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
	// 对外输出了一个函数，执行函数检测版本。版本不符合，退出进程
	// warnings 存放了
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
