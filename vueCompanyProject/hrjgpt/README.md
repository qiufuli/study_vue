# 怀柔监管平台

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



## 项目目录介绍

* common
  * js
    * axios.js
    * base64.js
    * checkCard.js 身份证验证用的
    * common.js 公用的js处理函数
    * md5.js
    * utils.js 一些转换函数
    * vaild.js 校验
  * scss
* components
  * header
  * tree
* login
* views
  * ajdj ----------案件登记
    * nqdj.vue 内勤登记
  * dbsx ----------代办事项
    * lasq	---------- 立案申请
      * ladj.vue 立案登记
    * xjdj ----------巡检登记
    * ajbl.vue ----------案件办理
    * ajblgc.vue ----------案件办理过程
    * jaxa.vue ----------结案销案查询
    * lasq.vue ----------立案申请查询
    * tsjbsx.vue ----------投诉举报事项
    * xjdjsx ----------巡检登记事项
  * jczlgl ---------- 基础资料管理
    * ajly.vue ----------案由来源
    * ay.vue ----------案由
    * ccsx.vue ----------抽查事项
  * swgl ----------事务管理
    * sxj ---------- 双随机
    * ajfp ---------- 案件分配
    * fagl ---------- 分案管理
    * jaxasp----------结案销案审批
    * lasqsp----------立案申请审批
    * nwqsp----------
    * ssjsp---------- 双随机审批
  * wsgl ----------
    * wsmbgl.vue
  * yhgl----------用户管理
    * fzwh.vue----------分组维护
    * yhwh.vue----------用户维护

## 公共配置

1. common--> js--->common.js 
   1. getdmb 获取代码表
2. 下拉列表需要用 `clearable` 这个属性来代替请选择