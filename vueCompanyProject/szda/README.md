# 数字档案管理系统

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 公共配置

1. common--> js--->common.js 
   1. getdmb 获取代码表
2. 下拉列表需要用 `clearable` 这个属性来代替请选择
3. 目录结构
* assets --- 存放项目图片
* common --- 公共的js和样式
* components --- 公共的组件
    tree --- 公共的左侧树
* login  --- 登录页
* views
    dafw ---  档案服务
      kjzm.vue --- 开具证明
    dagl --- 档案管理
      daSearch.vue --- 档案管理查询页面
      personal.vue --- 个人信息页面
    datj --- 档案统计
      datj.vue --- 档案统计页面
    xtwh --- 系统维护
      xtwh.vue --- 系统维护页面
* App.vue  --- 项目的入口文件

##公共样式
base.scss
// input的样式
.base-input {
  width: 180px;
  height: 33px;
  display: inline-block;
}
// 内容间距
.base-content {
  padding: 10px 10px;
}
.base-form-item {
  display: inline-block;
}

reset.scss
// el-row设置间距
.el-row {
  padding-bottom:20px 
}
##公共组件头部title字体图标和文字
例：：：
<div class="base-content_public">
  <div>
    <my-bread level1="iconjichuxinxi" level2="分类参数"></my-bread>
  </div>
  <div>
  ... 内容
  </div>
</div>
******类名要写

level1 字体图标类名

level2 title文字

## 路由配置

1. 按模块划分：档案服务、档案管理、档案统计、系统维护等等
2. 嵌套路由：分析页面属于哪个模块，将路由设置在所属模块下子路由

## package.json文件
{
  "name": "hr",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "echarts": "^4.2.1",
    "element-ui": "^2.8.2",
    "jquery": "^1.9.1",
    "v-viewer": "^1.4.1",
    "vue": "^2.5.21",
    "vue-photo-preview": "^1.1.3",
    "vue-router": "^3.0.6",
    "async-validator": "^1.11.2",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.2.0",
    "@vue/cli-plugin-eslint": "^3.2.0",
    "@vue/cli-service": "^3.2.0",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.6",
    "eslint": "^5.8.0",
    "eslint-plugin-vue": "^5.0.0",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.1",
    "scss": "^0.2.4",
    "vue-loader": "^14.2.4",
    "vue-template-compiler": "^2.5.21",
    "webpack": "^4.33.0"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true,
      "jquery": true
    },
    "extends": [
      "plugin:vue/essential"
    ],
    "rules": {
      "no-console": 0,
      "no-control-regex": 0
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
