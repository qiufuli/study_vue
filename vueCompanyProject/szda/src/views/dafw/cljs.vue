<template>
  <div>
    <div class="bread">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="line-height:48px;height:48px;background: #EAF5FF;"
      >
        <el-breadcrumb-item>
          <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
        </el-breadcrumb-item>
        <el-breadcrumb-item style="line-height: 52px;">材料接收</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base-content cljs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="材料接收" name="first">
          <el-form ref="form" :model="formData" :rules="rules" class="formData">
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm">
                  <el-input v-model="formData.sfzhm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm">
                  <el-input v-model="formData.xm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档编号：" prop="cdbh">
                  <el-input v-model="formData.cdbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="单位名称：" prop="dwmc" class="dajs_ssdw">
                  <el-autocomplete
                    v-model="formData.dwmc"
                    :fetch-suggestions="querySearch2"
                    :trigger-on-focus="false"
                    @select="handleSelect1"
                    @blur="on_blur2"
                    style="width: 350px;"
                    :title="formData.dwmc"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="btn_parent">
                <el-button type="primary" size="medium" @click="handleSub(1, 1)" class="base_btn">查询</el-button>
                <el-button
                  size="medium"
                  class="base_btn"
                  style="margin-left:20px;"
                  @click="form_reset"
                >重置</el-button>
              </div>
            </el-row>
          </el-form>
          <!-- 基本信息 -->
          <div class="base-content_public" v-if="flag">
            <div>
              <my-bread level1="iconjichuxinxi" level2="基础信息"></my-bread>
            </div>
            <div>
              <el-form :model="BaseFormData" class="BaseFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名：">
                      <!-- @click="see(BaseFormData.grbh)" -->
                      <!-- class="base_input_view HasColor" -->
                      <span class="base_input_view">{{BaseFormData.xm}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别：">
                      <input v-model="BaseFormData.xb" readonly class="base_input_view Baseclass" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="存档日期：">
                      <input v-model="BaseFormData.cdrq" readonly class="base_input_view Baseclass" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="委托存档单位：">
                      <!-- @click="see(BaseFormData.grbh)"
                      class="base_input_view HasColor"-->
                      <span class="base_input_view" :title="BaseFormData.dwmc">{{BaseFormData.dwmc}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在位置：">
                      <input
                        v-model="BaseFormData.dacfwz"
                        readonly
                        class="base_input_view Baseclass"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

          <!-- 单位查询数据 -->
          <el-table
            ref="multipleTable"
            :data="dw_tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-if="dw_flag1"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="xh" label="序号" min-width="8%" align="center"></el-table-column>
            <el-table-column prop="sfzhm" label="身份证号码" min-width="30%" align="center"></el-table-column>
            <el-table-column prop="xm" label="姓名" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="cdbh" label="存档编号" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="cdrq" label="存档日期" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="dwmc" label="委托存档单位" min-width="15%" align="center"></el-table-column>
          </el-table>
          <!-- 单位数据分页 -->
          <el-row class="btn_parent page_style" v-if="dw_flag1">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="dw_total"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
          <!-- 材料接收信息 -->
          <div class="base-content_public kjzm" v-if="dw_flag" style="margin-top: 10px;">
            <div>
              <my-bread level1="iconkaijuzhengming" level2="材料接收信息"></my-bread>
            </div>
            <div class="zmxx_content">
              <el-form
                ref="forms"
                :model="cljsFormData"
                :rules="rules1"
                class="cljsFormData cljs_input"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="材料接收日期：" prop="jsrq" label-width="140px" required>
                      <el-date-picker
                        v-model="cljsFormData.jsrq"
                        align="right"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="提交人：" prop="tjr" label-width="140px" required>
                      <el-input v-model="cljsFormData.tjr"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="提交人联系电话：" prop="tjrdh" label-width="140px" required>
                      <el-input v-model="cljsFormData.tjrdh"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="材料来源：" prop="clly" label-width="140px" required>
                      <el-select v-model="cljsFormData.clly" value-key="value">
                        <el-option
                          :label="item.dmmc"
                          :value="item.dmid"
                          v-for="item in clly_dmb"
                          :key="item.dmid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="机要号：" prop="jyh" label-width="140px">
                      <el-input v-model="cljsFormData.jyh"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- </el-form> -->
                <!-- <el-form ref="cljs_form" :model="tableData" :rules="rules2"> -->
                <el-row>
                  <div class="per_xlxx">
                    <div class="title_wrap">
                      <div class="title_r" @click="addList">
                        <i class="iconfont">&#xe62d;</i>
                        <span>新增</span>
                      </div>
                    </div>
                    <div class="list_wrap">
                      <el-row class="table_row">
                        <el-col :span="1">序号</el-col>
                        <el-col :span="8">材料接收类别</el-col>
                        <el-col :span="7">材料名称</el-col>
                        <el-col :span="3">材料份数</el-col>
                        <el-col :span="4">是否需要数字化</el-col>
                        <el-col :span="1"></el-col>
                      </el-row>
                      <el-row
                        :class="{'row_class':true, 'row_class2':index%2==0}"
                        v-for="(item,index) in cljsFormData.cljsBCEntity"
                        :key="index"
                        style="height:60px"
                      >
                        <el-col :span="1">{{index+1}}</el-col>
                        <el-col :span="8" style="height:60px">
                          <el-form-item
                            class="clmc errorOnly"
                            :prop="'cljsBCEntity.' + index + '.cllb'"
                            :rules="rules1.cllb"
                          >
                            <el-select
                              v-model="item.cllb"
                              value-key="value"
                              :title="cllbTitle"
                              @change="checkVal"
                            >
                              <el-option
                                :label="item.dmmc"
                                :value="item.dmid"
                                v-for="item in cllb_dmb"
                                :key="item.dmid"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7" style="height:60px">
                          <el-form-item
                            class="clmc"
                            :prop="'cljsBCEntity.' + index + '.clmc'"
                            :rules="rules1.clmc"
                          >
                            <el-input v-model="item.clmc"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" style="height:60px">
                          <el-form-item
                            class="clmc"
                            :prop="'cljsBCEntity.' + index + '.clfs'"
                            :rules="rules1.clfs"
                          >
                            <el-input v-model="item.clfs"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4" style="height:60px">
                          <el-form-item
                            :prop="'cljsBCEntity.' + index + '.sfxyszh'"
                            :rules="rules1.sfxyszh"
                          >
                            <el-select v-model="item.sfxyszh">
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="0"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1">
                          <i class="iconfont del_icon" @click="del(index)">&#xe606;</i>
                        </el-col>
                      </el-row>
                      <!-- <el-row class="zwsj" v-if="cljsxx == ''">暂无数据</el-row> -->
                    </div>
                  </div>
                </el-row>
                <div class="btn_parent">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="keep"
                    class="base_btn"
                    style="cursor: pointer;"
                  >保存</el-button>
                </div>
              </el-form>
            </div>
          </div>
          <!-- 材料接收记录 -->
          <div class="base-content_public" v-if="flag" style="margin-top: 10px;">
            <div>
              <my-bread level1="iconkaijuzhengming" level2="材料接收记录"></my-bread>
            </div>
            <div class="zmxx_content cljsjl">
              <div class="table_form">
                <el-row class="table_tit">
                  <el-col :span="2">序号</el-col>
                  <el-col :span="3">接收日期</el-col>
                  <el-col :span="3">材料明细</el-col>
                  <el-col :span="3">材料来源</el-col>
                  <el-col :span="2">机要号</el-col>
                  <el-col :span="2">提交人</el-col>
                  <el-col :span="5">提交人联系电话</el-col>
                  <el-col :span="2">接收人</el-col>
                </el-row>
                <el-row v-if="MsgFlag">
                  <div class="MsgFlag">暂无数据</div>
                </el-row>
                <el-row
                  :class="index%2 == 1 ?'row_class':'row_class2'"
                  v-for="(item,index) in table_data"
                  :key="index"
                >
                  <el-row class="table_item">
                    <el-col :span="2">{{item.xh}}</el-col>
                    <el-col :span="3">{{item.jsrq}}</el-col>
                    <el-col :span="3">
                      <span style="cursor:pointer;color: #1488f5;" @click="checkLook(index)">查看</span>
                    </el-col>
                    <el-col :span="3">{{item.clly}}</el-col>
                    <el-col :span="2">{{item.jyh}}</el-col>
                    <el-col :span="2">{{item.tjr}}</el-col>
                    <el-col :span="5">{{item.tjrdh}}</el-col>
                    <el-col :span="2">{{item.czyxm}}</el-col>
                  </el-row>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <el-row class="btn_parent page_style" v-if="total">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="total"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
        <!-- 材料接收查询 -->
        <el-tab-pane label="材料接收查询" name="second">
          <el-form
            ref="Search_form"
            :model="Search_formData"
            :rules="Search_rules"
            class="formData cljsSearch"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm">
                  <el-input v-model="Search_formData.sfzhm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm">
                  <el-input v-model="Search_formData.xm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档编号：" prop="cdbh">
                  <el-input v-model="Search_formData.cdbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="接收日期开始：" prop="jskssj">
                  <el-date-picker
                    v-model="Search_formData.jskssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接收日期结束：" prop="jsjssj">
                  <el-date-picker
                    v-model="Search_formData.jsjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="材料来源：" prop="clly" class="dazt_select">
                  <el-select v-model="Search_formData.clly" value-key="value">
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in clly_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="档案状态：" prop="dazt" class="dazt_select">
                  <el-select v-model="Search_formData.dazt">
                    <el-option label="当前" value="1"></el-option>
                    <el-option label="转出" value="2"></el-option>
                    <el-option label="全部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="所属单位：" prop="dwmc" class="dajs_ssdw">
                  <el-autocomplete
                    v-model="Search_formData.dwmc"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    @blur="on_blur"
                    style="width: 350px;"
                    :title="Search_formData.dwmc"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="btn_parent">
              <el-button
                type="primary"
                size="medium"
                @click="Search_submit(1, 1)"
                class="base_btn"
              >查询</el-button>
              <el-button
                size="medium"
                class="base_btn"
                style="margin-left:20px;"
                @click="form_reset"
              >重置</el-button>
            </div>
          </el-form>
          <!-- 证明查询信息 -->
          <div class="base-content_public" style="margin-top: 10px;" v-if="secondFlag">
            <div class="searchResult">
              <my-bread level1="iconzaitu" level2="查询结果"></my-bread>
              <span class="totles">共{{totals}}条</span>
            </div>
            <div class="table_div">
              <el-table
                :data="Search_tableData"
                stripe
                @sort-change="sortChange"
                style="width: 100%"
              >
                <el-table-column prop="xh" label="序号" min-width="7%" align="center"></el-table-column>
                <el-table-column
                  prop="sfzhm"
                  label="身份证号码"
                  sortable="custom"
                  min-width="20%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="xm"
                  label="姓名"
                  sortable="custom"
                  min-width="15%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="cdbh"
                  label="存档编号"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column label="材料明细" min-width="10%" align="center">
                  <template slot-scope="scope">
                    <span
                      style="color: #1488f5;cursor: pointer;"
                      @click="Search_dialog(scope.row.szdayy_cljsmxbEntity)"
                    >查看</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="jsrq"
                  label="接收日期"
                  sortable="custom"
                  min-width="15%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="czyxm"
                  label="接收操作员"
                  sortable="custom"
                  min-width="15%"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <el-row class="btn_parent page_style" v-if="search_total">
            <el-pagination
              @current-change="SearchCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="totals"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
        </el-tab-pane>

        <!-- 弹出框 -->
        <el-dialog title :visible.sync="table_flag">
          <el-row class="ajh_div">
            <el-table
              :data="tableData_alert"
              border
              style="width: 100%"
              :header-cell-style="{background:'#39b5fd',color:'#606266'}"
            >
              <el-table-column prop="xh" label="序号" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="cllb" label="材料类别" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="clmc" label="材料名称" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="clfs" label="材料份数" min-width="10%" align="center"></el-table-column>
              <el-table-column label="操作" min-width="10%" align="center" v-if="seach_left">
                <template slot-scope="scope">
                  <span style="color: #1488f5;cursor: pointer;" @click="Upload_dialog(scope.row)">上传</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-dialog>

        <!-- 上传弹框 -->
        <el-dialog title :visible.sync="Upload_flag" class="upload_dialog" @close='closeDialog'>
          <el-row class="upload_div">
            <el-upload
              multiple
              ref="upload"
              class="avatar-uploader"
              :action="uploadUrl"
              list-type="picture-card"
              :file-list="ad_url_list"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadRequest"
              :on-change="uploadChange"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
            >
              <!-- :http-request="uploadSectionFile" -->
              <!-- <img :src="imgSrc" style="height:100%;width:100%;" alt=""> -->
              <i class="el-icon-plus"></i>
            </el-upload>
            
          </el-row>
        </el-dialog>
      </el-tabs>
    </div>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import "@/common/scss/common.scss";
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import { getData, deepClone } from "@/common/js/common";
export default {
  data() {
    return {
      filearea:[],
      time: '',
      upData_cljsid: "",
      ad_url_list: [],
      ad_clone_list:[],
      dialogVisible: false,
      dialogImageUrl:'',
      imgSrc: "",
      img_src: "",
      uploadUrl: "",
      // uploadUrl: conf.urlPrefix + '/dagl/profiles?grbh=' + this.$route.query.grbh,
      seach_left: true,
      clly_dmb: [],
      pageSize: 12,
      total: "",
      dw_total: "",
      pageNum: 1,
      cllb_dmb: [],
      cllbTitle: "", //材料类别title
      table_flag: false,
      Upload_flag: false,
      flag: false,
      MsgFlag: true,
      dw_flag: false,
      dw_flag1: false,
      dw_tableData: [],
      secondFlag: false,
      search_total: false,
      formData: { sfzhm: "", cdbh: "", xm: "" },
      BaseFormData: {},
      tableData_alert: [],
      totals: "0",
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: "cdid", // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
      cljsFormData: {
        cljsByDwEntities: [],
        // 职称信息数据
        cljsBCEntity: [
          {
            cllb: "", //类型：String  必有字段  备注：4,"full","材料类别",true
            clmc: "", //类型：String  必有字段  备注：128,"full","材料名称",true
            clfs: "", //类型：String  必有字段  备注：6,"full","材料份数",true
            sfxyszh: "1"
          }
        ]
      },
      table_data: [],
      rules: {
        sfzhm: [{ validator: validator('18, "full", "身份证号码", true') }],
        xm: [{ validator: validator('50, "full", "姓名", true') }],
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        dwmc: [{ validator: validator('128, "less", "单位名称", true') }]
      },
      rules1: {
        jsrq: [{ validator: validator('14, "full", "材料接收日期", false') }],
        tjr: [{ validator: validator('30, "full", "提交人", false') }],
        tjrdh: [
          { validator: validator('32, "less", "提交人联系电话", false') }
        ],
        clly: [{ validator: validator('30, "full", "材料来源", false') }],
        jyh: [{ validator: validator('30, "full", "机要号", true') }],
        cllb: [{ validator: validator('4, "full", "材料接收类别", false') }],
        clmc: [{ validator: validator('128, "full", "材料名称", false') }],
        clfs: [{ validator: validator('6, "full", "材料份数", false') }]
      },
      pickerOptions: {
        disabledDate: time => {
          return (
            time.getTime() >
            new Date(
              JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
            ).getTime()
          );
        }
      },
      Search_page: "",
      Search_formData: {},
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        jskssj: [{ validator: validator('10, "full", "接收日期开始", true') }],
        jsjssj: [{ validator: validator('10, "full", "接收日期结束", true') }],
        dazt: [{ validator: validator('1, "full", "档案状态", false') }],
        clly: [{ validator: validator('2, "full", "材料来源", true') }],
        dwmc: [{ validator: validator('128, "full", "所属单位", true') }]
      },
      Search_tableData: [],
      dwxzTitle: "",
      dwxz_dmb: [],
      activeName: "first",
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.Search_formData.jdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return (
              time.getTime() >
              new Date(
                JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
              ).getTime()
            );
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.Search_formData.jdkssj;
          if (beginDateVal) {
            return (
              time.getTime() >
                new Date(
                  JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
                ).getTime() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return (
              time.getTime() >
              new Date(
                JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
              ).getTime()
            );
          }
        }
      }
    };
  },
  methods: {
    // 220104197812025515
    closeDialog(){
      this.ad_url_list = [];
    }
    ,
    // 上传
    Upload_dialog(data) {
      this.upData_cljsid = data.cljsid;
      this.echo_data(data.cljsid);
      this.uploadUrl =
        "/dafw/cljssctp?grbh=" +
        this.grbh +
        "&clid=" +
        data.clid +
        "&cljsid=" +
        data.cljsid;
      this.Upload_flag = true;
    },
    // 图片回显
    echo_data(cljsid) {
      var _this = this;
      getData(
        "/dafw/cljstpmcck",
        { cljsid: cljsid },
        function(res) {
          _this.ad_url_list = res.returnData.cljstpxx.map(item => {
            item = {
              grbh: item.grbh,
              clid: item.clid,
              cljsid: item.cljsid,
              tpmc: item.tpmc,
              name: item.tpmc,
              uid:item.uid,
              url:
                conf.urlPrefix +
                "/dafw/cljstpcx?grbh=" +
                item.grbh +
                "&clid=" +
                item.clid +
                "&cljsid=" +
                item.cljsid +
                "&tpmc=" +
                item.tpmc
            };
            return item;
          });
          _this.ad_clone_list =  deepClone(_this.ad_url_list);
          _this.time = parseInt(res.returnData.time)
        },
        function() {}
      );
    },
    get_dele_data(file){
      var imgData = {};
      var _this = this;
      getData(
        "/dafw/cljstpmcck",
        { cljsid: _this.upData_cljsid },
        function(res) {
          _this.ad_clone_list = res.returnData.cljstpxx.map(item => {
            item = {
               grbh: item.grbh,
              clid: item.clid,
              cljsid: item.cljsid,
              tpmc: item.tpmc,
              name: item.tpmc,
              uid:item.uid,
              url:
                conf.urlPrefix +
                "/dafw/cljstpcx?grbh=" +
                item.grbh +
                "&clid=" +
                item.clid +
                "&cljsid=" +
                item.cljsid +
                "&tpmc=" +
                item.tpmc
            };
            return item;
          });
           _this.ad_clone_list.filter((item)=>{
            if(file.uid == item.uid){
               imgData = {
              grbh: item.grbh,
              clid: item.clid,
              cljsid: item.cljsid,
              tpmc: item.tpmc
            };
            }
          })
        getData(
          "/dafw/dlcljstp",
          imgData,
          function(res) {
            _this.$message.success(res.returnData.message);
          },
          function() {
            _this.$message.warning(res.returnData.message);
          }
        );

        },
        function() {}
      );
    },
    get_size_data(file){
      var imgData = {};
      var _this = this;
      getData(
        "/dafw/cljstpmcck",
        { cljsid: _this.upData_cljsid },
        function(res) {
          _this.ad_clone_list = res.returnData.cljstpxx.map(item => {
            item = {
               grbh: item.grbh,
              clid: item.clid,
              cljsid: item.cljsid,
              tpmc: item.tpmc,
              name: item.tpmc,
              uid:item.uid,
              url:
                conf.urlPrefix +
                "/dafw/cljstpcx?grbh=" +
                item.grbh +
                "&clid=" +
                item.clid +
                "&cljsid=" +
                item.cljsid +
                "&tpmc=" +
                item.tpmc
            };
            return item;
          });
           _this.ad_clone_list.filter((item)=>{
           if(file.uid == item.uid){
              _this.dialogImageUrl = item.url;
              _this.dialogVisible = true;
            };
          })
        
        },
        function() {}
      );
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
  
      const supportedTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (supportedTypes.indexOf(file.type) < 0) {
        this.$message.error("文件格式只支持：jpg、jpeg 和 png");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
    },
    // 请求方式
    async uploadRequest(params){
      const self = this;
      const formData = new FormData()
      var time = this.time++
      formData.append('file', params.file)
      formData.append('time', time);
      formData.append('uid', params.file.uid);
      var data = await $.post(self.uploadUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      if(data.returnData.executeResult !=1){
        this.$message.warning(data.returnData.message);
      }
    },
    // change事件
    uploadChange(file,fileList){
    },
    // 放大
    handlePictureCardPreview(file) {
      this.get_size_data(file);
    },
    handleRemove(file, fileList){
      if( file && file.status==="success"){
       this.get_dele_data(file);
      }
    },
    handleExceed(file,fileList){
    },



    // 列表排序
    sortChange(column, prop, order) {
      this.Search_page.prop = column.prop;
      this.Search_page.order = column.order;
      var _this = this;
      getData(
        "/dafw/cljsxxcx",
        this.Search_page,
        function(res) {
          _this.Search_tableData = res.returnData.cljsxx;
          _this.totals = res.rowsCount;
          _this.secondFlag = true;
          _this.totals == 0
            ? (_this.search_total = false)
            : (_this.search_total = true);
          for (var i = 0; i < res.returnData.cljsxx.length; i++) {
            //序号赋值
            _this.Search_tableData[i].xh = parseInt(res.startNum) + i;
          }
        },
        function() {
          _this.search_total = false;
          _this.secondFlag = false;
        }
      );
    },
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.handleSub(val);
    },
    getdmb() {
      var _this = this;
      const data = { table_name: "szdayy_d_cllb" };
      getData("/dmbgl/dmblbCx", data, function(res) {
        _this.cllb_dmb = res.returnData.dmblb;
        // _this.cllb_title = _this.
      });
      getData("/dmbgl/dmblbCx", { table_name: "szdayy_d_clly" }, function(res) {
        _this.clly_dmb = res.returnData.dmblb;
        // _this.cllb_title = _this.
      });
    },
    // x查询
    handleSub(num, flag) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var _this = this;
          if (flag == 1) {
            this.form_data_page = deepClone(this.formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || _this.pageNum;
          if (
            this.formData.sfzhm ||
            this.formData.cdbh ||
            this.formData.xm ||
            this.formData.dwmc
          ) {
            getData("/dafw/cljscx", data, function(res) {
              _this.dw_flag = true;
              // 判断上传按钮显示
              _this.seach_left = true;
              if (res.returnData.flag == 1) {
                _this.dw_flag1 = true;
                _this.total = "";
                _this.flag = false;
                setTimeout(() => {
                  _this.setSelectRow();
                }, 200);
                _this.cljsFormData.cljsBCEntity = [
                  { cllb: "", clmc: "", clfs: "", sfxyszh: "1" }
                ];
                _this.dw_tableData = res.returnData.cljss;
                if (
                  res.returnData.cljss != null ||
                  res.returnData.cljss != undefined
                ) {
                  for (var i = 0; i < res.returnData.cljss.length; i++) {
                    //序号赋值
                    _this.dw_tableData[i].xh = parseInt(res.startNum) + i;
                  }
                  _this.dw_total = res.rowsCount;
                }
              } else {
                _this.dw_flag1 = false;
                _this.flag = true;
                // _this.cljsFormData.cljsBCEntity = [
                //       { cllb: "", clmc: "", clfs: "", sfxyszh: "1" }
                //     ];
                _this.BaseFormData = res.returnData.kjzmjc; //查询基础信息
                _this.grbh = _this.BaseFormData.grbh;
                if (_this.BaseFormData.xb == "1") {
                  _this.BaseFormData.xb = "男";
                } else if (_this.BaseFormData.xb == "2") {
                  _this.BaseFormData.xb = "女";
                }
                if (res.returnData.cljsjls) {
                  _this.table_data = res.returnData.cljsjls;
                  _this.MsgFlag = false;
                } else {
                  _this.MsgFlag = true;
                }
                _this.total = res.rowsCount;
                if (
                  res.returnData.cljsjls != null ||
                  res.returnData.cljsjls != undefined
                ) {
                  for (var i = 0; i < res.returnData.cljsjls.length; i++) {
                    //序号赋值
                    _this.table_data[i].xh = parseInt(res.startNum) + i;
                  }
                }
              }
            });
          } else {
            this.$alert("请输入查询条件！", {
              center: true,
              confirmButtonText: "确定"
            });
          }
        }
      });
    },
    // 列表查看
    checkLook(num) {
      this.table_data.map((item, i) => {
        if (item.szdayy_cljsmxbEntity) {
          if (i == num) {
            this.tableData_alert = item.szdayy_cljsmxbEntity;
            for (let i = 0; i < item.szdayy_cljsmxbEntity.length; i++) {
              this.tableData_alert[i].xh = i + 1;
            }
          }
        } else {
          this.tableData_alert = [];
        }
      });
      this.table_flag = true;
    },
    // 删除
    del(num) {
      if (this.cljsFormData.cljsBCEntity.length == 1) {
        this.$message.warning("没有更多数据了！");
        return false;
      }
      this.cljsFormData.cljsBCEntity.some((item, i) => {
        if (i == num) {
          this.cljsFormData.cljsBCEntity.splice(i, 1);
          // 在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          return true;
        }
      });
    },
    // 新增
    addList() {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.cljsFormData.cljsBCEntity.push({
            cllb: "", //类型：String  必有字段  备注：4,"full","材料类别",true
            clmc: "", //类型：String  必有字段  备注：128,"full","材料名称",true
            clfs: "", //类型：String  必有字段  备注：6,"full","材料份数",true
            sfxyszh: "1"
          });
        }
      });
    },
    handleSelectionChange(val) {
      //表格复选数据
      this.multipleSelection = val;
      this.changePageCoreRecordData();
    },
    // 保存
    keep() {
      var _this = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              var data = this.cljsFormData;
              if (this.dw_flag1) {
                //单位数据保存
                data.cljsByDwEntities = this.multipleSelectionAll;
              } else {
                data.cljsByDwEntities.push({
                  grbh: this.BaseFormData.grbh,
                  cdid: this.BaseFormData.cdid
                });
              }
              $({
                url: "/dafw/cljsbc",
                method: "post",
                data: data
              }).then(res => {
                const _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$alert(_res.message, {
                    center: true,
                    confirmButtonText: "确定"
                  });
                  // this.$refs["forms"].resetFields();
                  // this.handleSub(1, 1);
                  // this.cljsFormData = {}
                  for (var i in this.cljsFormData) {
                    if (i == "cljsByDwEntities") {
                      this.cljsFormData[i] = [];
                    } else {
                      this.cljsFormData[i] = "";
                    }
                  }
                  this.cljsFormData.cljsBCEntity = [
                    { cllb: "", clmc: "", clfs: "", sfxyszh: "1" }
                  ];
                  this.multipleSelectionAll = [];
                  this.flag = false;
                  this.dw_flag = false;
                  this.dw_flag1 = false;
                  this.total = "";
                } else {
                  data.cljsByDwEntities = [];
                  this.$alert(_res.message, {
                    center: true,
                    confirmButtonText: "确定"
                  });
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    checkVal() {
      // 下拉title
      this.cljsFormData.cljsBCEntity.filter(item => {
        var dmid = item.cllb;
        this.cllbTitle = this.cllb_dmb.find(item => {
          return dmid == item.dmid;
        }).dmmc;
      });
    },
    //模糊查询
    querySearch2(queryString, cb) {
      var list = [{}];
      $({
        url: "/dafw/cxdw",
        method: "get",
        params: {
          dwmc: this.formData.dwmc
        }
      }).then(res => {
        var _data = res.returnData;
        if (+_data.executeResult == 1) {
          if (_data.dws) {
            if (_data.dws.length == 0) {
              this.$message.error("没有单位信息！");
            }
            for (let i of _data.dws) {
              i.value = i.dwmc; //将想要展示的数据作为value
            }
            list = _data.dws;
            cb(list);
          }
        }
      });
    },
    //模糊查询
    querySearch(queryString, cb) {
      var list = [{}];
      $({
        url: "/dafw/cxdw",
        method: "get",
        params: {
          dwmc: this.Search_formData.dwmc
        }
      }).then(res => {
        var _data = res.returnData;
        if (+_data.executeResult == 1) {
          if (_data.dws) {
            if (_data.dws.length == 0) {
              this.$message.error("没有单位信息！");
            }
            for (let i of _data.dws) {
              i.value = i.dwmc; //将想要展示的数据作为value
            }
            list = _data.dws;
            cb(list);
          }
        }
      });
    },
    handleSelect(item) {
      this.Search_formData.dwid = item.dwid;
      this.Search_formData.dwmc = item.dwmc;
    },
    handleSelect1(item) {
      this.formData.dwid = item.dwid;
      this.formData.dwmc = item.dwmc;
    },
    on_blur() {
      this.Search_formData.dwid ? "" : (this.Search_formData.dwmc = "");
      this.Search_formData.dwmc ? "" : (this.Search_formData.dwid = "");
    },
    on_blur2() {
      if (!this.formData.dwid) {
        this.formData.dwmc = "";
      }
      if (!this.formData.dwmc) {
        this.formData.dwid = "";
      }
    },
    SearchCurrentChange(val) {
      //查询分页方法
      this.Search_submit(val);
    },
    // 查询tab
    Search_submit(num, flag) {
      this.$refs.Search_form.validate(valid => {
        if (valid)
          if (flag == 1) {
            this.Search_page = deepClone(this.Search_formData);
          }
        const data = this.Search_page;
        data.pageNum = num || this.pageNum;
        var _this = this;
        getData(
          "/dafw/cljsxxcx",
          data,
          function(res) {
            // 判断上传显示
            _this.seach_left = false;
            _this.Search_tableData = res.returnData.cljsxx;
            _this.totals = res.rowsCount;
            _this.secondFlag = true;
            _this.totals == 0
              ? (_this.search_total = false)
              : (_this.search_total = true);
            for (var i = 0; i < res.returnData.cljsxx.length; i++) {
              //序号赋值
              _this.Search_tableData[i].xh = parseInt(res.startNum) + i;
            }
          },
          function() {
            _this.search_total = false;
            _this.secondFlag = false;
          }
        );
      });
    },
    Search_dialog(arr) {
      //查询查看弹框
      if (arr) {
        this.tableData_alert = arr;
        for (var i = 0; i < arr.length; i++) {
          //序号赋值
          this.tableData_alert[i].xh = 1 + i;
        }
        this.table_flag = true;
      }
    },
    form_reset() {
      //重置
      // this.$refs["search_form"].resetFields();
      this.formData = {};
      this.Search_formData = { dazt: "1" };
    },
    handleClick(tab, event) {
      //tabs切换
      if (this.activeName == "first") {
        this.flag = false;
        this.dw_flag = false;
        this.dw_flag1 = false;
        this.total = "";
        this.formData = {};
      } else if (this.activeName == "second") {
        this.secondFlag = false;
        this.gh_total = false;
        this.search_total = false;
        this.Search_formData = { dazt: "1" };
      }
    },
    setSelectRow() {
      // 设置选中的方法
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let selectAllIds = [];
      let that = this;
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.multipleTable.clearSelection();
      for (var i = 0; i < this.dw_tableData.length; i++) {
        if (selectAllIds.indexOf(this.dw_tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.multipleTable.toggleRowSelection(
            this.dw_tableData[i],
            true
          );
        }
      }
    },
    changePageCoreRecordData() {
      // 记忆选择核心方法
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直借取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.dw_tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 跳转个人页面
    see(row) {
      this.$router.push({ path: "/dagl/personal", query: { grbh: row } });
    }
  },
  created() {
    this.getdmb();
  }
};
</script>

<style scoped lang="scss">
.ajh_div .el-table {
  padding: 0;
  margin: 0 50px;
  width: 80% !important;
}

.cljsjl {
  padding-bottom: 30px;
  .el-row {
    padding: 0;
  }
  .el-col {
    height: 48px;
    line-height: 48px;
  }
}
.btn_parent {
  margin-top: 10px;
  text-align: center;
}
.zmxx_btn {
  width: 116px;
  height: 32px;
  border: none;
  background: -webkit-linear-gradient(left, #0081e6, #39b5fd);
  color: #fff;
  border-radius: 4px;
}
.formData {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
}
.cljsFormData {
  padding: 20px;
}
.BaseFormData {
  margin: 15px 20px 0 20px;
}
.table_form {
  padding: 10px 20px;
}
.table_tit {
  border-bottom: 1px solid #015cb1;
  div {
    color: #015cb1;
    font-weight: 900;
    text-align: center;
    font-size: 14px;
  }
}
.row_class,
.row_class2 {
  background-color: #ffffff;
  color: #606266;
  font-size: 14px;
  text-align: center;
  > .el-col {
    line-height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.row_class2 {
  background: #edf5ff;
}
.Baseclass,
.HasColor {
  width: 53%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.HasColor {
  color: #1488f5;
  cursor: pointer;
}
.ajh_div {
  margin: 10px 0;
}
.row_class .el-form-item,
.row_class2 .el-form-item {
  margin-top: 3px;
}

.title_wrap {
  height: 48px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 48px;
  margin: 0 20px;
  .title_r {
    width: 73px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin: 10px 0;
    float: right;
    color: #0081e6;
    cursor: pointer;
  }
  .gzxxWg_btn {
    background: linear-gradient(
      90deg,
      rgba(0, 129, 230, 1),
      rgba(57, 181, 253, 1)
    );
    border-radius: 12px;
    color: #fff;
    .iconfont {
      position: relative;
      top: 2px;
    }
  }
}
.table_row {
  padding: 0;
  border-bottom: 1px solid #015cb1;
  .el-col {
    line-height: 48px;
  }
}
.el-table__header {
  background: #39b5fd;
}
.page_style {
  margin: 20px 0;
}
.table_div {
  padding: 0 20px;
}
.searchResult {
  position: relative;
}
.totles {
  position: absolute;
  left: 150px;
  top: 16px;
}
.Baseclass {
  width: 53%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.MsgFlag {
  text-align: center;
  margin: 20px;
  padding: 6px;
  color: #9a9999;
  font-size: 18px;
}
.upload_div {
  margin: 30px 20px;
}
</style>
