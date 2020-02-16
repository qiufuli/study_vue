<template>
  <div @click="hidePanel" @copy="copy_con($event)">
    <div class="left">
      <!-- <div class="waiceng"> -->
      <div class="daSearch hasCz" style="height: 98%;">
        <div class="search">
          <el-input placeholder="查询" v-model="filterText"></el-input>
          <i class="iconfont iconiconfontzhizuobiaozhun22 icon_search"></i>
        </div>
        <!-- <div style="color:#fff; margin:15px; text-algin:right;cursor:pointer;" @click="appendMenu()">添加一级单位</div> -->
        <el-tree
          ref="tree"
          class="menu-tree newBg over_div_con"
          :data="treeData"
          node-key="id"
          :default-expanded-keys="[1]"
          :filter-node-method="filterNode"
          @node-click="clickMenuNode"
          :expand-on-click-node="false"
        >
          <span
            class="custom-tree-node waiceng"
            :title="node.label"
            @click="setCurrentKey(node)"
            slot-scope="{ node, data }"
          >
            <span class="treeTitle">
              <i class="iconfont iconshebaojigou icon_two"></i>
              {{ node.label }}
            </span>
            <i class="iconfont icongengduo1 treeMore" @click="dan(data,$event)"></i>
          </span>
        </el-tree>
        <span class="caozuo" v-show="sfdj" ref="caozuo">
          <el-button
            type="text"
            size="mini"
            class="adds commons"
            @click="() => appendMenu(datas)"
            v-show="tj_flag"
          >
            <i class="iconfont iconjia iconadd"></i>添加
          </el-button>
          <el-button type="text" size="mini" class="dels commons" @click="() => removeMenu(datas)">
            <i class="iconfont iconshanchu1 iconadd"></i>删除
          </el-button>
          <el-button type="text" size="mini" class="changes commons" @click="() => editMenu(datas)">
            <i class="iconfont iconzhongmingming1 iconadd"></i>修改
          </el-button>
        </span>
      </div>
    </div>
    <div class="right">
      <div class="bread">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="line-height:48px;height:48px;background: #EAF5FF;"
        >
          <el-breadcrumb-item>
            <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案管理
          </el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 52px;">档案查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="common cxtj">
        <el-form
          :inline="true"
          status-icon
          :rules="rules"
          :model="formData"
          ref="ref_form"
          label-position="right"
          size="small"
          label-width="120px"
          class="demo-form-inline formData"
        >
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
              <el-form-item label="性别：" prop="xb">
                <el-select v-model="formData.xb" clearable>
                  <el-option value="1" label="男"></el-option>
                  <el-option value="2" label="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="zkgd">
            <el-row>
              <el-col :span="8">
                <el-form-item label="民族：" prop="mz">
                  <el-select v-model="formData.mz" clearable>
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in mz_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="政治面貌：" prop="zzmm">
                  <el-select v-model="formData.zzmm" clearable>
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in zzmm_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学历：" prop="zgxl">
                  <el-select v-model="formData.zgxl" clearable>
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in xl_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="户籍行政区划：" prop="hjxzqh">
                  <el-cascader
                    :options="options"
                    v-model="xzqh"
                    @change="handleChange('xzqh')"
                    :props="{ checkStrictly: true }"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="籍贯：" prop="jg">
                  <el-cascader
                    :options="options_two"
                    v-model="jg"
                    @change="handleChange('jg')"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生地：" prop="csd">
                  <el-cascader
                    :options="options_two"
                    v-model="csd_arr"
                    @change="handleChange('csd')"
                    clearable
                  ></el-cascader>
                  <!-- <el-input v-model="formData.csd"></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="入党日期开始：" prop="rdkssj">
                  <el-date-picker
                    v-model="formData.rdkssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入党日期结束：" prop="rdjssj">
                  <el-date-picker
                    v-model="formData.rdjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="婚姻状况：" prop="hyzk">
                  <el-select v-model="formData.hyzk" clearable>
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in hyzk_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="职称级别：" prop="zcjb">
                  <el-select v-model="formData.zcjb" clearable>
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in zcjb_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职业资格等级：" prop="zyzgdj">
                  <el-select v-model="formData.zyzgdj" clearable>
                    <el-option
                      :label="item.dmmc"
                      :value="item.dmid"
                      v-for="item in zyzgdj_dmb"
                      :key="item.dmid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有无奖励材料：" prop="ywjlcl">
                  <el-select v-model="formData.ywjlcl" clearable>
                    <el-option value="1" label="有"></el-option>
                    <el-option value="0" label="无"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="有无处分材料：" prop="ywcfcl">
                  <el-select v-model="formData.ywcfcl" clearable>
                    <el-option value="1" label="有"></el-option>
                    <el-option value="0" label="无"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有无培训记录：" prop="ywpxjl">
                  <el-select v-model="formData.ywpxjl" clearable>
                    <el-option value="1" label="有"></el-option>
                    <el-option value="0" label="无"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="档案存放位置：" prop="Q">
                  <el-input v-model="formData.Q" style="width:75px;"></el-input>&nbsp; -
                </el-form-item>
                <el-form-item prop="H">
                  <el-input v-model="formData.H" style="width:75px;"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <div class="more clearfix">
              <el-button type="primary" size="medium" @click="Search(1,1)" class="base_btn">查询</el-button>
              <el-button class="base_btn" size="medium" @click="reset()">重置</el-button>
              <span class="open" @click="cliMore">{{mbtext}}</span>
            </div>
          </el-row>
        </el-form>
      </div>
      <div class="tool common" v-if="isShow">
        <div class="searchResult">
          <my-bread level1="iconzaitu" level2="查询结果"></my-bread>
          <p class="totles">
            共{{total}}条
            <span v-show="total" style="color:#409EFF;font-size:14px;margin-left:20px;">
              点击→
              <b>姓名</b>可查看详细信息
            </span>
          </p>
        </div>
        <div>
          <div class="selects">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              @sort-change="sortChange"
              header-align="center"
              :header-cell-style="{color:'#015cb1'}"
            >
              <el-table-column width="50" prop="xh" label="序号"></el-table-column>
              <el-table-column label="姓名" min-width="11%" sortable="custom" align="center">
                <template slot-scope="scope">
                  <span class="jcdw_class" @click="see(scope.row, 'true')">{{scope.row.xm}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sfzhm"
                label="身份证号码"
                sortable="custom"
                min-width="20%"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="xbmc"
                label="性别"
                sortable="custom"
                min-width="11%"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="nl"
                label="年龄"
                sortable="custom"
                min-width="11%"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="xlmc"
                label="最高学历"
                sortable="custom"
                min-width="15%"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="dacfwz"
                label="档案存放位置"
                sortable="custom"
                min-width="19%"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="dwmc"
                label="单位名称"
                sortable="custom"
                min-width="15%"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="cdbh"
                label="存档编号"
                sortable="custom"
                min-width="17%"
                align="center"
              ></el-table-column>
              <el-table-column label="人员调动" min-width="12%" align="center">
                <template slot-scope="scope" align="center">
                  <i
                    class="iconfont iconrenyuanyidong icons"
                    @click="link(scope.row.cdid,scope.row.grbh)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-row class="btn_parent page_style" v-if="total">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total,jumper"
              :total="total"
              :page-size="pageSize"
            ></el-pagination>
            <!-- prev-text="上一页"
            next-text="下一页"-->
          </el-row>
        </div>
        <!-- 弹出框 -->
        <el-dialog title="人员调动" center :visible.sync="table_flag" @close="closeDialog">
          <el-form
            :model="zzjg"
            :rules="rule_jg"
            ref="ref_jgzy"
            label-position="right"
            size="small"
            label-width="120px"
          >
            <el-form-item label="转至机构：" :label-width="formLabelWidth" prop="dwmc">
              <el-input v-model="zzjg.dwmc" @input="jgCx()" autocomplete="off"></el-input>
              <div class="dropdown" v-show="dws.length >0" @click="userClick=!userClick">
                <ul>
                  <li
                    v-for="item in dws"
                    :key="item.dwid"
                    @click.stop="click_item(item)"
                    :title="item.dwmc"
                  >{{item.dwmc}}</li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="转移日期：" :label-width="formLabelWidth" prop="zyrq">
              <el-date-picker
                v-model="zzjg.zyrq"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="转移原因：" :label-width="formLabelWidth" prop="zyyy">
              <el-input v-model="zzjg.zyyy" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="transform">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="jg_name" center :visible.sync="addTableFlag" @close="closeDialog">
      <el-form
        :model="formAdd"
        ref="ref_jgxz"
        :rules="jgrules"
        label-position="right"
        size="small"
        label-width="120px"
      >
        <el-form-item label="机构名称：" :label-width="formLabelWidth" prop="dwmc">
          <el-input v-model="formAdd.dwmc"></el-input>
        </el-form-item>
        <el-form-item label="社会信用代码：" :label-width="formLabelWidth" prop="shxydm">
          <el-input v-model="formAdd.shxydm"></el-input>
        </el-form-item>
        <el-form-item label="单位类型：" :label-width="formLabelWidth" prop="dwlx">
          <el-select v-model="formAdd.dwlx" value-key="value" placeholder="请选择">
            <el-option
              v-for="item in dwlx_dmb"
              :label="item.dmmc"
              :value="item.dmid"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位经济类型：" :label-width="formLabelWidth" prop="dwjjlx">
          <el-select v-model="formAdd.dwjjlx" value-key="value" placeholder="请选择">
            <el-option
              v-for="item in dwjjlx_dmb"
              :label="item.dmmc"
              :value="item.dmid"
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册地行政区划：" prop="zcdxzqh" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            v-model="zcd_arr"
            @change="handleChange('zcd')"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="注册地址：" :label-width="formLabelWidth" prop="zcdz">
          <el-input v-model="formAdd.zcdz"></el-input>
        </el-form-item>
        <el-form-item label="经营地行政区划：" prop="jydxzqh" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            v-model="jyd_arr"
            @change="handleChange('jydxzqh')"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="经营地地址：" :label-width="formLabelWidth" prop="jydz">
          <el-input v-model="formAdd.jydz"></el-input>
        </el-form-item>
        <el-form-item label="单位法人：" :label-width="formLabelWidth" prop="dwfr">
          <el-input v-model="formAdd.dwfr"></el-input>
        </el-form-item>
        <el-form-item label="单位联系电话：" :label-width="formLabelWidth" prop="dwlxdh">
          <el-input v-model="formAdd.dwlxdh"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tcClose()">取 消</el-button>
        <el-button type="primary" @click="addFormBtn(jg_flag)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import { getData, deepClone } from "@/common/js/common";
import "@/common/scss/index.scss";

export default {
  name: "",
  data() {
    return {
      isShow: false, //点击查询后为true
      jg_name: "机构新增",
      jg_flag: "1",
      tj_flag: true,
      treeData: [],
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.zzjg.zyrq;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.formData.rdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return (
              time.getTime() >
              new Date(JSON.parse(sessionStorage.getItem("czyInfo")).xtsj)
            );
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.formData.rdkssj;
          if (beginDateVal) {
            return (
              time.getTime() >
                new Date(JSON.parse(sessionStorage.getItem("czyInfo")).xtsj) ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return (
              time.getTime() >
              new Date(JSON.parse(sessionStorage.getItem("czyInfo")).xtsj)
            );
          }
        }
      },
      filterText: "",
      sfdj: false,
      flag: true,
      pageSize: 12,
      total: 0,
      pageNum: 1,
      zkgd: false,
      tableData: [],
      mbtext: "展开更多",
      table_flag: false,
      dialogFormVisible: false,
      formLabelWidth: "240px",
      rowsCount: "",
      formData: {
        dwid: "",
        sfzhm: "",
        xm: "",
        xb: "",
        mz: "",
        zzmm: "",
        rdkssj: "",
        rdjssj: "",
        hjxzqh: "",
        zyzgdj: "",
        jg: "",
        csd: "",
        zgxl: "",
        hyzk: "",
        zcjb: "",
        ywjlcl: "",
        ywcfcl: "",
        ywpxjl: ""
      },
      formData_new: {
        dwid: "",
        sfzhm: "",
        xm: "",
        xb: "",
        mz: "",
        zzmm: "",
        rdkssj: "",
        rdjssj: "",
        rdjssj: "",
        hjxzqh: "",
        jg: "",
        csd: "",
        zgxl: "",
        hyzk: "",
        zcjb: "",
        ywjlcl: "",
        ywcfcl: "",
        ywpxjl: ""
      },
      rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }],
        xm: [{ validator: validator('50,"full","姓名",true') }],
        xb: [{ validator: validator('1,"full","性别",true') }],
        mz: [{ validator: validator('2,"full","民族",true') }],
        zzmm: [{ validator: validator('2,"full","政治面貌",true') }],
        rdkssj: [{ validator: validator('16,"full","入党开始时间",true') }],
        rdjssj: [{ validator: validator('16,"full","入党结束时间",true') }],
        hjxzqh: [{ validator: validator('12,"less","户籍行政区划",true') }],
        jg: [{ validator: validator('12,"less","籍贯",true') }],
        csd: [{ validator: validator('12,"full","出生地",true') }],
        zgxl: [{ validator: validator(' 12,"full","最高学历",true') }],
        hyzk: [{ validator: validator('12 ,"full","婚姻状况",true') }],
        zcjb: [{ validator: validator(' 12,"full","职称级别",true') }],
        zyzgdj: [{ validator: validator(' 12,"full","职业资格等级",true') }],
        ywjlcl: [{ validator: validator('1, "full", "有无奖励材料", true') }],
        ywcfcl: [{ validator: validator('16, "full", "有无处分材料", true') }],
        ywpxjl: [{ validator: validator('16, "full", "有无培训记录", true') }],
        Q: [{ validator: validator('5, "less", "档案存放位置", true') }],
        H: [{ validator: validator('10, "less", "档案存放位置", true') }]
      },
      zzjg: {
        grbh: "",
        cdid: "",
        dwmc: "",
        dwid: "",
        zyrq: JSON.parse(sessionStorage.getItem("czyInfo")).xtsj,
        zyyy: ""
      },
      rule_jg: {
        dwmc: [{ validator: validator('128, "full", "转至机构", false') }],
        zyrq: [{ validator: validator('16, "full", "转移日期", false') }],
        zyyy: [{ validator: validator('258, "full", "转移原因", true') }]
      },
      dws: [],
      userClick: false,
      zzmm_dmb: [],
      mz_dmb: [],
      xl_dmb: [],
      hyzk_dmb: [],
      zcjb_dmb: [],
      zyzgdj_dmb: [],
      table_name: "",
      options: [],
      options_two: [],
      xzqh: [],
      jg: [],
      currentShow: {},
      zcd_arr: [],
      jyd_arr: [],
      csd_arr: [],
      menuTree: [],
      dwlx_dmb: [],
      dwjjlx_dmb: [],
      addTableFlag: false,
      formAdd: {
        dwmc: "",
        shxydm: "",
        dwlx: "",
        dwjjlx: "",
        zcdxzqh: "",
        zcdz: "",
        jydxzqh: "",
        jydz: "",
        dwfr: "",
        dwlxdh: "",
        sjdwid: "",
        sfczzdw: "1"
      },
      jgrules: {
        dwmc: [
          {
            required: true,
            validator: validator('128,"full","机构名称",false')
          }
        ],
        shxydm: [
          {
            required: true,
            validator: validator('18,"zzjgdm","社会信用代码",false')
          }
        ],
        dwlx: [
          { required: true, validator: validator('2,"full","单位类型",false') }
        ],
        dwjjlx: [
          {
            required: true,
            validator: validator('3,"full","单位经济类型",false')
          }
        ],
        zcdxzqh: [
          {
            required: true,
            validator: validator('12,"full","注册地行政区划",false')
          }
        ],
        zcdz: [
          {
            required: true,
            validator: validator('128,"full","注册地址",false')
          }
        ],
        jydxzqh: [
          {
            required: true,
            validator: validator('12,"full","经营地行政区划",false')
          }
        ],
        jydz: [
          {
            required: true,
            validator: validator('128,"full","经营地址",false')
          }
        ],
        dwfr: [
          { required: true, validator: validator('32,"full","单位法人",false') }
        ],
        dwlxdh: [
          {
            required: true,
            validator: validator('32,"phone","单位联系电话",false')
          }
        ]
      },
      formInitAdd: {
        dwmc: "",
        shxydm: "",
        dwlx: "",
        dwjjlx: "",
        zcdxzqh: "",
        zcdz: "",
        jydxzqh: "",
        jydz: "",
        dwfr: "",
        dwlxdh: "",
        sjdwid: "",
        sfczzdw: "1"
      },
      currentMenuSeId: "",
      back: false,
      datas: {},
      dwid: ""
    };
  },
  created() {
    var _this = this;
    // this.$nextTick(()=>{
    //   _this.Search(1,1);
    // });
    this.dmbCx();

    this.xzqhCx();
    this.dmbCxNew();
    this.getDataMenu();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 列表排序
    sortChange(column) {
      if (column.prop == "xbmc") {
        column.prop = "xb";
      } else if (column.prop == "xlmc") {
        column.prop = "zgxl";
      }
      column.prop == undefined ? (column.prop = "xm") : "";
      this.formData_new.prop = column.prop;
      this.formData_new.order = column.order;
      const data = this.formData_new;
      $.get("/dagl/dwygxxCx", { params: data }).then(res => {
        this.isShow = true;
        var result = res.returnData;
        if (result.executeResult == "1") {
          this.tableData = result.jbxx;
          this.total = res.rowsCount;
          // this.total_page = res.pageCount;
          if (result.jbxx.length == 0) {
            this.flag = false;
            this.rowsCount = 0;
          } else {
            this.rowsCount = result.jbxx.length;
          }
          for (var i = 0; i < result.jbxx.length; i++) {
            //序号赋值
            this.tableData[i].xh = res.startNum - 0 + i;
          }
          var _this = this;
          this.$nextTick(() => {
            _this.$refs["ref_form"].clearValidate();
          });
        }
      });
    },
    copy_con($event) {
      // console.log($event)
    },
    // 树形搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 添加 弹窗事件
    tcClose() {
      this.$refs["ref_jgxz"].resetFields();
      this.zcd_arr = [];
      this.jyd_arr = [];
      this.addTableFlag = false;
      this.sfdj = false;
    },
    // closeDialog(){
    //   this.$refs["ref_jgxz"].resetFields();
    //   this.zcd_arr = [];
    //   this.jyd_arr = [];
    //   this.addTableFlag = false;
    //   this.sfdj = false;
    // },
    handle: function(index1, index2) {
      this.currentShow = this.menuTree[index1].oneZjgs[index2];
      this.menuTree[index1].oneZjgs[index2].show = true;
    },
    hidePanel: function(event) {
      var sp = document.getElementById("show");
      var bt = document.getElementById("operate");
      if (sp) {
        if (!sp.contains(event.target) && !bt.contains(event.target)) {
          this.currentShow.show = false;
        }
      }
    },
    handleCurrentChange(val) {
      this.Search(val);
    },
    // 获取行政区划最后一级传给后台
    handleChange(obj) {
      if (obj == "xzqh") {
        this.formData.hjxzqh = this.xzqh[this.xzqh.length - 1];
      } else if (obj == "jg") {
        this.formData.jg = this.jg[this.jg.length - 1];
      } else if (obj == "csd") {
        this.formData.csd = this.csd_arr[this.csd_arr.length - 1];
      } else if (obj == "jydxzqh") {
        this.formAdd.jydxzqh = this.jyd_arr[this.jyd_arr.length - 1];
      } else if (obj == "zcd") {
        this.formAdd.zcdxzqh = this.zcd_arr[this.zcd_arr.length - 1];
      } else if (obj == "xzz") {
        this.formAdd.xzzxzqh = this.xzz_arr[this.xzz_arr.length - 1];
      }
    },
    // 行政区划回显
    xzqh_arr(str) {
      var arr = [];
      var xzqh_dl = str.substring(0, 2) + "0000000000";
      var xzqh_zl = str.substring(0, 6) + "000000";
      arr.push(xzqh_dl);
      arr.push(xzqh_zl);
      if (str.substring(8, 9) != "0") {
        arr.push(str);
      }
      return arr;
    },
    // 查询结果列表  dwid fafb5b73d95900
    Search(num, flag) {
      if (flag == 1) {
        this.formData_new = deepClone(this.formData);
      }
      var data = this.formData_new;
      data.pageNum = num || this.pageNum;
      if (!data.dwid) {
        data.dwid = this.dwid;
      }
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          $.get("/dagl/dwygxxCx", { params: data }).then(res => {
            this.isShow = true;
            var result = res.returnData;
            if (result.executeResult == "1") {
              this.tableData = result.jbxx;
              this.total = res.rowsCount;
              // this.total_page = res.pageCount;
              if (result.jbxx.length == 0) {
                this.flag = false;
                this.rowsCount = 0;
              } else {
                this.rowsCount = result.jbxx.length;
              }
              for (var i = 0; i < result.jbxx.length; i++) {
                //序号赋值
                this.tableData[i].xh = res.startNum - 0 + i;
              }
              var _this = this;
              this.$nextTick(() => {
                _this.$refs["ref_form"].clearValidate();
              });
            }
          });
        }
      });
    },
    // 切换查询面板并修改文字
    cliMore() {
      if (this.zkgd) {
        this.zkgd = !this.zkgd;
        this.mbtext = "展开更多";
      } else {
        this.zkgd = !this.zkgd;
        this.mbtext = "收起";
      }
    },
    // 弹框
    link(id, grbh) {
      this.table_flag = true;
      this.zzjg.cdid = id;
      this.zzjg.grbh = grbh;
      // this.zzjg.zyrq = data;
      this.zzjg.zydwid = this.dwid;
      this.$nextTick(() => {
        this.$refs.ref_jgzy.clearValidate();
      });
    },
    //重置方法
    reset() {
      this.$refs["ref_form"].resetFields();
      this.xzqh = [];
      this.csd_arr = [];
      this.jg = [];
    },
    // 人员调动
    transform() {
      this.$refs["ref_jgzy"].validate(valid => {
        if (valid) {
          $.post("/dagl/ryjgqy", this.zzjg).then(res => {
            var result = res.returnData;
            if (result.executeResult == "1") {
              this.table_flag = false;
              this.Search(1, 1);
              this.$message({
                type: "success",
                message: result.message
              });
            } else {
              this.$alert(result.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        }
      });
    },
    cancel() {
      this.table_flag = false;
    },
    closeDialog() {
      this.zzjg = {
        grbh: "",
        cdid: "",
        dwmc: "",
        dwid: "",
        zyrq: JSON.parse(sessionStorage.getItem("czyInfo")).xtsj,
        zyyy: ""
      };
    },
    // 跳转个人页面
    see(row) {
      var _this = this;
      var flag = false;
      var flag1 = 1
      JSON.parse(sessionStorage.getItem("power")).forEach(item => {
        if (item.gnlj == "/dagl") {
          item.childrens.forEach(item1 => {
             if (item1.gnlj == "/dagl/sjxx") {
              flag = true;
              flag1 = 2
              this.powerCheck("/dagl/sjxx", function() {
                _this.$router.push({
                  path: "/dagl/personal",
                  query: { grbh: row.grbh }
                });
              });
            } else if (item1.gnlj == "/dagl/yxxx" && flag1!=2) {
              flag = true;
              this.powerCheck("/dagl/yxxx", function() {
                _this.$router.push({
                  name: "imgModule",
                  query: {
                    grbh: row.grbh,
                    cdid: row.cdid,
                    dayxid: row.dayxid,
                    xm: row.xm
                  }
                })
              });
            }
          });
            if(!flag){
                this.$alert('您没有该功能的权限！', {
                center: true,
                confirmButtonText: "确定"
            });
            }
        }
      });

      // this.powerCheck('/dagl/sjxx',function(){
      //   _this.$router.push({path: '/dagl/personal', query: {grbh: row.grbh}})
      // })
    },
    // 机构查询
    jgCx() {
      $.get("/dafw/cxdw", { params: { dwmc: this.zzjg.dwmc } }).then(res => {
        if (res.returnData.executeResult == "1") {
          if (res.returnData.dws) {
            this.dws = res.returnData.dws;
          } else {
            this.dws = [];
            this.zzjg.dwmc = "";
          }
        }
      });
    },
    click_item(item) {
      this.userClick = !this.userClick;
      this.zzjg.dwmc = item.dwmc;
      this.zzjg.dwid = item.dwid;
      this.dws = [];
    },
    dan(data, event) {
      if (data.sjdwbz) {
        this.tj_flag = false;
        var clientY = event.clientY - 110;
        this.$refs["caozuo"].style.top = clientY + "px";
      } else {
        this.tj_flag = true;
        var clientY = event.clientY - 135;
        this.$refs["caozuo"].style.top = clientY + "px";
      }
      this.$refs["caozuo"].style.right = "-80px";

      this.sfdj = !this.sfdj;
      this.datas = data;

      document.addEventListener("click", this.hidePanel, false);
    },
    // hidePanel(e){
    //   this.hide();
    // },
    hide() {
      this.sfdj = false;
    },
    // 获取代码表 ,szdayy_d_xl,szdayy_d_hyzk,szdayy_d_zcjb,szdayy_d_zyzgdj
    dmbCxNew() {
      var _this = this;
      this.table_name =
        "szdayy_d_zzmm,szdayy_d_mz,szdayy_d_xl,szdayy_d_hyzk,szdayy_d_zcjb,szdayy_d_zyzgdj";
      $.get("/dmbgl/dgdmblbCx", {
        params: { table_names: this.table_name }
      }).then(res => {
        var result = res.returnData.dmblb;
        this.zzmm_dmb = result.szdayy_d_zzmm;
        this.mz_dmb = result.szdayy_d_mz;
        this.xl_dmb = result.szdayy_d_xl;
        this.hyzk_dmb = result.szdayy_d_hyzk;
        this.zcjb_dmb = result.szdayy_d_zcjb;
        this.zyzgdj_dmb = result.szdayy_d_zyzgdj;
      });
    },
    // 行政区划代码表
    xzqhCx() {
      $.get("/xzqh4.json").then(res => {
        this.options = res.returnData.xzqhlb;
      });
      $.get("/xzqh2.json").then(res => {
        this.options_two = res.returnData.xzqhlb;
      });
    },
    // 获取左侧树列表
    getDataMenu: function() {
      var _this = this;
      _this.treeData = [];
      $.get("/dagl/dwjgCx").then(res => {
        if (res.returnData.executeResult == "1") {
          if (res.returnData.dwjbxx.length > 0) {
            var result = res.returnData.dwjbxx;
            for (let i in result) {
              var firstNode = {};
              firstNode.id = result[i].dwid;
              firstNode.label = result[i].dwmc;
              firstNode.parentId = "";
              firstNode.children = [];
              _this.treeData.push(firstNode);
              if (result[i].oneZjgs) {
                for (let k in result[i].oneZjgs) {
                  var secNode = {};
                  secNode.id = result[i].oneZjgs[k].dwid;
                  secNode.label = result[i].oneZjgs[k].dwmc;
                  secNode.parentId = result[i].dwid;
                  secNode.children = [];
                  _this.treeData[i].children.push(secNode);
                  if (result[i].oneZjgs[k].twoZjgs) {
                    for (let j in result[i].oneZjgs[k].twoZjgs) {
                      var treNode = {};
                      treNode.id = result[i].oneZjgs[k].twoZjgs[j].dwid;
                      treNode.label = result[i].oneZjgs[k].twoZjgs[j].dwmc;
                      treNode.parentId = result[i].oneZjgs[k].dwid;
                      treNode.sjdwbz = result[i].oneZjgs[k].twoZjgs[j].sjdwbz;
                      _this.treeData[i].children[k].children.push(treNode);
                    }
                  }
                }
              }
            }
            this.dwid = result[0].dwid;
            // _this.$nextTick(()=>{
            //   _this.Search(1,1);
            // });
            // this.Search(1,1);
          }
        }
      });
    },
    appendMenu: function(data) {
      this.addTableFlag = true;
      this.jg_name = "机构新增";
      this.jg_flag = 1; //区分添加和修改的 确定按钮事件
      this.$nextTick(() => {
        this.$refs["ref_jgxz"].resetFields();
      });
      this.zcd_arr = [];
      this.jyd_arr = [];
      if (data) {
        this.formAdd.sjdwid = data.id;
      } else {
        this.formAdd.sjdwid = "";
      }
    },
    setCurrentKey: function(node) {
      this.dwid = node.key;
      this.$refs.tree.setCurrentKey(2);
      this.back = true;
    },
    addFormBtn: function(jg_flag) {
      if (jg_flag == 1) {
        this.$refs["ref_jgxz"].validate(valid => {
          if (valid) {
            $.post("/dagl/dwjgAdd", this.formAdd).then(res => {
              var result = res.returnData;
              if (result.executeResult == "1") {
                this.getDataMenu();
                this.addTableFlag = false;
                this.formAdd = this.formInitAdd;
                this.$message.warning("添加成功！");
                this.sfdj = false;
              } else {
                this.$message.warning(result.returnData.message);
              }
            });
          }
        });
      } else if (jg_flag == 2) {
        this.$refs["ref_jgxz"].validate(valid => {
          if (valid) {
            $.post("/dagl/dwjgUpdate", this.formAdd).then(res => {
              var result = res.returnData;
              if (result.executeResult == "1") {
                this.getDataMenu();
                this.addTableFlag = false;
                this.formAdd = this.formInitAdd;
                this.$message.warning("修改成功");
                this.sfdj = false;
              } else {
                this.$message.warning(result.returnData.message);
              }
            });
          }
        });
      }
    },
    removeMenu: function(data) {
      this.$confirm("确定要删除“" + data.label + "”吗？", "删除提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $.post("/dagl/dwjgDelete", { dwid: data.id }).then(res => {
            var result = res.returnData;
            if (result.executeResult == "1") {
              this.sfdj = false;
              this.getDataMenu();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "warning",
                message: result.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑单位机构 弹出修改输入框
    editMenu: function(data) {
      this.jg_name = "机构修改";
      this.jg_flag = 2;
      var _this = this;
      $.get("/dagl/dwjgxxCx", { params: { dwid: data.id } }).then(res => {
        if (res.returnData.executeResult == "1") {
          _this.formAdd = res.returnData.jgxx;
          this.jyd_arr = this.xzqh_arr(
            res.returnData.jgxx.jydxzqh,
            this.jyd_arr
          );
          this.zcd_arr = this.xzqh_arr(
            res.returnData.jgxx.zcdxzqh,
            this.zcd_arr
          );
        }
      });
      _this.addTableFlag = true;
      _this.formAdd.sjdwid = data.parentId;
    },
    // 获取左侧 单位树的点击时的id
    clickMenuNode: function(data) {
      this.formData.dwid = data.id;
      // this.Search(1,1);
      this.isShow = false;
    },
    // 代码表查询
    dmbCx() {
      var _this = this;
      getData("/dmbgl/dmblbCx", { table_name: "szdayy_d_dwxz" }, function(res) {
        _this.dwlx_dmb = res.returnData.dmblb;
      });
      getData("/dmbgl/dmblbCx", { table_name: "szdayy_d_dwjjlx" }, function(
        res
      ) {
        _this.dwjjlx_dmb = res.returnData.dmblb;
      });
    },
    menuSelect: function(id) {
      this.currentMenuSeId = id;
    }
  }
};
</script>
<style scoped lang="scss">
.newBg {
  height: 90%;
  margin-top: 0%;
  overflow: auto;
}
.menu-tree {
  background: none;
  color: #fff;
}
.custom-tree-node {
  width: 100%;
}
.iconadd {
  font-size: 14px;
  margin-right: 5px;
}
.search {
  width: 180px;
  margin: 10px auto;
  padding: 10px;
  position: relative;
  input {
    background-color: #355071;
    width: 100%;
    height: 32px;
    line-height: 32px;
    color: #fff;
  }
  .icon_search {
    position: absolute;
    right: 20px;
    top: 20%;
    font-size: 22px;
    color: #fff;
  }
}
.menu_level2 {
  position: relative;
}
.menu_level3 {
  padding-left: 40px;
}
.operate {
  float: right;
  margin-right: 25px;
  color: #fff;
}
.pop-handle {
  position: absolute;
  top: 25px;
  right: 20px;
  color: #fff;
  background: #1459a7;
  z-index: 5;
  li {
    padding: 8px 10px;
    font-size: 13px;
    cursor: pointer;
    .iconfont {
      margin-right: 8px;
      font-size: 14px;
    }
  }
  li:hover {
    background: #548ecf;
  }
}
.common {
  width: 98%;
  margin: 10px auto;
  background-color: #fff;
}
.formData {
  .el-row {
    width: 98%;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    .el-col {
      height: 60px;
      .el-input {
        width: 180px;
        line-height: 60px;
        height: 40px;
      }
      .el-select {
        line-height: 60px;
        width: 180px;
      }
      .el-cascader {
        line-height: 60px;
        width: 180px;
      }
    }
  }
}
.cxtj {
  .more {
    float: right;
    margin-right: 20px;
    margin-bottom: 10px;
    .el-button {
      margin-right: 20px;
    }
    .open {
      font-size: 14px;
      color: #409eff;
      margin-left: 20px;
      display: inline-block;
      cursor: pointer;
    }
  }
}
.condition {
  height: 114px;
}
.tool {
  // height: 514px;
  .title {
    width: 98%;
    height: 48px;
    line-height: 48px;
    color: #333;
    border-bottom: 1px solid #e5e5e5;
    margin: 0 auto;
    p {
      margin-left: 20px;
      font-size: 16px;
      font-weight: 600;
    }
    .base-icon_parent {
      display: inline-block;
      height: 24px;
      width: 24px;
      border-radius: 12px;
      background-color: #0f89f3;
      text-align: center;
      line-height: 24px;
      margin-right: 2px;
      .icons {
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .table_row {
    color: #015cb1;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    padding: 15px 0;
  }
  .selects {
    width: 98%;
    margin: 0 auto;
    color: #015cb1;
    .icons {
      cursor: pointer;
      color: #fe6a04;
    }
    .jcdw_class {
      cursor: pointer;
      color: #409eff;
    }
  }
  .dropdown {
    position: absolute;
    min-width: 200px;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    background: #ffffff;
    padding: 5px 10px;
    box-sizing: border-box;
    max-height: 200px;
    overflow: hidden;
    overflow-y: auto;
    z-index: 3;
  }
  .dropdown li {
    line-height: 1.2;
    padding: 5px 0;
    color: #6d6c6c;
    cursor: pointer;
    // z-index: 3;
  }
}
.searchResult {
  position: relative;
}
.totles {
  position: absolute;
  left: 12%;
  top: 16px;
}
.over_div_con {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  cursor: pointer;
  height: 600px;
}
.over_div_con::-webkit-scrollbar {
  width: 9px;
  height: 50px;
  background-color: #2a3d55;
  cursor: pointer;
}

/*定义滚动条轨道 内阴影+圆角 */

.over_div_con::-webkit-scrollbar-track {
  border-radius: 4px;
  height: 50px;
  background-color: #2a3d55;
}

/*定义滑块 内阴影+圆角*/

.over_div_con::-webkit-scrollbar-thumb {
  border-radius: 4px;
  height: 50px;
  background-color: #c1c1c1;
}
</style>