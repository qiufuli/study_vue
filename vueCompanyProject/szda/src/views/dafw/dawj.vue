<template>
  <div class="dawj">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height:48px;height:48px;background: #EAF5FF;"
    >
      <el-breadcrumb-item>
        <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
      </el-breadcrumb-item>
      <el-breadcrumb-item style="line-height: 52px;">档案外借/归还</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="base-content dawj">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="档案外借" name="first">
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
                <el-button type="primary" size="medium" @click="search(1,1)" class="base_btn">查询</el-button>
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
                      <span class="base_input_view" :title="wjryxx.xm">{{wjryxx.xm}}</span>
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
                      <span class="base_input_view" :title="wjryxx.dwmc">{{wjryxx.dwmc}}</span>
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
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="借档人：" prop="jdr" required>
                      <el-input v-model="wjxxFormData.jdr"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="借档人证件类型：" prop="jdrzjlx" required>
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
                    <el-form-item label="借档人证件号：" prop="jdrzjlhm" required>
                      <el-input v-model="wjxxFormData.jdrzjlhm" @blur="jdr()"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="借档人联系电话：" prop="lxdh">
                      <el-input v-model="wjxxFormData.lxdh"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="借档日期：" prop="jdrq">
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
                <el-row>
                  <div class="btn_parent">
                    <el-button type="primary" size="medium" @click="save" class="base_btn">保存</el-button>
                  </div>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 外借记录 -->
          <div class="base-content_public" v-if="flag">
            <div>
              <my-bread level1="iconjichuxinxi" level2="外借记录"></my-bread>
            </div>
            <div class="zmxx_content cljsjl">
              <div class="table_form">
                <el-table :data="wjjlxxs" stripe style="width: 100%">
                  <el-table-column
                    prop="xh"
                    label="序号"
                    min-width="5%"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="jdrq"
                    label="外借日期"
                    min-width="15%"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                  <!-- sortable='custom' -->
                  <el-table-column
                    prop="wjyymc"
                    label="外借原因"
                    min-width="15%"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="jdr"
                    label="借档人"
                    min-width="15%"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="lxdh"
                    label="借档人联系电话"
                    min-width="15%"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="外借明细"
                    min-width="15%"
                    align="center"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <span @click="checkLook(scope.row)" style="cursor:pointer;color: #1488f5;">查看</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="jbr"
                    label="经办人"
                    min-width="15%"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
                <el-row class="btn_parent page_style">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    layout=" prev, pager, next, total, jumper"
                    :total="total"
                    :page-size="pageSize"
                    v-if="this.total !== 0"
                  ></el-pagination>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 弹出框 -->
          <el-dialog title :visible.sync="table_flag" class="table_tck">
            <!-- <el-form :model="table_form"> -->
            <el-row>
              <el-col :span="12">
                <span class="item">外借原因：</span>
                <span style="color: #000;">{{table_form.wjyymc}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item">原因说明：</span>
                <span style="color: #000;">{{table_form.yysm}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="item">借往单位：</span>
                <span style="color: #000;">{{table_form.jwdw}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item">经办单位：</span>
                <span style="color: #000;">{{table_form.jbdw}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="item">借档人：</span>
                <span style="color: #000;">{{table_form.jdr}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item">借档人证件类型：</span>
                <span style="color: #000;">{{table_form.jdrzjmc}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="item">借档人证件号：</span>
                <span style="color: #000;">{{table_form.jdrzjlhm}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item">借档人联系电话：</span>
                <span style="color: #000;">{{table_form.lxdh}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="item">借档日期：</span>
                <span style="color: #000;">{{table_form.jdrq}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item">预计归还日期：</span>
                <span style="color: #000;">{{table_form.yjghrq}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="item">备注：</span>
                <span style="color: #000;">{{table_form.bz}}</span>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </el-dialog>
        </el-tab-pane>
        <!-- 档案归还 -->
        <el-tab-pane label="档案归还" name="second">
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
                <el-form-item label="借档日期开始：" prop="jdkssj">
                  <el-date-picker
                    v-model="dagh_formData.jdkssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="借档日期结束：" prop="jdjssj">
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
                <el-form-item label="借档人：" prop="jdr">
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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="xh" label="序号" min-width="8%" align="center"></el-table-column>
            <el-table-column label="姓名" min-width="10%" align="center">
              <template slot-scope="scope">{{ scope.row.xm }}</template>
            </el-table-column>
            <el-table-column prop="sfzhm" label="身份证号码" min-width="30%" align="center"></el-table-column>
            <el-table-column prop="cdbh" label="存档编号" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="jdrq" label="借档时间" min-width="20%" align="center"></el-table-column>
            <el-table-column prop="wjyymc" label="外借原因" min-width="15%" align="center"></el-table-column>
            <el-table-column prop="jdr" label="借档人" min-width="15%" align="center"></el-table-column>
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
                <el-form-item label="档案状态：" prop="dazt">
                  <el-select v-model="Search_formData.dazt">
                    <el-option label="当前" value="1"></el-option>
                    <el-option label="转出" value="2"></el-option>
                    <el-option label="全部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
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
              <el-col :span="8">
                <el-form-item label="归还状态：" prop="cxfw">
                  <el-select v-model="Search_formData.cxfw" placeholder="请选择归还状态">
                    <el-option label="归还" value="1"></el-option>
                    <el-option label="未归还" value="0"></el-option>
                  </el-select>
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
              <el-table
                :data="Search_tableData"
                stripe
                @sort-change="sortChange"
                style="width: 100%"
              >
                <el-table-column prop="xh" label="序号" min-width="5%" align="center"></el-table-column>
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
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="cdbh"
                  label="存档编号"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="jdrq"
                  label="外借日期"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="jdczymc"
                  label="外借操作员"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="ghrq"
                  label="归还日期"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="ghczymc"
                  label="归还操作员"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
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
      total: 0,
      gh_total: "",
      wjgh_total: "",
      pageNum: 1,
      gh_pageNum: 1,
      form_data_page: {
        prop: "",
        order: ""
      },
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
      wjjlxxs: [],
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
        bz: ""
      },
      rules1: {
        wjyy: [{ validator: validator('2, "number", "外借原因", false') }], //外借原因
        yysm: [{ validator: validator('258, "full", "原因说明", true') }], //原因说明
        jdrq: [{ validator: validator('10, "full", "借档日期", false') }], //借档日期
        yjghrq: [{ validator: validator('10, "full", "预计归还日期", true') }], //预计归还日期
        jwdw: [{ validator: validator('128, "full", "借往单位", false') }], //借往单位
        jbdw: [{ validator: validator('128, "full", "经办单位", false') }], //经办单位
        jdr: [{ validator: validator('32, "full", "借档人", false') }], //借档人
        jdrzjlx: [
          { validator: validator('32, "full", "借档人证件类型", false') }
        ], //借档人
        lxdh: [{ validator: validator('32, "phone", "联系电话", true') }], //联系电话
        bz: [{ validator: validator('258, "full", "备注", true') }], //备注
        jdrzjlhm: [
          { validator: validator('18, "full", "借档人证件号码", false') }
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
        jdkssj: [{ validator: validator('10, "full", "借档开始时间", true') }], // jdkssj	选填	10,"full","借档开始时间",true
        jdjssj: [{ validator: validator('10, "full", "借档结束时间", true') }], // jdjssj	选填	10,"full","借档结束时间",true
        wjyy: [{ validator: validator('2, "full", "外借原因", true') }], // wjyy	选填	2,"full","外借原因",true
        jdr: [{ validator: validator('32, "full", "借档人", true') }] // jdr	选填	32,"full","借档人",true
      },
      rules3: {
        ghrq: [{ validator: validator('10, "full", "归还日期", false') }], // 可有字段 10,"rq","归还日期",true
        ghr: [{ validator: validator('32, "full", "归还人", false') }], // "ghr"：32,"full","归还人",true
        ghrlxdh: [{ validator: validator('32, "phone", "联系电话", false') }] // "ghrlxdh"32,"lxdh","归还人联系电话",true
      },
      wjyyTitle: "",
      table_flag: false,
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
      Search_formData: { dazt: "1" },
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], // sfzhm	选填	18,"full","身份证号码",true
        xm: [{ validator: validator('50, "full", "姓名", true') }], // xm	选填	50,"full","姓名",true
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }], // cdbh	选填	20,"full","存档编号",true
        jdkssj: [{ validator: validator('10, "full", "外借日期开始", true') }], // cdbh	选填	20,"full","存档编号",true
        jdjssj: [{ validator: validator('10, "full", "外借日期结束", true') }], // cdbh	选填	20,"full","存档编号",true
        dazt: [{ validator: validator('1, "full", "存档状态", true') }], // cdbh	选填	20,"full","存档编号",true
        jdkssj: [{ validator: validator('10, "full", "归还日期开始", true') }], // cdbh	选填	20,"full","存档编号",true
        jdjssj: [{ validator: validator('10, "full", "归还日期结束", true') }], // cdbh	选填	20,"full","存档编号",true
        cxfw: [{ validator: validator('1, "full", "归还状态", true') }] // cdbh	选填	20,"full","存档编号",true
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
      daghForm: { ghrq: "" },
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
    // 外借列表排序
    sortChange_wj(column, prop, order) {
      this.form_data_page.prop = column.prop;
      this.form_data_page.order = column.order;
      var _this = this;
      getData(
        "/dafw/dawjjbxxCx",
        this.form_data_page,
        function(res) {
          _this.wjjlxxs = res.returnData.wjjlxxs;
          for (var i = 0; i < res.returnData.wjjlxxs.length; i++) {
            //序号赋值
            _this.wjjlxxs[i].xh = res.startNum - 0 + i;
          }
        },
        function() {}
      );
    },
    // 查询列表排序
    sortChange(column, prop, order) {
      if (column.prop == "jdczymc") {
        column.prop = "jdczyid";
      } else if (column.prop == "ghczymc") {
        column.prop = "ghczyid";
      }
      this.Search_page.prop = column.prop;
      this.Search_page.order = column.order;
      var _this = this;
      getData(
        "/dafw/wjghCx",
        this.Search_page,
        function(res) {
          _this.Search_tableData = res.returnData.daghs;
          _this.wjgh_total = res.rowsCount;
          // _this.threeFlag = true;
          for (var i = 0; i < res.returnData.daghs.length; i++) {
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
    handleCurrentChange(val) {
      // this.xsData(val);
      this.search(val);
    },
    gh_handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.gh_search(val);
    },
    getdmb() {
      //代码表
      var _this = this;
      const data = { table_name: "szdayy_d_dawjyy" };
      getData(
        "/dmbgl/dmblbCx",
        data,
        function(res) {
          _this.wjyy_dmb = res.returnData.dmblb;
        },
        function(res) {}
      );
      const jdrzjlx_data = { table_name: "szdayy_d_zjlx" };
      getData(
        "/dmbgl/dmblbCx",
        jdrzjlx_data,
        function(res) {
          _this.jdrzjlx_dmb = res.returnData.dmblb;
        },
        function(res) {}
      );
    },
    search(num, flag) {
      //档案外借查询
      this.$refs["search_form"].validate(valid => {
        if (valid) {
          if (this.formData.sfzhm || this.formData.cdbh || this.formData.xm) {
            if (flag == 1) {
              this.form_data_page = deepClone(this.formData);
            }
            var data = this.form_data_page;
            data.pageNum = num || this.pageNum;
            $({
              url: "/dafw/dawjjbxxCx",
              method: "get",
              params: data
            }).then(res => {
              var _data = res.returnData;
              if (_data.executeResult == 1) {
                this.wjryxx = _data.wjryxx;
                this.wjjlxxs = _data.wjjlxxs;
                this.total = parseInt(res.rowsCount);
                this.startNum = parseInt(res.startNum);
                this.flag = true;
                this.dlrq = _data.wjryxx.dqrq;
                this.wjxxFormData = {
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
                  bz: ""
                };
                this.wjxxFormData.jdrq = _data.wjryxx.dqrq;
                this.cdid = _data.wjryxx.cdid;
                if (_data.wjjlxxs != undefined) {
                  for (var i = 0; i < _data.wjjlxxs.length; i++) {
                    //序号赋值
                    this.wjjlxxs[i].xh = res.startNum - 0 + i;
                  }
                }
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
      this.table_flag = true;
      this.table_form = item;
    },
    save() {
      // 档案外借保存
      this.$refs["mes_form"].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.wjxxFormData.cdid = this.cdid;
              $({
                url: "/dafw/wjxxSave",
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
        }
      });
    },
    gh_search(num, flag) {
      //归还查询
      this.$refs["dagh_form"].validate(valid => {
        if (valid) {
          if (flag == 1) {
            this.form_data_page = deepClone(this.dagh_formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || this.pageNum;
          var _this = this;
          getData(
            "/dafw/daghCx",
            data,
            function(res) {
              _this.gh_flag = true;
              if (res.returnData.daghxxs) {
                setTimeout(() => {
                  _this.setSelectRow();
                }, 200);
                _this.tableData = res.returnData.daghxxs;
                _this.gh_total = res.rowsCount;
                _this.daghForm.ghrq = res.returnData.daghxxs[0].dqrq;
                for (var i = 0; i < res.returnData.daghxxs.length; i++) {
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
    checkVal() {
      //select外借原因
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
    gu_btn() {
      //归还
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
                data.daghbcs = this.multipleSelection.map(item => {
                  return { cdid: item.cdid, wjid: item.wjid };
                });
                $({
                  url: "/dafw/daghSave",
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
          "/dafw/wjghCx",
          data,
          function(res) {
            _this.Search_tableData = res.returnData.daghs;
            _this.wjgh_total = res.rowsCount;
            _this.threeFlag = true;
            for (var i = 0; i < res.returnData.daghs.length; i++) {
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
        this.Search_formData = { dazt: "1" };
      }
    },
    form_reset() {
      //重置
      // this.$refs["search_form"].resetFields();
      this.formData = {};
      this.dagh_formData = {};
      this.Search_formData = { dazt: "1" };
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
  padding: 10px 20px 20px 20px;
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
