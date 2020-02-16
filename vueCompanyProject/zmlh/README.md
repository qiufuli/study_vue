# 灵活就业-就业状况报告

>灵活就业-就业状况报告  实现微信公众号记载功能（对应的PC端程序在web-all下的lhjy中）



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 环境要求

* node > 8.9.1 npm > 5.5.1

# 对 vue-cli 的自定义配置

## 1、打包的相对路径设置

```
config/index.js    build -- assetsPublicPath: './'

build/utils.js     ExtractTextPlugin.extract({publicPath: '../../'})
```

## 2、sass 预处理设置

```
npm install -D node-sass

npm install -D sass-loader

```

## 3、postcss autoprefixer 自动补全兼容性处理

```
package.json  browserslist: ["last 3 versions"]
```

## 4、postcss postcss-plugin-px2rem px-自动转换为-rem

```
npm install postcss-plugin-px2rem -D

.postcssrc.js  "postcss-plugin-px2rem": { rootValue: 108, minPixelValue: 2 }
// 在postcsssrc.js文件中添加改插件和配置 rootValue为确定的html的font-size比例，
// 这里的108是这样计算出来的，设计稿的宽度为1080---> 1080/10 108，
// 同样：html元素的根fz为screen.width / 10（flexible见6代码确定好的）

```
## 5、移动meta标签

```
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="yes" name="apple-touch-fullscreen">
<meta content="telephone=no,email=no" name="format-detection">

```
## 6、使用 淘宝flexible 实现移动端响应式布局

> 设备像素  --- 物理像素  --- 显示屏的实际像素，由显示屏的质量决定的，
> css像素  --- 逻辑像素  --- 实际书写样式对应的像素，由IOS或Android不同系统决定的
> dpr 设备像素比，pc端通常为1，即一个逻辑像素对应一个物理像素
> 移动端高分屏使得dpr有所区别，screen.width / reailwidth ,iphone5,6---dpr 2,
> iphone6p dpr3;iphone5逻辑像素为：320px，6 -> 375 ，6p -> 414
> 历史上，移动端为了显示pc端网页（在移动互联网早期）layout-wiewport 被设置为980px(iphone,其他有所差异)
> for为移动端所设计的网页，需要设定layout-viewport 出现了`meta viewport`通过设置 `width=device-width`
> 实现布局容器layout-viewport 为设备逻辑宽度 device-width；因此有了：
> `<meta content="viewport" name="width=device-width,initial-scale=1.0,maximum-scale=1.0">`

* 使用`flexible`、`rem单位`、`flex`实现移动端布局，并解决1px像素的问题
*

## 7、使用 babel-polyfill实现兼容，使用babel-runtime编译开发代码
```
npm install -D babel-runtime
npm install -S babel-polyfill

main.js   import 'babel-polyfill'

```


## 8、使用 fastclick 解决移动端 click事件300ms延迟问题

```
npm install -S fastclick
import fastclick from 'fastclick';
fastclick.attach(document.body);

```


## 8、使用 axios 实现接口调用

* 使用统一的拦截处理异常，详见`common/js/axios.js`

## 9、配置 alias 简化路径的书写
* 在 `build/webpack.base.conf.js ---> resolve.alias` 配置相应的路径别名
* 在js中使用： `import MessageCard from '@/base/messageCard/messageCard';`
* 在css/html中使用时： `~@import '~common/scss/variable.scss';`要加上`~`前缀
* 在配置`node_modules`中的模块时，需要在配置时添加`$`标记（用例详见vue）

### 目录划分

* 基础组件 --- base
* 业务组件 --- components
* 通用模块 --- common / scss + js + fonts + imgs
* 多页面   --- pages / filename
  * 多页面时，pages 应包含子文件夹，子文件夹下应包含：建议使用和文件夹相同的名字
  * pages/login/login.html login.js xxxx.vue
  * **.html（页面模板，必有）
  * **.js （项目入口文件，必有）
* 路由配置 --- router

