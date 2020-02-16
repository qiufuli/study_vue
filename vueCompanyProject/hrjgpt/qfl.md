# 日志

## 20190123

1. 内勤登记 保存 提交 接口 调通

2. 跳转到内勤登记带参数回显 接口 调通

3. 修改`axios.js`  添加message提示 returncode异常情况 之前是console

4. 修改App.vue样式

   ```css
   .forms{
     margin: 0;
     padding: 30px 0 30px 20px; // padding: 30px 0 0 20px;
     background-color: #ffffff;
     min-height: 620px;
   }
   
   ```

   5. 添加common.js后期需要的公共js文件

>遇到问题

1.日期`el-date-picker` 当传入`value-format="yyy-mm-dd"` 时候校验需要改变 `type='string' (原先是type='date')`	

```json
lstjsj: [
          {
            type: "string", // type:"date" 校验会报错
            required: false,
            message: "请选择历史投诉(举报)时间",
            trigger: "change"
          }
        ],
```



## 20190124

1. 待办事项中投诉举报事项 查看，完善， 删除接口 调通
2. common.js 添加deepClone函数（深拷贝）处理对象赋值的关联问题
3. 校验添加案件号正则
4. 全局请求加上loading显示`axios.js`文件中



>遇到问题

1. el-table中 用template处自定义模板

   ```html
   // 这时候scope.row代表的就是表格一行的数据，想要输出stuNamee,就写{{scope.row.stuName}}
   //scope.$index 代表的索引
   <template slot-scope="scope">
            <span>{{ scope.row.ajzt | zd(spzt_dmb) }}</span>
     </template>
   
   如果我要循环输出guardianName的数组，那就要循环输出的那一列中建立组建template，
   设置slot-scope=“scope”，""里面是名字  scope12345都可以
   <template slot-scope="scope">
       <el-button-group v-for="(item,index in scope.row.xxxx)" :key="index">
           <el-button>{{item.ggg}}</el-button>    
       </el-button-groupel-button-group>
     </template>
   ```

   2. 分页处理问题 代码：

      ```javascript
      <el-pagination
                @current-change="handleCurrentChange" // 当前页改变事件
                :current-page="pagenum" // 当前页
                layout=" prev, pager, next, total" //分页所需要的配置
                :total="total" // 总页数
                :page-size='pageSize' // pageSize
                prev-text="上一页"
                next-text="下一页"
                v-if="this.total !== 0" // 无数据的时候不显示
              ></el-pagination>
      
      // 查询分页
      查询需要带查询参数 情况1 ：
      当你初始化查询后，然后填上参数，这时候不进行查询，直接点击分页第二页第三页等，这时候分页查询带的参数是已经填上的参数去查询，与预期效果不符合（预期是只要不点查询 及时已经添加好参数 还是要按照上一次的查询进行分页跳转）
      问题解决方案一：
      声明一个对象 与 正常查询的对象一致（初始化参数都为空）
       // form表单字段
            xcdjForm: {
              ajh: "",
              dwmc: "",
              ajzt: "",
              jyhbgdz: "",
              tsjbsj: "",
              djr: "",
              tsrlxdh: ""
            },
            // form表单存值字段
            xcdjForm_page: {
              ajh: "",
              dwmc: "",
              ajzt: "",
              jyhbgdz: "",
              tsjbsj: "",
              djr: "",
              tsrlxdh: ""
            }
      当进行查询事件的时候，传的是xcdjForm_page对象，仅当点击查询的时候 将
      xcdjForm的值赋值给xcdjForm_page 这样点击分页的时候就可以避免上边提到的问题
      if(flag == 1){ // 点击查询的标识
          //deepclone深拷贝 已在common.js中封装
              this.xcdjForm_page = deepClone(this.xcdjForm);
       }
      其实感觉这个方案不怎么好，最好是不通过声明新对象来存值 直接改下分页方法，这个可以后期研究下element-ui的分页 然后封装一个够咱们自己需求用的，先记下
      ```

## 20190128

1. 案件办理 首页 和过程 页面接口 还差一部分 分页 
2. 对数组对象的处理 在commonjs中Group方法

> 遇到问题

1. 接口调试的比较慢,要加快点

## 20190130

1. 案件办理再办案 请求后带参跳转
2. 结案查询页面正在完善

> 遇到问题

暂无

## 20190131

1. 结案销案查询 ，结案销案审批接口调试完成



## 后台走之前完成进度-- 邱福利

1. 内勤人员权限
   1. 内勤登记，信息回显，信息完善 提交-------------接口调试完毕（联调人员:巩云龙）
   2. 待办事项--->投诉举报事项 -------------接口调试完毕（联调人员:巩云龙）
2. 外勤人员权限
   1. 待办事项---> 案件办理 -------------接口调试完毕（联调人员:巩云龙）
       1.案件办理页面查询 -------------接口调试完毕（联调人员:巩云龙）
       2.案件办理页面再立案 -------------接口调试完毕（联调人员:巩云龙）
       3.案件办理--办理过程  查询 执行 和延期  -------------接口调试完毕（联调人员:巩云龙）
       4.新增调查行为 结案和销案 需要跳到文书 还没联调******
3. 队长人员权限
   1. 结案销案查询，结案销案审批（两个内容差不多） 查看和审批都跳到立案登记 -------------接口调试完毕（联调人员:巩云龙）

## 后台走之前完成进度--刘志远

1. 外勤人员权限

   ​	1.待办事项--->巡检登记事项查询，回显页------接口调试完毕（调试人员：高峰）

   ​	2.待办事项--->立案申请  查询，回显页 -------接口调试完毕（调试人员：高峰）

   2 队长权限

    	1.分案 ----> 分页查询完成  ，  分配， 回显外勤  ---接口调试完毕（调试人员：高峰）

   ​	2.分案 -----> sjzt为0跳转内勤---- （调试人员：高峰）

   ​	

## 后台走之前完成进度--张园园

1.系统管理

​      1案由维护查询--->增加，修改，删除------接口已调试完毕(调试人员:高峰)

​      2案由来源维护--->增加，修改，删除------接口已调试完毕(调试人员:高峰)

​      3抽查事项--->增加，修改，删除------接口已调试完毕(调试人员:高峰)

2用户管理

​     1分组维护--->增加，修改，删除------接口已调试完毕(调试人员:巩云龙)



## 20190212

1. header中 调用登记人登记时间接口 添加退出和修改密码功能 完成（用到的值存储在vuex）
2. 左侧tree 点击显示单个分组，路由跳转单个选中 完成（用到的值存储在vuex）
3. 结案销案审批通过，审批退回 完成

>未完成

	1. 代办里面的个数显示 

> 遇到的问题

无

