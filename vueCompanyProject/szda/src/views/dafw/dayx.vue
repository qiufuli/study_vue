<template>
  <div class="yxxx">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height:48px;height:48px;background: #EAF5FF;"
    >
      <el-breadcrumb-item>
        <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
      </el-breadcrumb-item>
      <el-breadcrumb-item style="line-height: 52px;">外单位阅档</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="imgModule noPrint" id="imgModule">
      <div style="padding:20px; padding-left:250px; line-height:62px;">
        <el-form
          ref="search_form"
          :model="formData"
          :rules="rules1"
          class="formData"
          style="display: inline-block;"
        >
          <el-form-item label prop="sqm">
            <el-input type="text" style="width: 250px;" v-model="formData.sqm" placeholder="请输入授权码"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="medium"
          class="base_btn"
          style="width:auto;height:auto"
          @click="yxcx()"
        >查询</el-button>
        <span v-if="timeFlag" class="overTime">
          查阅时间还有：
          {{time.h}}时{{time.m}}分{{time.s}}秒
        </span>
      </div>
      <!-- 翻书 -->
      <div class="imgModule_con" v-if="yx_flag">
        <div class="fan_hack clearfix" style="margin-top:0">
          <!-- 翻书预览 -->
          <!-- <div class="fan_ms f_left">
            <i></i>
            <span>翻书浏览</span>
          </div>-->
          <!-- 全书 -->
          <div class="shu_type f_left">
            <div class="shu_item shu_menu J_shu_menu f_left active" @click="click_menu_tab($event)">
              <i></i>目录预览
            </div>
            <div class="shu_item shu_quan J_shu_quan f_left" @click="click_all_tab($event)">
              <i></i> 全书预览
            </div>
          </div>
          <!-- 上下页 -->
          <div class="check_con f_right">
            <div class="check_btn chakan_menu" @click="click_menu($event)">
              <i></i>查看目录
            </div>
            <div class="check_btn prev" @click="click_prev($event)">
              <i></i>上一页
            </div>
            <div class="check_btn next" @click="click_next($event)">
              下一页
              <i></i>
            </div>
            <div class="check_btn print" @click="print_fn()">
              <i></i>打印
            </div>
          </div>
        </div>
        <div class="fan_con clearfix">
          <div class="shadow"></div>
          <div class="fan_item first_item f_left">
            <div class="img_item J_first_item" style="display: none;">
              <img class="J_left_img" src alt v-viewer />
              <span class="prev_page"></span>
            </div>
            <div class="menu_item J_first_menu">
              <h1>目录</h1>
              <div class="menu_list" v-if="left_render_html" style="min-height: 564px;">
                <div
                  v-for="(_data,index) in left_render_html"
                  :key="index"
                  :class="['menu_list_item', _data.sfbt == 1||_data.sfxbt == 1 ? '' : 'J_click_item','clearfix']"
                  :title="_data.clmc"
                  :cldl="_data.cldl"
                  :sfbt="_data.sfbt"
                  :clsyxh="_data.clsyxh"
                  @click="left_item_click($event)"
                >
                  <!-- <span :class="['item_title',_data.sfbt == 1 ? 'boldTitle' : '']">{{_data.clmc}}</span> -->
                  <span
                    :class="['item_title',_data.sfbt == 1||_data.sfxbt == 1 ? 'boldTitle' : '']"
                  >{{_data.sfbt == '1' || _data.sfxbt == '1'?_data.dlbt+'&nbsp;&nbsp;&nbsp;':_data.xh+'. '}}{{_data.clmc}}</span>
                  <span
                    class="item_time"
                  >{{_data.sfbt == 1 ? '&nbsp;':_data.clzcrq == ''? '&nbsp;': _data.clzcrq}}</span>
                  <span class="item_page">P{{_data.clsyxh}}</span>
                </div>
              </div>
              <div class="PageUp_text" v-if="menu_arr_num+1">{{menu_arr_num+1}}</div>
            </div>
            <div class="PageUp_div">
              <div class="PageUp PagPrev" @click="pageUp_up">
                <i></i>
              </div>
              <div class="PageUp PagNext" @click="pageUp_down">
                <i></i>
              </div>
            </div>
          </div>
          <div class="fan_item second_item f_left" style="width:49%">
            <div class="img_item second_img">
              <img class="J_right_img" src alt v-viewer />
              <span class="next_page"></span>
            </div>
            <div class="menu_item J_second_menu" v-if="right_render_html.length >0">
              <h1>目录</h1>
              <div class="menu_list" style="min-height: 564px;">
                <div
                  v-for="(_data,index) in right_render_html"
                  :key="index"
                  :class="['menu_list_item', _data.sfbt == 1||_data.sfxbt == 1 ? '' : 'J_click_item','clearfix']"
                  :title="_data.clmc"
                  :cldl="_data.cldl"
                  :sfbt="_data.sfbt"
                  :clsyxh="_data.clsyxh"
                  @click="left_item_click($event)"
                >
                  <!-- <span :class="['item_title',_data.sfbt == 1 ? 'boldTitle' : '']">{{_data.clmc}}</span> -->
                  <span
                    :class="['item_title',_data.sfbt == 1||_data.sfxbt == 1 ? 'boldTitle' : '']"
                  >{{_data.sfbt == '1' || _data.sfxbt == '1'?_data.dlbt+'&nbsp;&nbsp;&nbsp;':_data.xh+'. '}}{{_data.clmc}}</span>
                  <span
                    class="item_time"
                  >{{_data.sfbt == 1 ? '&nbsp;':_data.clzcrq == ''? '&nbsp;': _data.clzcrq}}</span>
                  <span class="item_page">P{{_data.clsyxh}}</span>
                </div>
              </div>
              <div class="PageUp_text" v-if="menu_arr_num+2">{{menu_arr_num+2}}</div>
            </div>
          </div>
          <div class="rightbox">
            <div class="rightbox_con" v-if="easyArr">
              <div
                v-for="item in easyArr "
                :key="item.cllb"
                :cldl="item.cldl"
                :class="'rightbox_item'"
                :clsyxh="item.clsyxh"
                @click="rightbox_item_click($event)"
              >
                <i class="iconfont" :class="item.mllg" style="width: 22px;display: inline-block;"></i>
                <span>{{item.btmc}}</span>
              </div>
            </div>
          </div>
          <div class="rightbox_btn">
            <div class="check_btn prev" @click="click_prev($event)">
              <i></i>上一页
            </div>
            <div class="check_btn next" @click="click_next($event)">
              下一页
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="tc noPrint" v-show="tcshow">
       <section>
          <img v-for="item in imgs" class="tc_img_item" :src="item.url" alt="" :key="item.title" :preview='item.preview'>
        </section>
      <div class="op_bg"></div>
      <div class="tc_con">
        <div class="tc_prev">上</div>
        <div class="tc_img">
           <section>
          <img v-for="item in imgs" class="tc_img_item" :src="item.url" alt="" :key="item.title" :preview='item.preview'>
          </section>
        </div>
        <div class="tc_next">下</div>
        <div class="tc_del" @click="closetc()"></div>
      </div> 
    </div>-->
    <el-dialog :visible.sync="print_flag" class="print_wrap noPrint" :before-close="printClose">
      <el-form :model="print_data" :rules="rules" ref="print_form">
        <el-row>
          <el-col class="print_title">打印基本信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="打印用途：" prop="dyyt">
              <el-select
                v-model="print_data.dyyt"
                value-key="value"
                placeholder="请选择"
                class="wd"
                clearable
              >
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in dyyt_arr"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打印说明：" prop="ytsm">
              <el-input v-model="print_data.ytsm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="打印日期：" prop="dyrq">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="print_data.dyrq"
                :picker-options="pickerOptions1"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用单位：" prop="sydw">
              <el-input v-model="print_data.sydw"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人：" prop="sqr">
              <el-input v-model="print_data.sqr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人电话：" prop="sqrlxdh">
              <el-input v-model="print_data.sqrlxdh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="error_mes">
            <el-form-item label="打印备注：" prop="bz" label-width="23%">
              <el-input
                v-model="print_data.bz"
                type="textarea"
                style="width:70%;resize:none;"
                :autosize="{ minRows: 2, maxRows: 3}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="print_title">打印详情</el-col>
        </el-row>
        <el-row class="print_select">
          <el-col>
            <el-radio v-model="getPage" label="1">
              打印当前页
              <el-select
                v-model="getPageNum"
                value-key="value"
                placeholder="请选择"
                :disabled="getPage==2"
              >
                <el-option :value="item" v-for="item in getPageNum_arr" :key="item"></el-option>
              </el-select>
            </el-radio>
          </el-col>
        </el-row>
        <el-row>
          <div class="btn_parent">
            <button
              type="button"
              class="base_btn"
              style="cursor: pointer;"
              @click="print_click()"
              :disabled="print_disabled"
            >打印</button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>
    <div class="print_div showPrint" ref="print">
      <img :src="item" alt v-for="item in print_tpxhs" :key="item" @contextmenu.prevent />
    </div>
    <!-- <div class="menu_list menu_print_class showPrint" >
      <div v-for="(_data,index) in menu_print_arr" :key="index" :class="['menu_list_item', _data.sfbt == 1 ? '' : 'J_click_item','clearfix']" :title="_data.clmc" :cldl="_data.cldl" :sfbt="_data.sfbt" :clsyxh="_data.clsyxh" @click="left_item_click($event)">
            <span :class="['item_title',_data.sfbt == 1 ? 'boldTitle' : '']">{{_data.clmc}}</span>
            <span class="item_time">{{_data.sfbt == 1 ? '&nbsp;':_data.clzcrq == ''? '&nbsp;': _data.clzcrq}}</span>
            <span class="item_page">P{{_data.clsyxh}}</span>
        </div>
    </div>-->
    <div class="print_alert noPrint" v-show="alertShow">打印资料准备中...</div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "@/common/js/axios";
import "@/assets/css/imgModule.css";
import "@/common/scss/public.scss";
import { validator } from "@/common/js/valid";
import { getData } from "@/common/js/common";

export default {
  data() {
    return {
      isEnd: false,
      time: {
        h: "",
        m: "",
        s: ""
      },
      // endTime: new Date().getTime() + 2 * 60 * 60 * 1000,
      endTime: "",
      startTime: "",
      timeFlag: false,
      yx_flag: false,
      click_flag: 0, //默认目录预览：0 全书预览为：1
      dayxid: "",
      grbh: "",
      cdid: "",
      grbh_jd: this.$route.query.grbh,
      xm: this.$route.query.xm,
      menuArr: [], // 存放分组目录
      split_num: 12, //数组按指定个数拆分
      arr_num: 0, //总目录的索引
      menu_arr_num: 0, //总目录的索引
      easyArr: [], //简体目录
      zmlxx: [], //总目录未拆分
      zys: "", //总页数
      left_render_html: [], // 渲染左侧菜单数据
      right_render_html: [],
      tcshow: false,
      print_flag: false, //打印信息栏
      dyyt_arr: [],
      formData: {
        sqm: ""
      },
      print_data: {
        dayxid: "",
        grbh: "", //类型：String  必有字段  备注：14,"full","个人编号",false
        cdid: "", //类型：String  必有字段  备注：14,"full","存档ID",false
        dyyt: "", //类型：String  必有字段  备注：2,"number","打印用途",false
        ytsm: "", //类型：String  可有字段  备注：128,"full","用途说明",true
        dyrq: JSON.parse(sessionStorage.getItem("czyInfo")).xtsj, //类型：String  必 有字段  备注：10,"rq","打印日期",false
        sydw: "", //类型：String  必有字段    备注：128,"full","使用单位",false
        sqr: "", //类型：String  必有字段  备注：64,"full","申请人",false
        sqrlxdh: "", //类型：String  可有字段  备注：32,"full","申请人联系电话",true
        bz: "", //类型：String  可有字段  备注：128,"full","打印备注",true
        tpqsym: "", //类型：String  必有字段  备注：3,"number","图片起始页码",false
        tpjzym: "" //类型：String  可有字段  备注：3,"number","图片截止页码",true
      },
      rules1: {
        sqm: [{ validator: validator('6, "full", "授权码", false') }] //身份证号码
      },
      rules: {
        dyyt: [{ validator: validator('2, "number", "打印用途", false') }], //打印用途
        ytsm: [{ validator: validator('128, "full", "用途说明", true') }], //用途说明
        dyrq: [{ validator: validator('10, "full", "打印日期", false') }], //打印日期
        sydw: [{ validator: validator('128, "full", "使用单位", false') }], //使用单位
        sqr: [{ validator: validator('64, "full", "申请人", false') }], //申请人
        sqrlxdh: [{ validator: validator('32, "phone", "申请人电话", true') }], //申请人电话
        bz: [{ validator: validator('128, "full", "打印备注", true') }], //打印备注
        tpqsym: [
          { validator: validator('3, "number", "图片起始页码", false') }
        ], //图片起始页码
        tpjzym: [{ validator: validator('3, "number", "图片截止页码", true') }] //图片截止页码
      },
      getPage: "1",
      getPageNum: "",
      getPageNum_arr: [],
      startNum: "",
      endNum: "",
      pickerOptions1: {
        disabledDate: time => {
          return (
            time.getTime() >
            new Date(
              JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
            ).getTime()
          );
        }
      },
      print_tpxhs: [],
      print_disabled: false,
      alertShow: false,
      menu_print_arr: [],
      menu_page: [] //存放所有目录页数
    };
  },
  watch: {
    getPage(n, o) {
      if (n == 2) {
        this.getPageNum = "";
      } else if (n == 1) {
        this.startNum = "";
        this.endNum = "";
      }
    }
  },
  mounted() {
    this.initHeight();
  },
  methods: {
    // 目录翻页
    pageUp_down(){
        if(this.arr_num+1 <= this.menuArr.length - 1){
          this.arr_num = this.arr_num+1;
          this.render_arr(this.arr_num)
        }else{
          alert('已经是最后一页了！');
        }
    },
    pageUp_up(){
       if(this.arr_num == 0){
          alert('已经是第一页了！');
        }else{
          this.arr_num = this.arr_num -1;
          this.render_arr(this.arr_num)
        }
    },
    countTime: function() {
      var that = this;
      var date = (that.endTime - that.startTime) * 1000;
      var interval = setInterval(function timestampToTime() {
        date = date - 1000;
        if (date == -1000) {
          that.isEnd = true;
          that.yx_flag = false;
          window.clearInterval(interval);
        } else {
          that.time.h = parseInt((date / 1000 / 60 / 60) % 24, 10);
          if (that.time.h < 10) {
            that.time.h = "0" + that.time.h;
          }
          that.time.m = parseInt((date / 1000 / 60) % 60, 10); //计算剩余的分钟
          if (that.time.m < 10) {
            that.time.m = "0" + that.time.m;
          }
          that.time.s = parseInt((date / 1000) % 60, 10); //计算剩余的秒数
          if (that.time.s < 10) {
            that.time.s = "0" + that.time.s;
          }
          return that.time.h + that.time.m + that.time.s;
        }
      }, 1000);
    },
    yxcx() {
      var _this = this;
      this.$refs["search_form"].validate(valid => {
        if (valid) {
      getData(
        "/dmbgl/dmblbCx",
        { table_name: "szdayy_d_yxdyyt" },
        res => {
          this.dyyt_arr = res.returnData.dmblb;
        },
        function() {
          this.yx_flag = false;
        }
      );
      getData(
        "/yxxx/scmcx",
        { sqm: this.formData.sqm },
        res => {
          this.yx_flag = false;
          this.cyid = res.returnData.das.cyid;
          this.endTime = res.returnData.das.yxjzsj - 0;
          this.startTime = res.returnData.das.dqsj - 0;
          this.timeFlag = true;
          this.dayxid = res.returnData.das.dayxid;
          this.grbh = res.returnData.das.grbh;
          this.cdid = res.returnData.das.cdid;
          this.$nextTick(() => {
            _this.initLayout();
            _this.j_menu(); //简体目录
            _this.all_menu(); //总目录
          });
          this.countTime();
        },
        res => {
          _this.yx_flag = false;
        }
      );
       }
      });
    },
    querySearch(queryString, cb) {
      var _length = this.zys;
      var arr = new Array(_length)
        .join(",")
        .split(",")
        .map((item, index) => {
          return { value: (index + 1).toString() };
        });
      cb(arr);
    },
    // 关闭打印弹窗事件
    printClose(done) {
      this.getPage = "1";
      this.getPageNum = "";
      this.getPageNum_arr = []; //清空当前页信息
      this.print_tpxhs = []; //打印存放的div
      this.startNum = "";
      this.endNum = "";
      this.alertShow = false;
      // this.$refs['print_form'].resetFields();
      done();
    },
    //打开打印弹窗事件
    print_fn() {
      if (this.click_flag != 2) {
        this.print_flag = true;
      } else {
        this.chakan_menu_print();
      }
      if (this.click_flag == 0) {
        var _data = $(".J_right_img").attr("clsyxh");
        this.getPageNum_arr.push(_data);
      } else if (this.click_flag == 1) {
        var _data1 = $(".J_left_img").attr("clsyxh");
        var _data2 = $(".J_right_img").attr("clsyxh")
          ? $(".J_right_img").attr("clsyxh")
          : "";
        this.getPageNum_arr.push(_data1);
        this.getPageNum_arr.push(_data2);
      }
    },
    chakan_menu_print() {
      this.menu_print_arr = this.zmlxx;
      this.$nextTick(() => {
        $(".menu_print_class")
          .removeClass("noPrint")
          .addClass("showPrint");
        $(".print_div")
          .removeClass("showPrint")
          .addClass("noPrint");
        window.print();
      });
    },
    print_click() {
      this.$refs["print_form"].validate(valid => {
        if (valid) {
          if (this.getPage == 1) {
            // 当前页打印 起始值
            if (!this.getPageNum) {
              this.$alert("打印当前页不能为空!", {
                center: true,
                confirmButtonText: "确定"
              });
              return;
            } else {
              this.print_data.tpqsym = this.getPageNum;
              this.print_data.tpjzym = "";
            }
          } else if (this.getPage == 2) {
            if (!this.startNum || !this.endNum) {
              this.$alert("起止页不能为空!", {
                center: true,
                confirmButtonText: "确定"
              });
              return;
            } else if (!parseInt(this.startNum) || !parseInt(this.endNum)) {
              this.$alert("起止页必须为大于0的数字!", {
                center: true,
                confirmButtonText: "确定"
              });
              return;
            } else if (parseInt(this.startNum) > parseInt(this.endNum)) {
              this.$alert("起始页不能大于截止页!", {
                center: true,
                confirmButtonText: "确定"
              });
              return;
            } else if (
              parseInt(this.startNum) > this.zys ||
              parseInt(this.endNum) > this.zys
            ) {
              this.$alert("起始页不能大于总页数" + this.zys + "页!", {
                center: true,
                confirmButtonText: "确定"
              });
              return;
            } else {
              this.print_data.tpqsym = this.startNum;
              this.print_data.tpjzym = this.endNum;
            }
          }
          this.print_data.cdid = this.cdid;
          this.print_data.dayxid = this.dayxid;
          this.print_data.grbh = this.grbh;

          this.print_disabled = true;
          var _this = this;
          _this.alertShow = true;
          // _this.$print(_this.$refs.print);
          axios({
            url: "/yxxx/dyxxbc",
            method: "post",
            data: this.print_data
          }).then(res => {
            var _data = res.returnData;
            if (_data.executeResult == 1) {
              this.print_tpxhs = this.create_print(_data.tpxhs);

              // $(".print_div")
              //   .removeClass("noPrint")
              //   .addClass("showPrint");
              // $(".menu_print_class")
              //   .removeClass("showPrint")
              //   .addClass("noPrint");
              this.$nextTick(() => {
                var imgNum = $(".print_div img").length;
                $(".print_div img").load(function() {
                  --imgNum;
                  if (imgNum == 0) {
                    _this.print_disabled = false;
                    _this.alertShow = false;
                    // window.print();
                    _this.$print(_this.$refs.print);
                  }
                });
              });
            } else {
              this.$alert(_data.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        }
      });
    },
    create_print(print_tpxhs) {
      var _arr = [];
      for (var i = 0; i < print_tpxhs.length; i++) {
        var route_one =
          conf.urlPrefix +
          "/yxxx/tpxxcx?dayxid=" +
          this.dayxid +
          "&tpxh=" +
          print_tpxhs[i] +
          "&time=" +
          Math.random();
        _arr.push(route_one);
      }
      return _arr;
    },
    goOther() {
      this.$router.push({
        path: "/dagl/personal",
        query: { grbh: this.grbh_jd }
      });
    },
    initLayout() {
      var _height = document.body.clientHeight - 66 - 48 - 7;
      if (_height < 820) {
      } else {
        $(".imgModule").height(_height - 30);
      }
    },
    initHeight() {
      var _height = document.body.clientHeight - 66 - 48 - 34;
      $(".imgModule").height(_height);
    },
    dbImg(e) {
      var obj = e.currentTarget;
      var _clsyxh = $(obj).attr("clsyxh");
      if (_clsyxh) {
        this.tcshow = true;
        var _route1 =
          conf.urlPrefix +
          "/yxxx/tpxxcx?dayxid=" +
          this.dayxid +
          "&tpxh=" +
          _clsyxh;
        $(".tc_img_item").attr("src", _route1);
      } else {
        return;
      }
    },
    closetc() {
      this.tcshow = !this.tcshow;
    },
    //模式切换改变上下页的class
    tabsClass(click_flag) {
      if (this.click_flag == 0) {
        $(".chakan_menu").removeClass("active");

        $(".prev").removeClass("J_all_prev");
        $(".next").removeClass("J_all_next");
        $(".prev").addClass("J_menu_prev");
        $(".next").addClass("J_menu_next");
        $(".prev").removeClass("J_chakan_prev");
        $(".next").removeClass("J_chakan_next");
      } else if (this.click_flag == 1) {
        $(".chakan_menu").removeClass("active");

        $(".prev").removeClass("J_menu_prev");
        $(".next").removeClass("J_menu_next");
        $(".prev").removeClass("J_chakan_prev");
        $(".next").removeClass("J_chakan_next");
        $(".prev").addClass("J_all_prev");
        $(".next").addClass("J_all_next");
      } else if (this.click_flag == 2) {
        $(".chakan_menu").addClass("active");
        $(".prev").removeClass("J_menu_prev");
        $(".next").removeClass("J_menu_next");
        $(".prev").removeClass("J_all_prev");
        $(".next").removeClass("J_all_next");
        $(".prev").addClass("J_chakan_prev");
        $(".next").addClass("J_chakan_next");
      }
    },
    // 获取简体目录
    j_menu() {
      axios({
        url: "/yxxx/jtmlbymlid",
        method: "get",
        params: {
          cyid: this.cyid
        }
      }).then(res => {
        var data = res.returnData;
        var _html = "";
        if (data.executeResult == 1) {
          this.yx_flag = true;
          this.easyArr = data.zmlxx;
          var _this = this;
          this.$nextTick(() => {
            _this.tabsClass(_this.click_flag);
            $(".rightbox_item")
              .eq(0)
              .click();
          });
        } else {
          this.$message.warning(res.returnData.message);
        }
      });
    },
    // 获取总目录
    all_menu() {
      var _this = this;
      axios({
        url: "/yxxx/zmlbymlid",
        method: "get",
        params: {
          cyid: this.cyid
        }
      }).then(res => {
        var _data = res.returnData;
        if (_data.executeResult == 1) {
          _this.zmlxx = _data.zmlxx;
          // 小类加 *-*格式
          var left_arr = [];
          _data.zmlxx.map(item => {
            if (item.sfxbt == 1) {
              item.dlbt =
                item.cllb.substr(0, 2).replace(/^0+/, "") +
                "-" +
                item.cllb.substr(2, 2).replace(/^0+/, "");
            }
            if (item.sfbt != 1 && item.sfxbt != 1) {
              left_arr.push(item);
              item.xh = left_arr.length;
            } else {
              left_arr = [];
            }
          });
          // _this.zys = parseInt(_data.zmlxx[0].clzys);
          _this.menuArr = _this.splitArr(_data.zmlxx, _this.split_num);
          _this.get_menu_page(_this.zmlxx);
          // 将数组渲染成页面
          _this.render_arr(this.arr_num);
          this.$nextTick(() => {
            $(".J_click_item")
              .eq(0)
              .click();
          });
        }
      });
    },
    get_menu_page(zml) {
      var _arr = [];
      zml.forEach((v, k) => {
        if (v.tpxhs) {
          v.tpxhs.forEach((item, index) => {
            _arr.push(parseInt(item));
          });
        }
      });
      this.menu_page = _arr;
    },
    //点击查看目录
    click_menu(event) {
      $('.PageUp_div').hide();
      this.click_flag = 2;
      this.tabsClass(this.click_flag);
      $(".menu_item").show();
      $(".img_item").hide();
      $(".J_click_item").removeClass("active");
      $(".rightbox_item").removeClass("active");
      $(".shu_item").removeClass("active");
      // 从新渲染目录
      this.render_all_arr(this.menu_arr_num);
    },
    // 点击目录预览选项卡
    click_menu_tab(obj) {
      var obj = obj.currentTarget;
      $('.PageUp_div').show();
      $(".shu_item").removeClass("active");
      $(obj).addClass("active");
      $(".second_img").show();
      $(".J_second_menu").hide();
      if (this.click_flag == 2) {
        var _clsyxh = parseInt($(".J_right_img").attr("clsyxh"));
      } else {
        var _clsyxh = parseInt($(".J_left_img").attr("clsyxh"));
      }
      this.click_flag = 0;
      this.tabsClass(this.click_flag);

      // 让目录隐藏 图片显示出来
      $(".J_first_menu").show();
      $(".J_first_item").hide();
      // change_menu(_clsyxh,0)
      this.tab_to_menu(_clsyxh);
    },
    //点击全书预览选项卡
    click_all_tab(obj) {
      $('.PageUp_div').hide();
      var obj = obj.currentTarget;
      $(".shu_item").removeClass("active");
      $(obj).addClass("active");
      this.click_flag = 1;
      this.tabsClass(this.click_flag);

      var _clsyxh = parseInt($(".J_right_img").attr("clsyxh"));
      $(".second_img").show();
      $(".J_second_menu").hide();
      // 让目录隐藏 图片显示出来
      $(".J_first_menu").hide();
      $(".J_first_item").show();
      // this.tab_quan(_clsyxh);
      var Flagnum = this.menu_page.indexOf(_clsyxh);
      if (Flagnum % 2 == 1) {
        var xxx = this.menu_page[Flagnum + 1]
          ? this.menu_page[Flagnum + 1]
          : this.menu_page[Flagnum];
        this.tab_quan(xxx, 0);
      } else if (Flagnum % 2 == 0) {
        this.tab_quan(this.menu_page[Flagnum]);
      }
    },
    /**
     * @desc 模式切换的时候有些参数要保留下来 方便另一种模式的使用
     * 模式切换和上下页还是不一样的
     * @param number clsyxh
     * @param number num 默认是查 +0 +1的  num:2 查的是 +1 +2的 num:0 -1 -2
     * @param number page 0是上一页 1是下一页
     * */
    tab_quan(clsyxh, num, undi) {
      var _num = this.menu_page.indexOf(clsyxh); //对应的下表
      if (num == 2) {
        if (this.menu_page[_num + 1] || this.menu_page[_num + 2]) {
          var _first = this.menu_page[_num + 1]; //加一的标识对应的页数
          var _second = this.menu_page[_num + 2]; //加二的标识对应的页数
        } else {
          alert("最后一页了");
          return;
        }
      } else if (num == 0) {
        // 上一页情况
        if (_num == this.menu_page.length - 1) {
          if (undi == 2) {
            var _first = this.menu_page[_num - 1]; //减一的标识对应的页数
            var _second = this.menu_page[_num - 2]; //减二的标识对应的页数
          } else if (this.menu_page[_num] || this.menu_page[_num - 1]) {
            var _first = this.menu_page[_num]; //减一的标识对应的页数
            var _second = this.menu_page[_num - 1]; //减二的标识对应的页数
          } else {
            alert("已经是第一页了");
            return;
          }
        } else {
          if (this.menu_page[_num - 1] || this.menu_page[_num - 2]) {
            var _first = this.menu_page[_num - 1]; //减一的标识对应的页数
            var _second = this.menu_page[_num - 2]; //减二的标识对应的页数
          } else {
            alert("已经是第一页了");
            return;
          }
        }
      } else {
        if (this.menu_page[_num] || this.menu_page[_num + 1]) {
          var _first = this.menu_page[_num];
          var _second = this.menu_page[_num + 1];
        }
      }

      if (num == 0) {
        if (_first < 1 || _second < 1) {
          alert("已经是第一页了");
          return;
        } else {
          var clsyxh1 = _first;
          var clsyxh2 = _second;
          this.render_img(clsyxh1, 2);
          this.render_img(clsyxh2, 1);
        }
      } else {
        if (
          _num <= this.menu_page.length - 1 &&
          _num + 1 < this.menu_page.length - 1
        ) {
          var clsyxh1 = _first;
          var clsyxh2 = _second;
          this.render_img(clsyxh1, 1);
          this.render_img(clsyxh2, 2);
        } else if (
          _num <= this.menu_page.length - 1 &&
          _num + 1 >= this.menu_page.length - 1
        ) {
          var clsyxh1 = _first;
          var clsyxh2 = _second;
          // 就是剩一张图片的时候
          this.render_img(clsyxh1, 1);
          this.render_img(clsyxh2, 0);
        }
      }
    },
    /**
     * @desc 切换到目录预览
     * @param num _clsyxh
     * */
    tab_to_menu(_clsyxh) {
      for (var i = 0; i < this.menuArr.length; i++) {
        for (var j = 0; j < this.menuArr[i].length; j++) {
          var _data1 = this.menuArr[i][j].tpxhs;
          if (_data1 && _data1.length > 0) {
            for (var k = 0; k < _data1.length; k++) {
              var _data2 = _data1[k];
              if (_data2 == _clsyxh) {
                var target_obj = this.menuArr[i][j];
                this.arr_num = i;
                var target_clsyxh = this.menuArr[i][j].clsyxh;
                this.render_arr(this.arr_num);
                this.$nextTick(() => {
                  for (var z = 0; z < $(".J_click_item").length; z++) {
                    if (
                      $(".J_click_item")[z].getAttribute("clsyxh") ==
                      target_clsyxh
                    ) {
                      $(".J_click_item").removeClass("active");
                      $(".J_click_item")
                        .eq(z)
                        .addClass("active");
                      var _route1 =
                        conf.urlPrefix +
                        "/yxxx/tpxxcx?dayxid=" +
                        this.dayxid +
                        "&tpxh=" +
                        _clsyxh;
                      $(".J_right_img").attr("src", _route1);
                      $(".J_right_img").attr("clsyxh", _clsyxh);
                      $(".next_page").text(_clsyxh);
                      return;
                    }
                  }
                });
                return;
              }
            }
          }
        }
      }
    },
    /**
     * @desc 渲染图片
     * @param string clsyxh
     * @param number num  1为左侧图 2为右侧图 0为没有图片了
     * */
    render_img(_clsyxh, num) {
      if (!_clsyxh) {
        // 如果最后一张没有
        $(".J_right_img").attr("src", "");
        $(".J_right_img").attr("clsyxh", "");
        $(".next_page").text("最后一页");
        return;
      } else {
        var _route1 =
          conf.urlPrefix +
          "/yxxx/tpxxcx?dayxid=" +
          this.dayxid +
          "&tpxh=" +
          _clsyxh;
        if (num == 1) {
          // 渲染左侧图片
          $(".J_left_img").attr("src", _route1);
          $(".J_left_img").attr("clsyxh", _clsyxh);
          $(".prev_page").text(_clsyxh);
        } else if (num == 2) {
          // 渲染右侧图片
          $(".J_right_img").attr("src", _route1);
          $(".J_right_img").attr("clsyxh", _clsyxh);
          $(".next_page").text(_clsyxh);
        } else if (num == 0) {
          // 如果最后一张没有
          $(".J_right_img").attr("src", "");
          $(".J_right_img").attr("clsyxh", "");
          $(".next_page").text("最后一页");
        }
      }
    },
    // 上一页点击事件 目录预览和全书预览 查看目录
    click_prev(obj) {
      var obj = obj.currentTarget;
      // 目录上一页
      if ($(obj).hasClass("J_menu_prev")) {
        var _clsyxh = parseInt($(".J_right_img").attr("clsyxh"));
        var _num = this.menu_page.indexOf(_clsyxh);
        if (_num - 1 >= 0) {
          _clsyxh = this.menu_page[_num - 1];
          var _route =
            conf.urlPrefix +
            "/yxxx/tpxxcx?dayxid=" +
            this.dayxid +
            "&tpxh=" +
            _clsyxh;
          $(".J_right_img").attr("src", _route);
          $(".J_right_img").attr("clsyxh", _clsyxh);
          $(".next_page").text(_clsyxh);
          this.change_menu(_clsyxh, 0);
        } else {
          alert("已经是第一页了!");
          return;
        }
      }
      // 全书上一页
      if ($(obj).hasClass("J_all_prev")) {
        var _right_clsyxh = parseInt($(".J_right_img").attr("clsyxh"));
        var _left_clsyxh = parseInt($(".J_left_img").attr("clsyxh"));
        var q_num = this.menu_page.indexOf(_left_clsyxh);
        var q_num_R = this.menu_page.indexOf(_right_clsyxh);
        if (q_num - 1 >= 0) {
          var q_clsyxh = this.menu_page[q_num];
          if (q_clsyxh % 2 == 1) {
            if (q_num_R == -1) {
              this.tab_quan(q_clsyxh, 0, 2);
            } else {
              this.tab_quan(q_clsyxh, 0);
            }
          } else if (q_clsyxh % 2 == 0) {
            if (q_num_R == -1) {
              this.tab_quan(q_clsyxh, 0, 2);
            } else {
              this.tab_quan(q_clsyxh, 0);
            }
          }
          this.addRightClass();
        } else {
          alert("已经是第一页了!");
          return;
        }
      }
      // 查看目录
      if ($(obj).hasClass("J_chakan_prev")) {
        if (this.menu_arr_num == 0) {
          alert("已经是第一页了！");
        } else {
          this.menu_arr_num = this.menu_arr_num - 2;
          this.render_all_arr(this.menu_arr_num);
        }
      }
    },

    //下一页点击事件 目录预览和全书预览
    click_next(obj) {
      var obj = obj.currentTarget;
      // 目录下一页
      if ($(obj).hasClass("J_menu_next")) {
        if ($(".J_right_img").attr("clsyxh")) {
          var _clsyxh = parseInt($(".J_right_img").attr("clsyxh"));
          var _num = this.menu_page.indexOf(_clsyxh);
          if (_num + 1 <= this.menu_page.length - 1) {
            _clsyxh = this.menu_page[_num + 1];
            var _route =
              conf.urlPrefix +
              "/yxxx/tpxxcx?dayxid=" +
              this.dayxid +
              "&tpxh=" +
              _clsyxh;
            $(".J_right_img").attr("src", _route);
            $(".J_right_img").attr("clsyxh", _clsyxh);
            $(".next_page").text(_clsyxh);
            this.change_menu(_clsyxh, 1);
          } else {
            alert("已经是最后一页了!");
            return;
          }
        }
      }
      // 全书下一页
      if ($(obj).hasClass("J_all_next")) {
        var _right_clsyxh = parseInt($(".J_right_img").attr("clsyxh"));
        var _left_clsyxh = parseInt($(".J_left_img").attr("clsyxh"));
        if (!_right_clsyxh || _right_clsyxh < _left_clsyxh) {
          alert("最后一页了！");
          return;
        } else {
          // this.tab_quan(_right_clsyxh, 2);
          if (_right_clsyxh % 2 == 0) {
            this.tab_quan(_right_clsyxh - 1, 2);
          } else if (_right_clsyxh % 2 == 1) {
            this.tab_quan(_right_clsyxh, 2);
          }
          this.addRightClass();
        }
      }
      // 查看目录
      if ($(obj).hasClass("J_chakan_next")) {
        if (this.menu_arr_num + 2 <= this.menuArr.length - 1) {
          this.menu_arr_num = this.menu_arr_num + 2;
          this.render_all_arr(this.menu_arr_num);
        } else {
          alert("已经是最后一页了！");
        }
      }
    },
    /**
     * @desc 浏览模式切换给上下页加不通的class进行区分
     * */
    addRightClass() {
      var _obj_clsyxh = $(".J_left_img").attr("clsyxh");
      for (var i = 0; i < this.easyArr.length; i++) {
        var _data1 = this.easyArr[i];
        for (var j = 0; j < _data1.tpxhs.length; j++) {
          if (_data1.tpxhs[j] == _obj_clsyxh) {
            var target_i = i;
            $(".rightbox_item").removeClass("active");
            $(".rightbox_item")
              .eq(i)
              .addClass("active");
            return;
          }
        }
      }
    },
    /**
     * @desc 上下页改变菜单
     * @param string _clsyxh 序号
     * @param num flag 	1是下一页 0是上一下
     * */
    change_menu(_clsyxh, flag) {
      var pageFlag = false;
      for (var i = 0; i < this.menuArr[this.arr_num].length; i++) {
        var _arr = this.menuArr[this.arr_num][i].tpxhs;
        if (_arr) {
          for (var j = 0; j < this.menuArr[this.arr_num][i].tpxhs.length; j++) {
            //第一种不需要切换目录
            if (this.menuArr[this.arr_num][i].tpxhs[j] == _clsyxh) {
              pageFlag = true;
              //对应的对象
              var target_obj = this.menuArr[this.arr_num][i];
              var target_clsyxh = target_obj.clsyxh;
              var target_cldl = target_obj.cldl;
              //  根据target_obj 给对应的左侧目录加上class

              for (var k = 0; k < $(".J_click_item").length; k++) {
                if (
                  $(".J_click_item")[k].getAttribute("clsyxh") == target_clsyxh
                ) {
                  $(".J_click_item").removeClass("active");
                  $(".J_click_item")
                    .eq(k)
                    .addClass("active");
                }
              }
              // 给对应的右侧菜单加上class
              for (var z = 0; z < this.easyArr.length; z++) {
                if (target_cldl == this.easyArr[z].cldl) {
                  $(".rightbox_item").removeClass("active");
                  $(".rightbox_item")
                    .eq(z)
                    .addClass("active");
                }
              }
              break;
            }
          }
        }
      }
      if (pageFlag == false) {
        if (flag == 1) {
          var _arr_num = this.arr_num + 1;
        } else if (flag == 0) {
          var _arr_num = this.arr_num - 1;
        }
        if (this.menuArr[_arr_num] && this.menuArr[_arr_num].length > 0) {
          for (var i = 0; i < this.menuArr[_arr_num].length; i++) {
            var _arr = this.menuArr[_arr_num][i].tpxhs;
            if (_arr) {
              for (var j = 0; j < this.menuArr[_arr_num][i].tpxhs.length; j++) {
                //第一种不需要切换目录
                if (this.menuArr[_arr_num][i].tpxhs[j] == _clsyxh) {
                  pageFlag = true;
                  this.arr_num = _arr_num;
                  this.render_arr(_arr_num);
                  //对应的对象
                  var target_obj = this.menuArr[this.arr_num][i];
                  var target_clsyxh = target_obj.clsyxh;
                  var target_cldl = target_obj.cldl;

                  this.$nextTick(() => {
                    //  根据target_obj 给对应的左侧目录加上class
                    for (var k = 0; k < $(".J_click_item").length; k++) {
                      if (
                        $(".J_click_item")[k].getAttribute("clsyxh") ==
                        target_clsyxh
                      ) {
                        $(".J_click_item").removeClass("active");
                        $(".J_click_item")
                          .eq(k)
                          .addClass("active");
                      }
                    }
                    // 给对应的右侧菜单加上class
                    for (var z = 0; z < this.easyArr.length; z++) {
                      if (target_cldl == this.easyArr[z].cldl) {
                        $(".rightbox_item").removeClass("active");
                        $(".rightbox_item")
                          .eq(z)
                          .addClass("active");
                      }
                    }
                  });
                  break;
                }
              }
            }
          }
        }
      }
    },
    //左侧菜单选项点击事件
    left_item_click(obj) {
      var obj = obj.currentTarget;
      if ($(obj).hasClass("J_click_item")) {
        var _cldl = $(obj).attr("cldl");
        var _clsyxh = $(obj).attr("clsyxh");
        $(".J_click_item").removeClass("active");
        $(obj).addClass("active");
        for (var i = 0; i < this.easyArr.length; i++) {
          if (_cldl == this.easyArr[i].cldl) {
            $(".rightbox_item").removeClass("active");
            $(".rightbox_item")
              .eq(i)
              .addClass("active");
          }
        }

        //  查看目录模式
        if (this.click_flag == 2) {
          for (var i = 0; i < this.menuArr.length; i++) {
            var _data = this.menuArr[i];
            for (var j = 0; j < _data.length; j++) {
              if (_data[j].clsyxh == _clsyxh) {
                this.arr_num = i;
                this.render_arr(this.arr_num);
                this.click_flag = 0;
                this.tabsClass(this.click_flag);
                $(".J_shu_menu").addClass("active");
                this.$nextTick(() => {
                  for (var k = 0; k < $(".J_click_item").length; k++) {
                    if (
                      $(".J_click_item")[k].getAttribute("clsyxh") == _clsyxh
                    ) {
                      $(".J_click_item")[k].click();
                      return;
                    }
                  }
                  return;
                });
              }
            }
          }
        }
        var _route =
          conf.urlPrefix +
          "/yxxx/tpxxcx?dayxid=" +
          this.dayxid +
          "&tpxh=" +
          _clsyxh;
        $(".J_right_img").attr("src", _route);
        $(".J_right_img").attr("cldl", _cldl);
        $(".J_right_img").attr("clsyxh", _clsyxh);
        $(".next_page").text(_clsyxh);
        $(".second_img").show();
        this.right_render_html = [];
        $(".second_item .J_second_menu").hide();
      }
    },
    //右侧菜单选项点击事件
    rightbox_item_click(obj) {
      var obj = obj.currentTarget;
      $(".rightbox_item").removeClass("active");
      $(obj).addClass("active");
      if (this.click_flag == 0) {
        //目录预览
        var _cldl = $(obj).attr("cldl");
        this.menu_right_click(_cldl);
      } else if (this.click_flag == 1) {
        //全书预览
        var _clsyxh = parseInt($(obj).attr("clsyxh"));
        this.tab_quan(_clsyxh);
      } else if (this.click_flag == 2) {
        $(".rightbox_item").removeClass("active");
      }
    },
    // menu_right_click
    menu_right_click(_cldl) {
      for (var i = 0; i < this.menuArr.length; i++) {
        for (var j = 0; j < this.menuArr[i].length; j++) {
          if (
            this.menuArr[i][j].cldl == _cldl &&
            this.menuArr[i][j].sfbt == "0"
          ) {
            this.arr_num = i;
            var _clsyxh = this.menuArr[i][j].clsyxh;
            this.render_arr(this.arr_num);
            this.$nextTick(() => {
              for (var k = 0; k < $(".J_click_item").length; k++) {
                if ($(".J_click_item")[k].getAttribute("clsyxh") == _clsyxh) {
                  $(".J_click_item")[k].click();
                  return;
                }
              }
            });
            return;
          }
        }
      }
    },
    //渲染左侧菜单数据
    render_arr(arr_num) {
      this.left_render_html = this.menuArr[arr_num];
      this.right_render_html = [];
      $(".J_second_menu .PageUp_text").text(arr_num + 2);
      $(".J_first_menu .PageUp_text").text(arr_num + 1);
    },
    render_all_arr(menu_arr_num) {
      $(".J_second_menu .PageUp_text").text(this.menu_arr_num + 2);
      $(".J_first_menu .PageUp_text").text(this.menu_arr_num + 1);
      // if (menu_arr_num < this.menuArr.length - 1) {
      //   this.left_render_html = this.menuArr[menu_arr_num];
      // } else {
      //   if (menu_arr_num == 0) {
      //   } else {
      //     alert("已经是最后一页了！");
      //   }
      // }
      // if (menu_arr_num + 1 <= this.menuArr.length - 1) {
      //   this.right_render_html = this.menuArr[menu_arr_num + 1];
      // } else {
      //   this.right_render_html = [];
      // }
      if (
        menu_arr_num <= this.menuArr.length - 1 &&
        menu_arr_num + 1 <= this.menuArr.length - 1
      ) {
        this.left_render_html = this.menuArr[menu_arr_num];
        this.right_render_html = this.menuArr[menu_arr_num + 1];
      } else if (
        menu_arr_num + 1 > this.menuArr.length - 1 &&
        menu_arr_num <= this.menuArr.length - 1
      ) {
        this.right_render_html = [];
        this.left_render_html = this.menuArr[menu_arr_num];
      } else if (menu_arr_num > this.menuArr.length - 1) {
        alert("已经是最后一页了！");
      }
    },
    // 分组数组
    splitArr(arr, num) {
      var all_arr = [];
      var single_arr = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr.length <= num) {
          single_arr.push(arr[i]);
          if (i == arr.length - 1) {
            all_arr.push(single_arr);
          }
        } else {
          if (all_arr.length < Math.floor(arr.length / num)) {
            single_arr.push(arr[i]);
            if (single_arr.length == num) {
              all_arr.push(single_arr);
              single_arr = [];
            }
          } else {
            single_arr.push(arr[i]);
            if (i == arr.length - 1) {
              all_arr.push(single_arr);
            }
          }
        }
      }
      return all_arr;
    }
  }
};
</script>

<style scoped>
.tc {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.tc .op_bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  filter: alpha(opacity=50);
}
.tc .tc_con {
  position: relative;
  top: 5%;
  left: 10%;
  z-index: 2;
  width: 80%;
  height: 90%;
}
.tc .tc_con .tc_prev {
  position: absolute;
  top: 0;
  left: 0;
  width: 10%;
  height: 100%;
  background: url("../../assets/images/left_icon.png") no-repeat center center;
  background-size: 60px 60px;
  text-align: center;
  cursor: pointer;
  display: none;
}
.tc .tc_con .tc_next {
  position: absolute;
  top: 0;
  right: 0;
  width: 10%;
  height: 100%;
  text-align: center;
  background: url("../../assets/images/right_icon.png") no-repeat center center;
  background-size: 60px 60px;
  cursor: pointer;
  display: none;
}
.tc .tc_con .tc_del {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: url("../../assets/images/del_icon.png") no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
}
.tc .tc_con .tc_img {
  width: 80%;
  height: 100%;
  position: absolute;
  left: 10%;
}
.tc .tc_con .tc_img_item {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.print_div {
  width: 100%;
  text-align: center;
  display: none;
}
.print_div img {
  display: inline-block;
  max-width: 100%;
}
.print_alert {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -50px;
  z-index: 9999;
  width: 200px;
  height: 100px;
  line-height: 100px;
  color: #009cff;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 5px #b7cddb;
  text-align: center;
}
.overTime {
  display: inline-block;
  margin-left: 25px;
  color: #007eff;
  font-weight: 900;
  font-size: 16px;
}
.formData{
  background-color:transparent;
}
/*imgModule end*/
</style>
