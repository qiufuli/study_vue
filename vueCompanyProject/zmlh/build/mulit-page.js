/**
 * 多页面配置
 *
 */
const glob = require('glob');
const path = require('path');

// 配置起止路径
const conf = {
  beginRoot: 'src',
}

/**
 * @param {String} globPath 'golb格式的路径' `src/pages/**//*.js`
 * @return {Array} pageList 入口列表
 * @return {moduleName} 模块名，驼峰
 * @return {path} 文件路径
 * @return {fileName} 文件名
 */
exports.getEntries = function entry(globPath) {
  const entries = [];
  const pathList = glob.sync(globPath);
  pathList.forEach((entry) => {
    const pathObj = path.parse(entry);
    const moduleName = pathObj.dir.split('/').map((item, index) => {
      if (index === 0) return;
      if (index > 1) {
        return item.replace(/^\w{1}/, str => str.toUpperCase());
      }
      return item;
    }).join('');

    const item = {
      path: `./${entry}`,
      fileName: pathObj.base,
      moduleName
    }
    entries.push(item);
  });
  return entries;
}
