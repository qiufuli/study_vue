<template>
  <div class="dawj clwj">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px;height:48px;background: #EAF5FF;">
      <el-breadcrumb-item>
        <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
      </el-breadcrumb-item>
      <el-breadcrumb-item style="line-height: 52px;">材料外借/归还</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="base-content dawj">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="材料外借" name="first">
          <el-form ref="search_form" :model="formData" :rules="rules" class="formData">
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm">
                  <el-input v-model="formData.sfzhm" :title="formData.sfzhm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm">
                  <el-input v-model="formData.xm" :title="formData.xm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档编号：" prop="cdbh">
                  <el-input v-model="formData.cdbh" :title="formData.cdbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="btn_parent">
                <el-button type="primary" size="medium" @click="search" class="base_btn">查询</el-button>
                <el-button
                  size="medium"
                  class="base_btn"
                  style="margin-left:20px;"
                  @click="form_reset"
                  plain
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
              <el-form ref="form" :model="wjryxx" class="BaseFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名：">
                        <!-- @click="see(wjryxx.grbh)" -->
                        <!-- class="base_input_view HasColor" -->
                      <span
                        class="base_input_view"
                        :title="wjryxx.xm"
                      >{{wjryxx.xm}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别：">{{wjryxx.xb == 1? '男':wjryxx.xb == 2?'女':''}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="存档日期：">
                      <input v-model="wjryxx.cdrq" readonly class="base_input_view Baseclass" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="委托存档单位：">
                        <!-- @click="see(wjryxx.grbh)" -->
                      <span
                        class="base_input_view"
                        :title="wjryxx.dwmc"
                      >{{wjryxx.dwmc}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在位置：">
                      <input v-model="wjryxx.dacfwz" readonly class="base_input_view Baseclass" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 外借信息 -->
          <div class="base-content_public" v-if="flag">
            <div>
              <my-bread level1="iconjichuxinxi" level2="外借信息"></my-bread>
            </div>
            <div class="wjxx_content">
              <el-form ref="mes_form" :rules="rules1" :model="wjxxFormData" class="wjxxFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="外借原因：" prop="wjyy" required>
                      <el-select
                        v-model="wjxxFormData.wjyy"
                        value-key="value"
                        @change="checkVal"
                        :title="wjyyTitle"
                      >
                        <el-option
                          :label="item.dmmc"
                          :value="item.dmid"
                          v-for="item in wjyy_dmb"
                          :key="item.dmid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="原因说明：" prop="yysm">
                      <el-input v-model="wjxxFormData.yysm"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="借往单位：" prop="jwdw" required>
                      <el-input v-model="wjxxFormData.jwdw"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="经办单位：" prop="jbdw" required>
                      <el-input v-model="wjxxFormData.jbdw"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="经办人：" prop="jbr">
                      <el-input v-model="wjxxFormData.jbr" class="jbr" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="借用人：" prop="jdr" required>
                      <el-input v-model="wjxxFormData.jdr"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证件类型：" prop="jdrzjlx" required>
                      <el-select
                        v-model="wjxxFormData.jdrzjlx"
                        value-key="value"
                        @change="jdrzjlx_checkVal"
                      >
                        <el-option
                          :label="item.dmmc"
                          :value="item.dmid"
                          v-for="item in jdrzjlx_dmb"
                          :key="item.dmid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证件号：" prop="jdrzjlhm" required>
                      <el-input v-model="wjxxFormData.jdrzjlhm" @blur="jdr()"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系电话：" prop="lxdh">
                      <el-input v-model="wjxxFormData.lxdh"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="借用日期：" prop="jdrq">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="wjxxFormData.jdrq"
                        :picker-options="pickerOptions0"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="预计归还日期：" prop="yjghrq">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="wjxxFormData.yjghrq"
                        :picker-options="pickerOptions1"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="备注：" prop="bz">
                      <el-input v-model="wjxxFormData.bz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 外借记录 -->
          <div class="base-content_public" v-if="flag">
            <div class="zmxx_content cljsjl">
              <!-- :header-cell-style="{background:'#27B6C7'}" -->
              <div class="table_form">
                <el-table
            :data="tableData6"
            :span-method="arraySpanMethod"
            border
            ref="multipleTable"
            style="width: 100%; margin-top: 20px"
            @selection-change="handleSelectionChange_wj"
            @select="onTableSelect"
            v-if="flag"
          >
            <el-table-column prop="clh" width="50" label="类号"></el-table-column>
            <el-table-column min-width="15%" label="类别">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.region}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" min-width="20%" label="小类名称"></el-table-column>
            <el-table-column prop="clmc" min-width="30%" label="材料名称"></el-table-column>
            <!-- <el-table-column prop="time" min-width="10%" label="制成时间"></el-table-column> -->
            <el-table-column prop="page" width="50" label="页数"></el-table-column>
            <el-table-column label="操作" width="50" type="selection" :selectable='checkboxT'></el-table-column>
          </el-table>
          
                <el-row style="margin-top: 10px;">
                  <div class="btn_parent">
                    <el-button type="primary" size="medium" @click="save" class="base_btn">保存</el-button>
                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 材料外借 -->
        <el-tab-pane label="材料归还" name="second">
          <el-form ref="dagh_form" :model="dagh_formData" :rules="rules2" class="formData">
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm">
                  <el-input v-model="dagh_formData.sfzhm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm">
                  <el-input v-model="dagh_formData.xm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档编号：" prop="cdbh">
                  <el-input v-model="dagh_formData.cdbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="借用日期开始：" prop="jdkssj">
                  <el-date-picker
                    v-model="dagh_formData.jdkssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="借用日期结束：" prop="jdjssj">
                  <el-date-picker
                    v-model="dagh_formData.jdjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外借原因：" prop="wjyy">
                  <el-select
                    v-model="dagh_formData.wjyy"
                    value-key="value"
                    :title="wjyysTitle"
                    @change="checkVals"
                  >
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in wjyy_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="借用人：" prop="jdr">
                  <el-input v-model="dagh_formData.jdr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="btn_parent">
                <el-button type="primary" size="medium" @click="gh_search(1, 1)" class="base_btn">查询</el-button>
                <el-button
                  size="medium"
                  class="base_btn"
                  style="margin-left:20px;"
                  @click="form_reset"
                >重置</el-button>
              </div>
            </el-row>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-if="gh_flag"
          >
            <!-- @sort-change="sortChange1" -->
          <!-- 姓名，身份证号码，,cllb,lbmc,clmc,jdrq,clzt -->
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="xh" label="序号" width="50" align="center"></el-table-column>
            <el-table-column label="姓名" min-width="10%" align="center">
              <template slot-scope="scope">{{ scope.row.xm }}</template>
            </el-table-column>
            <el-table-column prop="sfzhm" label="身份证号码" min-width="30%" align="center"></el-table-column>
            <!-- <el-table-column prop="cdbh" label="存档编号" min-width="20%" align="center"></el-table-column> -->
            <el-table-column prop="cllbmc" label="材料类别" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="lbmc" label="类别名称" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="clmc" label="材料名称" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="jdrq" label="外借日期" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="wjyymc" label="外借原因" min-width="14%" align="center"></el-table-column>
            <el-table-column prop="jdr" label="外借人" min-width="15%" align="center"></el-table-column>
          </el-table>
          <el-row class="btn_parent page_style" v-if="gh_total">
            <el-pagination
              @current-change="gh_handleCurrentChange"
              :current-page="gh_pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="gh_total"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
          <el-form
            ref="dagh_forms"
            :model="daghForm"
            :rules="rules3"
            class="formData"
            v-if="gh_flag"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="归还日期：" prop="ghrq" required>
                  <el-date-picker
                    v-model="daghForm.ghrq"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归还人：" prop="ghr" required>
                  <el-input v-model="daghForm.ghr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：" prop="ghrlxdh" required>
                  <el-input v-model="daghForm.ghrlxdh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="btn_parent">
                <el-button
                  type="primary"
                  size="medium"
                  @click="gu_btn"
                  class="base_btn"
                  style="cursor: pointer;"
                >归还</el-button>
              </div>
            </el-row>
          </el-form>
        </el-tab-pane>
        <!-- 外借归/还查询 -->
        <el-tab-pane label="外借/归还查询" name="three">
          <el-form
            ref="Search_forms"
            :model="Search_formData"
            :rules="Search_rules"
            class="formData"
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
                <el-form-item label="外借日期开始：" prop="jdkssj">
                  <el-date-picker
                    v-model="Search_formData.jdkssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="Search_ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外借日期结束：" prop="jdjssj">
                  <el-date-picker
                    v-model="Search_formData.jdjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="Search_jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="材料状态：" prop="clzt">
                  <el-select v-model="Search_formData.clzt" placeholder="请选择材料状态">
                    <el-option label="外借" value="1"></el-option>
                    <el-option label="归还" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="档案状态：" prop="dazt">
                  <el-select v-model="Search_formData.dazt">
                    <el-option label="当前" value="1"></el-option>
                    <el-option label="转出" value="2"></el-option>
                    <el-option label="全部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="归还日期开始：" prop="jdkssj">
                  <el-date-picker
                    v-model="Search_formData.ghkssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="Search_ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归还日期结束：" prop="jdjssj">
                  <el-date-picker
                    v-model="Search_formData.ghjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="Search_jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row>
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
            </el-row>
          </el-form>
          <!-- 证明查询信息 -->
          <div class="base-content_public" style="margin-top: 10px;" v-if="threeFlag">
            <div class="searchResult">
              <my-bread level1="iconzaitu" level2="查询结果"></my-bread>
              <p class="totles">共{{wjgh_total}}条</p>
            </div>
            <div class="table_div">
              <el-table :data="Search_tableData" stripe @sort-change="sortChange" style="width: 100%">
                <el-table-column prop="xh" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="sfzhm" label="身份证号码" sortable='custom' min-width="15%" align="center"></el-table-column>
                <el-table-column prop="xm" label="姓名" sortable='custom' min-width="7%" align="center"></el-table-column>
                <el-table-column prop="cllbmc" label="材料类别" sortable='custom' min-width="10%" align="center"></el-table-column>
                <el-table-column prop="clmc" label="材料名称" sortable='custom' min-width="12%" align="center"></el-table-column>
                <el-table-column prop="jdrq" label="外借日期" sortable='custom' min-width="10%" align="center"></el-table-column>
                <el-table-column prop="jdczymc" label="外借操作员" sortable='custom' min-width="11%" align="center"></el-table-column>
                <el-table-column prop="ghrq" label="归还日期" sortable='custom' min-width="10%" align="center"></el-table-column>
                <el-table-column prop="ghczymc" label="归还操作员" sortable='custom' min-width="11%" align="center"></el-table-column>
                <el-table-column prop="clztmc" label="材料状态" sortable='custom' min-width="10%" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
          <el-row class="btn_parent page_style" v-if="wjgh_total">
            <el-pagination
              @current-change="SearchCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="wjgh_total"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import "@/common/scss/common.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getData, deepClone } from "@/common/js/common";
export default {
  data() {
    return {
      pageSize: 12,
      gh_total: "",
      wjgh_total: "",
      pageNum: 1,
      gh_pageNum: 1,
      form_data_page: {},
      formData: {
        sfzhm: "",
        xm: "",
        cdbh: ""
      },
      rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('64, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('64, "full", "存档编号", true') }] //存档编号
      },
      wjryxx: {},
      tableData6: [],
      multipleSelection_wj:[],
      cdid: "",
      dlrq: "",
      wjxxFormData: {
        wjyy: "",
        yysm: "",
        jdrq: "",
        yjghrq: "",
        jwdw: "",
        jbdw: "",
        jdrzjlx: "",
        jdrzjlhm: "",
        jdr: "",
        lxdh: "",
        bz: "",
        jbr: ""
      },
      rules1: {
        wjyy: [{ validator: validator('2, "number", "外借原因", false') }], //外借原因
        yysm: [{ validator: validator('258, "full", "原因说明", true') }], //原因说明
        jdrq: [{ validator: validator('10, "full", "借档日期", false') }], //借档日期
        yjghrq: [{ validator: validator('10, "full", "预计归还日期", true') }], //预计归还日期
        jwdw: [{ validator: validator('128, "full", "借往单位", false') }], //借往单位
        jbdw: [{ validator: validator('128, "full", "经办单位", false') }], //经办单位
        jdr: [{ validator: validator('32, "full", "借用人", false') }], //借档人
        // jbr: [{ validator: validator('32, "full", "经办人", false') }], //借档人
        jdrzjlx: [{ validator: validator('32, "full", "证件类型", false') }], //借档人
        lxdh: [{ validator: validator('32, "phone", "联系电话", true') }], //联系电话
        bz: [{ validator: validator('258, "full", "备注", true') }], //备注
        jdrzjlhm: [
          { validator: validator('18, "full", "证件号码", false') }
        ] //证件号
        // jgz: [{ validator: validator('18, "jgz", "军官证证件号", false') }], //军官证
        // hz: [{ validator: validator('18, "hz", "护照证件号", false') }], //护照
        // Jgz: [{ validator: validator('18, "jgz", "警官证证件号", false') }], //警官证
        // qt: [{ validator: validator('18, "full", "其他证件号", false') }] //其他
      },
      rules2: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], // sfzhm	选填	18,"full","身份证号码",true
        xm: [{ validator: validator('50, "full", "姓名", true') }], // xm	选填	50,"full","姓名",true
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }], // cdbh	选填	20,"full","存档编号",true
        jdkssj: [{ validator: validator('10, "full", "借用开始时间", true') }], // jdkssj	选填	10,"full","借档开始时间",true
        jdjssj: [{ validator: validator('10, "full", "借用结束时间", true') }], // jdjssj	选填	10,"full","借档结束时间",true
        wjyy: [{ validator: validator('2, "full", "外借原因", true') }], // wjyy	选填	2,"full","外借原因",true
        jdr: [{ validator: validator('32, "full", "借用人", true') }] // jdr	选填	32,"full","借档人",true
      },
      rules3: {
        ghrq: [{ validator: validator('10, "full", "归还日期", false') }], // 可有字段 10,"rq","归还日期",true
        ghr: [{ validator: validator('32, "full", "归还人", false') }], // "ghr"：32,"full","归还人",true
        ghrlxdh: [{ validator: validator('32, "phone", "联系电话", false') }] // "ghrlxdh"32,"lxdh","归还人联系电话",true
      },
      wjyyTitle: "",
      flag: false,
      gh_flag: false,
      threeFlag: false,
      wjyy_dmb: "",
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > new Date(this.fwqsj).getTime();
        }
      },
      pickerOptions0: {
        disabledDate: time => {
          let endDateVal = this.wjxxFormData.yjghrq;
          if (endDateVal) {
            return (
              time.getTime() < new Date(this.fwqsj).getTime() - 8.64e7 ||
              time.getTime() > new Date(endDateVal).getTime()
            );
          } else {
            return time.getTime() < new Date(this.fwqsj).getTime() - 8.64e7;
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          let beginDateVal = this.wjxxFormData.jdrq;
          if (beginDateVal) {
            return (
              time.getTime() < new Date(this.fwqsj).getTime() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return time.getTime() < new Date(this.fwqsj).getTime() - 8.64e7;
          }
        }
      },
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.dagh_formData.jdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.dagh_formData.jdkssj;
          if (beginDateVal) {
            return (
              time.getTime() > new Date(this.fwqsj) ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },

      Search_ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.dagh_formData.jdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },
      Search_jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.dagh_formData.jdkssj;
          if (beginDateVal) {
            return (
              time.getTime() > new Date(this.fwqsj).getTime() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },
      Search_formData: { clzt: "1" },
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], // sfzhm	选填	18,"full","身份证号码",true
        xm: [{ validator: validator('50, "full", "姓名", true') }], // xm	选填	50,"full","姓名",true
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }], // cdbh	选填	20,"full","存档编号",true
        jdkssj: [{ validator: validator('10, "full", "外借日期开始", true') }], // cdbh	选填	20,"full","存档编号",true
        jdjssj: [{ validator: validator('10, "full", "外借日期结束", true') }], // cdbh	选填	20,"full","存档编号",true
        // dazt: [{ validator: validator('1, "full", "存档状态", true') }], // cdbh	选填	20,"full","存档编号",true
        jdkssj: [{ validator: validator('10, "full", "归还日期开始", true') }], // cdbh	选填	20,"full","存档编号",true
        jdjssj: [{ validator: validator('10, "full", "归还日期结束", true') }], // cdbh	选填	20,"full","存档编号",true
        clzt: [{ validator: validator('1, "full", "材料状态", true') }] // cdbh	选填	20,"full","存档编号",true
      },
      Search_tableData: [],
      dwxzTitle: "",
      dwxz_dmb: [],
      jdrzjlx_dmb: [],
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: "wjid", // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
      activeName: "first",
      BaseFormData: {},
      table_data: [{ xh: "123", sa: "1" }, { xh: "325", sa: "1" }],
      dagh_formData: { sfzhm: "" },
      table_form: {}, //查看弹框表单数据
      daghForm: { ghrq: '' },
      formLabelWidth: "110px",
      tableData: [],
      fwqsj: "",
      totals: "0",
      wjyysTitle: "",
      zjlx: ""
    };
  },
  beforeMount() {
    this.fwqsj = JSON.parse(sessionStorage.getItem("czyInfo")).xtsj;
  },
  methods: {
    // 禁用列表的select
    checkboxT(row,index){
      if (row.clzt == 1) {
        return false
      }else{
        return true
      }
    },
    // 归还列表排序
//      sortChange1(column, prop, order) {
//       // if (column.prop == 'cllbmc') {
//       //   column.prop = 'cllb'
//       // } else if (column.prop == 'jdczymc') {
//       //   column.prop = 'jdczyid'
//       // } else if (column.prop == 'ghczymc') {
//       //   column.prop = 'ghczyid'
//       // } else if (column.prop == 'clztmc') {
//       //   column.prop = 'clzt'
//       // }
//       var data = this.form_data_page;
//           var _this = this;
//           getData(
//             "/dafw/getClghxx",
//             data,
//             function(res) {
//               _this.gh_flag = true;
//               if (res.returnData.clghxxs) {
//                 setTimeout(() => {
//                   _this.setSelectRow();
//                 }, 200);
//                 _this.tableData = res.returnData.clghxxs;
//                 _this.gh_total = res.rowsCount;
//                 _this.daghForm.ghrq = JSON.parse(sessionStorage.getItem("czyInfo")).xtsj;
//                 for (var i = 0; i < res.returnData.clghxxs.length; i++) {
//                   //序号赋值
//                   _this.tableData[i].xh = res.startNum - 0 + i;
//                 }
//               } else {
//                 _this.tableData = [];
//               }
//             },
//             function() {
//               _this.gh_flag = false;
//               _this.gh_total = false;
//             }
//           );
//       },
     // 列表排序
     sortChange(column, prop, order) {
      if (column.prop == 'cllbmc') {
        column.prop = 'cllb'
      } else if (column.prop == 'jdczymc') {
        column.prop = 'jdczyid'
      } else if (column.prop == 'ghczymc') {
        column.prop = 'ghczyid'
      } else if (column.prop == 'clztmc') {
        column.prop = 'clzt'
      }
      this.Search_page.prop = column.prop
      this.Search_page.order = column.order
      var _this = this;
        getData(
          "/dafw/getCljhxx",
          this.Search_page,
          function(res) {
            _this.Search_tableData = res.returnData.cljhxx;
            _this.wjgh_total = res.rowsCount;
            _this.threeFlag = true;
            for (var i = 0; i < res.returnData.cljhxx.length; i++) {
              //序号赋值
              _this.Search_tableData[i].xh = parseInt(res.startNum) + i;
            }
          },
          function() {
            _this.wjgh_total = false;
            _this.threeFlag = false;
          }
        );
      },
    // 处理表格数据
    has_dealTable() {
      var getDate = []; // 存储新表格数据
      var typeIndex = [0]; // 保存id,地区需要合并的值
      var listsIndex = [0];
      var nameIndex = [0]; // 保存类型需要合并的值
      var listIndex = [0]; // 保存类型需要合并的值
      var a; // id,地区需要合并的行是所有类型的长度
      this.tableData2.forEach((v, index) => {
        if (v.type && v.type.length) {
          a = 0;
          v.type.forEach((subV, i, typeData) => {
            if (subV.sortList && subV.sortList.length) {
              subV.sortList.forEach((ss, k, data) => {
                if (k === data.length - 1) {
                  typeIndex.push(data.length); // 把每一个类型下面数据长度存起来
                  a += data.length; // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    nameIndex.push(a); // 类型循环完成后把数据长度存起来
                  }
                }
                getDate.push({
                  id: v.id,
                  clh: ss.clh,
                  region: v.region,
                  type: subV.sortName,
                  clmc: ss.clmc,
                  time: ss.clzcrq,
                  page: ss.clys,
                  clmlid: ss.clmlid,
                  clzt: ss.clzt,
                  cllb: ss.cllb
                });
              });
            }
          });
        }
      });
      let k = 0;
      let t = 0;
      let m = 0;
      nameIndex.forEach((v, i, nameArr) => {
        if (nameArr[i + 1]) {
          getDate[k].nameIndex = nameArr[i + 1];
          k += nameArr[i + 1];
        }
      });

      typeIndex.forEach((v, i, typeArr) => {
        if (typeArr[i + 1]) {
          getDate[t].typeIndex = typeArr[i + 1];
          t += typeArr[i + 1];
        }
      });
      this.tableData6 = getDate;
    },
    // 表格合并方法
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.nameIndex) {
          // 如果有值,说明需要合并
          return [row.nameIndex, 1];
        } else return [0, 0];
      }
      if (columnIndex === 2) {
        if (row.typeIndex) {
          return [row.typeIndex, 1];
        } else return [0, 0];
      }
    },
    dealTable(data) {
      var _arr = [];
      var _all_arr = [];
      data.forEach((v, k) => {
        if (data[k + 1]) {
          if (data[k].lbid == data[k + 1].lbid) {
            _arr.push(data[k]);
          } else {
            _arr.push(data[k]);
            _all_arr.push(_arr);
            _arr = [];
          }
        } else {
          if (data[k - 1].lbid == data[k].lbid) {
            _arr.push(data[k]);
            _all_arr.push(_arr);
          } else {
            _all_arr.push(_arr);
            _arr = [];
            _arr.push(data[k]);
            _all_arr.push(_arr);
          }
        }
      });
      let arrays = [];
      let Newarrays = [];
      var BigArr = [];
      var lastArr = [];
      for (var i = 0; i < _all_arr.length; i++) {
        let finalArr = [];
        finalArr = fl(finalArr, _all_arr[i]);
        finalArr.reverse();
        if (finalArr.length > 1) {
          //有小类
          var NewArr = [
            { id: finalArr[0][0].lbid, region: finalArr[0][0].lbmc, type: [] }
          ];
          for (var j = 0; j < finalArr.length; j++) {
            var type_obj = { sortName: "", sortList: [] };
            type_obj.sortName = finalArr[j][0].cllbmc;
            finalArr[j].map(item => {
              return type_obj.sortList.push(item);
            });
            NewArr[0].type.push(type_obj);
          }
          BigArr.push(NewArr);
        } else {
          //没有小类
          var noMinArr = [
            {
              id: finalArr[0][0].lbid,
              region: finalArr[0][0].lbmc,
              type: [{ sortName: finalArr[0][0].cllbmc, sortList: [] }]
            }
          ];
          finalArr.forEach((item, i) => {
            item.forEach(items => {
              noMinArr[0].type[0].sortList.push(items);
            });
          });
          BigArr.push(noMinArr);
        }
      }
      BigArr.map(item => {
        return lastArr.push(item[0]);
      });
      this.tableData2 = lastArr;
      this.has_dealTable();
      function fl(finalArr, arr) {
        let sameArr = [];
        let difArr = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[0].cllb == arr[i].cllb) {
            sameArr.push(arr[i]);
          } else {
            difArr.push(arr[i]);
          }
        }
        if (difArr.length > 1) {
          fl(finalArr, difArr);
        }
        if (difArr.length == 1) {
          finalArr.push(difArr);
        }
        finalArr.push(sameArr);
        return finalArr;
      }
    },
      //判断选中状态
    onTableSelect(rows, row) {
      this.selected = rows.length && rows.indexOf(row) !== -1;
      // console.log("selected", this.selected); // true就是选中，0或者false是取消选中
    },
    gh_handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.gh_search(val);
    },
      //代码表
    getdmb() {
      var _this = this;
      const data = { table_name: "szdayy_d_dawjyy" };
      getData("/dmbgl/dmblbCx", data, function(res) {
        _this.wjyy_dmb = res.returnData.dmblb;
      },function(res){
      });
      const jdrzjlx_data = { table_name: "szdayy_d_zjlx" };
      getData("/dmbgl/dmblbCx", jdrzjlx_data, function(res) {
        _this.jdrzjlx_dmb = res.returnData.dmblb;
      },function(res){
      });
    },
      //材料外借查询
    search() {
      this.$refs["search_form"].validate(valid => {
        if (valid) {
          if (this.formData.sfzhm || this.formData.cdbh || this.formData.xm) {
            var data = this.formData;
            $({
              url: "/dafw/getClwjxx",
              method: "get",
              params: data
            }).then(res => {
              var _data = res.returnData;
              if (_data.executeResult == 1) {
                this.wjryxx = _data.ryjbxx;
                this.tableData = _data.damlxx;
                   this.dealTable(this.tableData);
                this.flag = true;
                this.wjxxFormData = {
                  wjyy: "",
                  yysm: "",
                  jdrq: "",
                  yjghrq: "",
                  jwdw: "",
                  jbdw: _data.ryjbxx.jbdw,
                  jdrzjlx: "",
                  jdrzjlhm: "",
                  jdr: "",
                  lxdh: "",
                  bz: "",
                  jbr: _data.ryjbxx.jbr
                };
                this.wjxxFormData.jdrq = _data.ryjbxx.dqrq;
                this.cdid = _data.ryjbxx.cdid;
              } else {
                this.flag = false;
                this.$message({
                      type: "success",
                      center: true,
                      message: _res.message
                    });
                this.flag = false;
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
    checkLook(item) {
      this.table_form = item;
    },
      // 档案外借保存
    save() {
      this.$refs["mes_form"].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.wjxxFormData.cdid = this.cdid;
              this.wjxxFormData.cljhvb = this.multipleSelection_wj
              $({
                url: "/dafw/wjclxxSave",
                method: "post",
                data: this.wjxxFormData
              }).then(res => {
                var _data = res.returnData;
                if (+_data.executeResult == 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.flag = false;
                  // this.$refs["mes_form"].resetFields();
                } else {
                  this.$message({
                      type: "success",
                      center: true,
                      message: _res.message
                    });
                }
              });
            })
            .catch(() => {});
        } else {
          this.$alert("外借信息不正确!", {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    
    },
     //归还查询
    gh_search(num, flag) {
      this.$refs["dagh_form"].validate(valid => {
        if (valid) {
          if (flag == 1) {
            this.form_data_page = deepClone(this.dagh_formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || this.pageNum;
          var _this = this;
          getData(
            "/dafw/getClghxx",
            data,
            function(res) {
              _this.gh_flag = true;
              if (res.returnData.clghxxs) {
                setTimeout(() => {
                  _this.setSelectRow();
                }, 200);
                _this.tableData = res.returnData.clghxxs;
                _this.gh_total = res.rowsCount;
                _this.daghForm.ghrq = JSON.parse(sessionStorage.getItem("czyInfo")).xtsj;
                for (var i = 0; i < res.returnData.clghxxs.length; i++) {
                  //序号赋值
                  _this.tableData[i].xh = res.startNum - 0 + i;
                }
              } else {
                _this.tableData = [];
              }
            },
            function() {
              _this.gh_flag = false;
              _this.gh_total = false;
            }
          );
        }
      });
    },
      //select外借原因
    checkVal() {
      this.wjyyTitle = this.wjyy_dmb.find(item => {
        return item.dmid == this.wjxxFormData.wjyy;
      }).dmmc;
    },
    jdrzjlx_checkVal(item) {
      //接档人证件类型
      if (item == "01") {
        this.zjlx = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      } else {
        this.zjlx = /^[^\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ ]*$/;
      }
      // else if (item == "02") {
      //   this.zjlx = /^[a-zA-Z0-9]{7,21}$/; //军官证
      // } else if (item == "03") {
      //   this.zjlx = /^[a-zA-Z0-9]{3,21}$/; //护照
      // } else if (item == "04") {
      //   this.zjlx = /^[a-zA-Z0-9]{7,21}$/; //警官证
      // } else if (item == "05") {
      //   this.zjlx = ""; //其他
      // }

      this.wjxxFormData.jdrzjlhm = "";
    },
    jdr() {
      if (this.wjxxFormData.jdrzjlx == "") {
        this.$alert("请选择证件类型", {
          center: true,
          confirmButtonText: "确定"
        });
        this.wjxxFormData.jdrzjlhm = "";
        return false;
      }
      if (this.wjxxFormData.jdrzjlhm != "") {
        var result = this.zjlx.test(this.wjxxFormData.jdrzjlhm);
        if (result != true) {
          this.$alert("证件号错误", {
            center: true,
            confirmButtonText: "确定"
          });
          return false;
        }
      }
    },
    handleSelectionChange(val) {
      //表格复选数据
      this.multipleSelection = val;
    },
    handleSelectionChange_wj(val) {
      //表格复选数据
      this.multipleSelection_wj = val;
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
      for (var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
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
      this.tableData.forEach(row => {
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
      //归还
    gu_btn() {
      var _this = this;
      this.$refs["dagh_forms"].validate(valid => {
        if (this.multipleSelection.length != 0) {
          if (valid) {
            this.$confirm("确定要归还吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            })
              .then(() => {
                var data = this.daghForm;
                data.wjid = this.multipleSelection[0].wjid
                data.cljhvb = this.multipleSelection.map(item => {
                  return { clid: item.clid,jdrq:item.jdrq };
                });
                $({
                  url: "/dafw/clghSave",
                  method: "post",
                  data: data
                }).then(res => {
                  const _res = res.returnData;
                  if (+_res.executeResult === 1) {
                    this.$message({
                      type: "success",
                      center: true,
                      message: _res.message
                    });
                    this.daghForm = {};
                    this.$refs["dagh_forms"].resetFields();
                    this.daghForm.ghrq = this.fwqsj;
                    this.gh_total = false;
                    this.gh_flag = false;
                    // this.gh_search(1);
                  } else {
                    this.$message({
                      type: "success",
                      center: true,
                      message: _res.message
                    });
                  }
                });
              })
              .catch(() => {});
          }
        } else {
          this.$alert("选择归还列表！", {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    Search_submit(num, flag) {
      // 外借/归还查询tab
      this.$refs.Search_forms.validate(valid => {
        if (valid)
          if (flag == 1) {
            this.Search_page = deepClone(this.Search_formData);
          }
        const data = this.Search_page;
        data.pageNum = num || this.pageNum;
        var _this = this;
        getData(
          "/dafw/getCljhxx",
          data,
          function(res) {
            _this.Search_tableData = res.returnData.cljhxx;
            _this.wjgh_total = res.rowsCount;
            _this.threeFlag = true;
            for (var i = 0; i < res.returnData.cljhxx.length; i++) {
              //序号赋值
              _this.Search_tableData[i].xh = parseInt(res.startNum) + i;
            }
          },
          function() {
            _this.wjgh_total = false;
            _this.threeFlag = false;
          }
        );
      });
    },
    checkVals() {
      this.wjyysTitle = this.wjyy_dmb.find(item => {
        return item.dmid == this.dagh_formData.wjyy;
      }).dmmc;
    },
    SearchCurrentChange(val) {
      this.Search_submit(val);
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.flag = false;
        this.formData = {};
      } else if (this.activeName == "second") {
        this.gh_flag = false;
        this.gh_total = false;
        this.dagh_formData = {};
      } else if (this.activeName == "three") {
        this.threeFlag = false;
        this.wjgh_total = false;
        this.Search_formData = { clzt: "1" };
      }
    },
    form_reset() {
      //重置
      // this.$refs["search_form"].resetFields();
      this.formData = {};
      this.dagh_formData = {};
      this.Search_formData = { clzt: "1" };
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
.el-table {
  margin: 0;
}
.btn_parent {
  text-align: center;
}
.formData {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px 20px 0 20px;
}
.BaseFormData {
  margin-bottom: 10px;
  padding: 10px 20px 0 20px;
}
.wjxxFormData {
  padding: 10px 20px 0 20px;
}
.table_form {
  padding: 10px 20px;
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
.table_tck .item {
  display: inline-block;
  width: 120px;
  text-align: right;
}
.page_style {
  margin: 20px 0;
}
.el-table .warning-row {
  background: oldlace;
}
.table_tit {
  color: #015cb1;
  font-weight: bold;
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
</style>
