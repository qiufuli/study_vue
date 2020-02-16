<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px;height:48px;">
      <i class="iconfont" style="float:left;margin-right:15px;">&#xe60c;</i>
      <el-breadcrumb-item>档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{jcxx_data.xm}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content clearfix">
      <div class="tabs">
        <div class="tab_index">
          <span>数据信息</span>
        </div>
        <div @click="yxxxQh">
          <span>影像信息</span>
        </div>
      </div>
      <span @click="back" class="back"> 《 返回</span>
      <div class="con_left" :class="navBarFixed == true ? 'navBarWrap' :''" ref="left_nav">
        <p class="menu_tit">目录</p>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="menu('#jcxx')">
            <i class="iconfont">&#xe641;</i>
            <span>基础信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="menu('#gzxx')">
            <i class="iconfont">&#xe64b;</i>
            <span>工作经历</span>
          </el-menu-item>
          <el-menu-item index="3" @click="menu('#zcxx')">
            <i class="iconfont">&#xe63d;</i>
            <span>职称信息</span>
          </el-menu-item>
          <el-menu-item index="4" @click="menu('#zyzg')">
            <i class="iconfont">&#xe651;</i>
            <span>职业资格信息</span>
          </el-menu-item>
          <el-menu-item index="5" @click="menu('#xlxw')">
            <i class="iconfont">&#xe636;</i>
            <span>教育经历</span>
          </el-menu-item>
          <el-menu-item index="6" @click="menu('#qsxx')">
            <i class="iconfont">&#xe647;</i>
            <span>家庭情况</span>
          </el-menu-item>
          <el-menu-item index="7" @click="menu('#yynl')">
            <i class="iconfont">&#xe602;</i>
            <span>语言能力</span>
          </el-menu-item>
          <el-menu-item index="8" @click="menu('#jc')">
            <i class="iconfont">&#xe63e;</i>
            <span>奖惩情况</span>
          </el-menu-item>
          <el-menu-item index="9" @click="menu('#pxqk')">
            <i class="iconfont">&#xe643;</i>
            <span>培训经历</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="con_right">
        <!-- 个人信息 -->
        <div id="xxxx" class="per_xx">
          <div class="img_wrap">
            <el-upload
              class="avatar-uploader"
              :action = 'uploadUrl'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imgShowMan" src="../../assets/images/nan1.png" alt/>
              <img v-if="imgShowWomen" src="../../assets/images/nan2.png" alt/>
              <!-- <img v-if="imgShow" src="../../assets/images/txf.png" alt/> -->
              <img v-if="imgShow" :src ="imgSrc" alt="">
              <i v-if="imgShowI" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="xx_wrap">
            <ul class="xm_ul">
              <li class="xm">{{jcxx_data.xm}}</li>
              <li>
                <i class="iconfont">&#xe666;</i>
                <span>性别：{{jcxx_data.xbmc}}</span>
              </li>
              <li>
                <i class="iconfont">&#xe61f;</i>
                <span>身份证：{{jcxx_data.sfzhm}}</span>
              </li>
            </ul>
            <ul class="base_xx">
              <li>
                <i class="iconfont">&#xe619;</i>
                <span>年龄：{{jcxx_data.nl}}</span>
              </li>
              <li>
                <i class="iconfont">&#xe61a;</i>
                <span>出生日期：{{jcxx_data.csrq}}</span>
              </li>
              <li>
                <i class="iconfont">&#xe620;</i>
                <span>民族：{{jcxx_data.mzmc}}</span>
              </li>

              <li>
                <i class="iconfont">&#xeaa7;</i>
                <span :title="jcxx_data.ycddwmc">原存档单位：{{jcxx_data.ycddwmc}}</span>
              </li>
            </ul>
            <ul class="base_xx">
              <li>
                <i class="iconfont">&#xe61e;</i>
                <span>政治面貌：{{jcxx_data.zzmmmc}}</span>
              </li>
              <li>
                <i class="iconfont">&#xe645;</i>
                <span :title="jcxx_data.xlmc">学历：{{jcxx_data.xlmc}}</span>
              </li>
              <li>
                <i class="iconfont">&#xe616;</i>
                <span :title="jcxx_data.cdbh">存档号：{{jcxx_data.cdbh}}</span>
              </li>
              <li>
                <i class="iconfont">&#xe62e;</i>
                <span :title="jcxx_data.dwmc">现存档单位：{{jcxx_data.dwmc}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 基础信息 -->
        <div id="jcxx" class="per_jcxx clearfix">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe641;</i>
              </span>
              <span>基础信息</span>
            </div>
            <div class="title_r" v-if="jcxx_editFlag" @click="editList('jcxx')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="jcxxBc">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="jcxx_con" :class="{'jcxx_height':jcxx_editFlag}">
            <el-form :model="jcxx_formData" :rules="rules1" ref="jcxxForm">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名：" prop="xm">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.xm}}</span>
                    <el-input v-else v-model="jcxx_formData.xm"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="曾用名：" prop="cym">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.cym}}</span>
                    <el-input v-else v-model="jcxx_formData.cym"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历：" prop="xx">
                    <el-select
                      v-model="jcxx_formData.zgxl"
                      value-key="value"
                      :placeholder="jcxx_editFlag?'':'请选择'"
                      :disabled="jcxx_editFlag"
                    >
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
                  <el-form-item label="民族：" prop="mz">
                    <el-select
                      v-model="jcxx_formData.mz"
                      value-key="value"
                      :placeholder="jcxx_editFlag?'':'请选择'"
                      :disabled="jcxx_editFlag"
                    >
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
                    <el-select
                      v-model="jcxx_formData.zzmm"
                      value-key="value"
                      :placeholder="jcxx_editFlag?'':'请选择'"
                      :disabled="jcxx_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zzmm_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                    <!-- <el-input v-model="jcxx_formData.zzmm" :disabled="jcxx_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入党时间：" prop="rdsj">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="jcxx_editFlag"
                      :class="{'jcxx_date_ck':jcxx_editFlag}"
                      v-model="jcxx_formData.rdsj"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="籍贯：" prop="jg">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.jgmc}}</span>
                    <el-cascader
                      v-else
                      :options="options_two"
                      :disabled="jcxx_editFlag"
                      :props="{ checkStrictly: true }"
                      v-model="jg_arr"
                      @change="handleChange('jg')"
                    ></el-cascader>
                    <!-- <el-input v-model="jcxx_formData.jg" :disabled="jcxx_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生地：" prop="csd">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.csdmc}}</span>
                    <!-- <el-input v-else v-model="jcxx_formData.hjdz"></el-input> -->
                    <el-cascader
                      v-else
                      :options="options_two"
                      :disabled="jcxx_editFlag"
                      :props="{ checkStrictly: true }"
                      v-model="csd_arr"
                      @change="handleChange('csd')"
                    ></el-cascader>
                    <!-- <el-input v-model="jcxx_formData.csd" :disabled="jcxx_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="参加工作时间：" prop="cjgzsj">
                    <el-date-picker
                      type="month"
                      value-format="yyyy-MM"
                      :disabled="jcxx_editFlag"
                      :picker-options="pickerOptions"
                      :class="{'jcxx_date_ck':jcxx_editFlag}"
                      v-model="jcxx_formData.cjgzsj"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="户籍行政区划：" prop="hjxzqh">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.hjxzqhmc}}</span>
                    <el-cascader
                      v-else
                      :options="options_four"
                      :disabled="jcxx_editFlag"
                      :props="{ checkStrictly: true }"
                      v-model="hjd_arr"
                      @change="handleChange('hjd')"
                    ></el-cascader>
                    <!-- <el-input v-model="jcxx_formData.hjxzqh" :disabled="jcxx_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="户籍详细地址：" prop="hjdz">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.hjdz}}</span>
                    <el-input v-else v-model="jcxx_formData.hjdz"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="现住址行政区划：" prop="xzzxzqh">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.xzzxzqhmc}}</span>
                    <el-cascader
                      v-else
                      :options="options_four"
                      :disabled="jcxx_editFlag"
                      :props="{ checkStrictly: true }"
                      v-model="xzz_arr"
                      @change="handleChange('xzz')"
                    ></el-cascader>
                    <!-- <el-input v-model="jcxx_formData.xzzxzqh" :disabled="jcxx_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="现住址详细地址：" prop="xzz">
                    <span v-if="jcxx_editFlag" class="cc_text">{{jcxx_formData.xzz}}</span>
                    <el-input v-else v-model="jcxx_formData.xzz"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="现住址邮编：" prop="xzzyb">
                    <el-input v-model="jcxx_formData.xzzyb" :disabled="jcxx_editFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="固定电话：" prop="dh">
                    <el-input v-model="jcxx_formData.dh" :disabled="jcxx_editFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机：" prop="xzzyb">
                    <el-input v-model="jcxx_formData.sj" :disabled="jcxx_editFlag"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="电子邮箱：" prop="dzyx">
                    <el-input v-model="jcxx_formData.dzyx" :disabled="jcxx_editFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="婚姻状况：" prop="hyzk">
                    <el-select
                      v-model="jcxx_formData.hyzk"
                      value-key="value"
                      :placeholder="jcxx_editFlag?'':'请选择'"
                      :disabled="jcxx_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in hyzk_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="档案位置号：" prop="dacfwz">
                    <el-input v-model="jcxx_formData.dacfwz" :disabled="jcxx_editFlag"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="存档日期：" prop="cdrq">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :disabled="jcxx_editFlag"
                      :picker-options="pickerOptions0"
                      :class="{'jcxx_date_ck':jcxx_editFlag}"
                      v-model="jcxx_formData.cdrq"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <!-- 工作经历 -->
        <div id="gzxx" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe64b;</i>
              </span>
              <span>工作经历</span>
            </div>
            <div class="title_r" v-if="gzxx_editFlag" @click="editList('gzxx')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('gzxx')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!gzxx_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="4">工作单位名称</el-col>
              <el-col :span="3">工作开始时间</el-col>
              <el-col :span="3">工作结束时间</el-col>
              <el-col :span="4">从事工作或担任职务</el-col>
              <el-col :span="4">工作职位（岗位）类型</el-col>
              <el-col :span="2">单位证明人</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="gzxx_form" :model="gzxx" :rules="rules_gzxx">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in gzxx.rygzs"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="4">
                  <el-form-item :prop="'rygzs.' + index + '.gzdwmc'" :rules="rules_gzxx.gzdwmc">
                    <span
                      v-if="gzxx_editFlag"
                      class="list_text"
                      :title="item.gzdwmc"
                    >{{item.gzdwmc}}</span>
                    <el-input v-else v-model="item.gzdwmc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item :prop="'rygzs.' + index + '.gzkssj'" :rules="rules_gzxx.gzkssj">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="gzxx_editFlag"
                      v-model="item.gzkssj"
                      v-if="gzxxTimeFlag"
                      style="width: 100%;"
                    ></el-date-picker>
                     <el-input v-model="item.gzkssj" :disabled="gzxx_editFlag" v-if="!gzxxTimeFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item :prop="'rygzs.' + index + '.gzjssj'" :rules="rules_gzxx.gzjssj">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="gzxx_editFlag"
                      v-model="item.gzjssj"
                       v-if="gzxxTimeFlag2"
                      style="width: 100%;"
                    ></el-date-picker>
                    <el-input v-model="item.gzjssj" :disabled="gzxx_editFlag" v-if="!gzxxTimeFlag2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                    :prop="'rygzs.' + index + '.csgzhdrzw'"
                    :rules="rules_gzxx.csgzhdrzw"
                  >
                    <span
                      v-if="gzxx_editFlag"
                      class="list_text"
                      :title="item.csgzhdrzw"
                    >{{item.csgzhdrzw}}</span>
                    <el-input v-else v-model="item.csgzhdrzw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :prop="'rygzs.' + index + '.zwgwlx'" :rules="rules_gzxx.zwgwlx">
                    <span
                      v-if="gzxx_editFlag"
                      class="list_text"
                      :title="item.zwgwlx"
                    >{{item.zwgwlx}}</span>
                    <el-input v-else v-model="item.zwgwlx"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item :prop="'rygzs.' + index + '.dwzmr'" :rules="rules_gzxx.dwzmr">
                    <span v-if="gzxx_editFlag" class="list_text" :title="item.dwzmr">{{item.dwzmr}}</span>
                    <el-input v-else v-model="item.dwzmr"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(gzxx.rygzs,'gzxx',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="gzxx.rygzs == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!gzxx_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('gzxx')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 职称信息 -->
        <div id="zcxx" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe63d;</i>
              </span>
              <span>职称信息</span>
            </div>
            <div class="title_r" v-if="zcxx_editFlag" @click="editList('zcxx')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('zcxx')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!zcxx_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="3">专业技术职称</el-col>
              <el-col :span="3">职称级别</el-col>
              <el-col :span="3">职称评定时间</el-col>
              <el-col :span="4">职称评审单位</el-col>
              <el-col :span="4">专业技术职务名称</el-col>
              <el-col :span="3">专业技术职务聘任时间</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="zcxx_form" :model="zcxx" :rules="rules_zcxx">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in zcxx.ryzcs"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="3">
                  <el-form-item :prop="'ryzcs.' + index + '.zyjszcmc'" :rules="rules_zcxx.zyjszcmc">
                    <!-- <el-select
                      v-model="item.zyjszc"
                      value-key="value"
                      :placeholder="zcxx_editFlag?'':'请选择'"
                      :disabled="zcxx_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zc_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select> -->
                    <el-autocomplete
                    v-model="item.zyjszcmc"
                    :fetch-suggestions="querySearch_zc"
                    :placeholder="zcxx_editFlag?'':'请输入'"
                    :trigger-on-focus="false"
                    popper-class="select-option"
                    @blur="on_blurzc(index, zcxx.ryzcs)"
                    @select="((_item)=>{handleSelect_zc(_item, index, zcxx.ryzcs)})"
                    :disabled="zcxx_editFlag"
                    :title="item.zyjszcmc"
                    :value="item.dmid"
                    id="iconPad"
                  ><i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="zc_focus">
                  </i></el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item :prop="'ryzcs.' + index + '.zcjb'" :rules="rules_zcxx.zcjb">
                    <el-select
                      v-model="item.zcjb"
                      value-key="value"
                      :placeholder="zcxx_editFlag?'':'请选择'"
                      :disabled="zcxx_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zcjb_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item :prop="'ryzcs.' + index + '.zcpdsj'" :rules="rules_zcxx.zcpdsj">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="zcxx_editFlag"
                      v-model="item.zcpdsj"
                      v-if="zcxxTimeFlag"
                    ></el-date-picker>
                    <el-input v-model="item.zcpdsj" :disabled="zcxx_editFlag" v-if="!zcxxTimeFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :prop="'ryzcs.' + index + '.zcpsdw'" :rules="rules_zcxx.zcpsdw">
                    <span
                      v-if="zcxx_editFlag"
                      class="list_text"
                      :title="item.zcpsdw"
                    >{{item.zcpsdw}}</span>
                    <el-input v-else v-model="item.zcpsdw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :prop="'ryzcs.' + index + '.zyjszwmc'" :rules="rules_zcxx.zyjszwmc">
                    <span
                      v-if="zcxx_editFlag"
                      class="list_text"
                      :title="item.zyjszwmc"
                    >{{item.zyjszwmc}}</span>
                    <el-input v-else v-model="item.zyjszwmc" :title="item.zyjszwmc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item
                    :prop="'ryzcs.' + index + '.zyjszwprsj'"
                    :rules="rules_zcxx.zyjszwprsj"
                  >
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="zcxx_editFlag"
                      v-model="item.zyjszwprsj"
                      v-if="zcxxTimeFlag2"
                    ></el-date-picker>
                    <el-input v-model="item.zyjszwprsj" :disabled="zcxx_editFlag" v-if="!zcxxTimeFlag2" :title="item.zyjszwprsj"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(zcxx.ryzcs,'zcxx',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="zcxx.ryzcs == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!zcxx_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('zcxx')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 职业资格信息 -->
        <div id="zyzg" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe63f;</i>
              </span>
              <span>职业资格信息</span>
            </div>
            <div class="title_r" v-if="zyzg_editFlag" @click="editList('zyzg')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('zyzg')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!zyzg_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="5">职业资格名称</el-col>
              <el-col :span="5">职业资格等级</el-col>
              <el-col :span="5">技术评定时间</el-col>
              <el-col :span="5">技术评审单位</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="zyzg_form" :model="zyzg" :rules="rules_zyzg">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in zyzg.ryzyzgs"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryzyzgs.' + index + '.zyzgmc'" :rules="rules_zyzg.zyzgmc">
                    <!-- <el-select
                      v-model="item.zyzgmc"
                      value-key="value"
                      :placeholder="zyzg_editFlag?'':'请选择'"
                      :disabled="zyzg_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zyzgmc_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select> -->
                    <!-- :placeholder="zyzg_editFlag?'':'请输入'" -->
                     <el-autocomplete
                    v-model="item.zyzgmcName"
                    :fetch-suggestions="querySearch_zy"
                    :trigger-on-focus="false"
                    popper-class="select-option"
                    @blur="on_blurzc(index, zyzg.ryzyzgs)"
                    @select="((_item)=>{handleSelect_zy(_item, index, zyzg.ryzyzgs)})"
                    :disabled="zyzg_editFlag"
                    :title="item.zyzgmcName"
                    :value="item.dmid"
                    id="iconPad"
                  >
                  <i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="zc_focus">
                  </i></el-autocomplete>

                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryzyzgs.' + index + '.zyzgdj'" :rules="rules_zyzg.zyzgdj">
                    <el-select
                      v-model="item.zyzgdj"
                      value-key="value"
                      :placeholder="zyzg_editFlag?'':'请选择'"
                      :disabled="zyzg_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zyzgdj_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryzyzgs.' + index + '.jspdsj'" :rules="rules_zyzg.jspdsj">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="zyzg_editFlag"
                      v-model="item.jspdsj"
                      v-if="zyzgTimeFlag"
                    ></el-date-picker>
                    <el-input v-model="item.jspdsj" :disabled="zyzg_editFlag" v-if="!zyzgTimeFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryzyzgs.' + index + '.jspsdw'" :rules="rules_zyzg.jspsdw">
                    <span
                      v-if="zyzg_editFlag"
                      class="list_text"
                      :title="item.jspsdw"
                    >{{item.jspsdw}}</span>
                    <el-input v-else v-model="item.jspsdw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(zyzg.ryzyzgs,'zyzg',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="zyzg.ryzyzgs == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!zyzg_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('zyzg')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 教育经历 -->
        <div id="xlxw" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe636;</i>
              </span>
              <span>教育经历</span>
            </div>
            <div class="title_r" v-if="xlxw_editFlag" @click="editList('xlxw')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('xlxw')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!xlxw_editFlag}">
            <el-row class="table_row">
              <el-col :span="1">序号</el-col>
              <el-col :span="3">学历</el-col>
              <el-col :span="3">是否为第一学历</el-col>
              <el-col :span="4">入校日期</el-col>
              <el-col :span="4">毕业日期</el-col>
              <el-col :span="4">毕业院校</el-col>
              <el-col :span="3">专业名称</el-col>
              <!-- <el-col :span="3">专业类别</el-col> -->
              <!-- <el-col :span="2">学位</el-col>
              <el-col :span="2">学习形式</el-col>
              <el-col :span="2">教育类别</el-col>
              <el-col :span="2">招生性质</el-col>-->
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="xlxw_form" :model="xlxw" :rules="rules_xlxw">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in xlxw.ryxlxws"
                :key="index"
              >
                <el-col :span="1">{{index+1}}</el-col>
                <el-col :span="3">
                  <el-form-item :prop="'ryxlxws.' + index + '.xl'" :rules="rules_xlxw.xl">
                    <el-select
                      v-model="item.xl"
                      value-key="value"
                      :placeholder="xlxw_editFlag?'':'请选择'"
                      :disabled="xlxw_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in xl_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                    <!-- <el-input v-model="item.xl" :disabled="xlxw_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item :prop="'ryxlxws.' + index + '.sfdyxl'" :rules="rules_xlxw.sfdyxl">
                    <el-select v-model="item.sfdyxl" :disabled="xlxw_editFlag" :placeholder="xlxw_editFlag?'':'请选择'">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :prop="'ryxlxws.' + index + '.rxrq'" :rules="rules_xlxw.rxrq">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="xlxw_editFlag"
                      v-model="item.rxrq"
                      v-if="xlxwTimeFlag"
                    ></el-date-picker>
                    <el-input v-model="item.rxrq" :disabled="xlxw_editFlag" v-if="!xlxwTimeFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :prop="'ryxlxws.' + index + '.byrq'" :rules="rules_xlxw.byrq">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="xlxw_editFlag"
                      v-model="item.byrq"
                      v-if="xlxwTimeFlag2"
                    ></el-date-picker>
                    <el-input v-model="item.byrq" :disabled="xlxw_editFlag" v-if="!xlxwTimeFlag2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :prop="'ryxlxws.' + index + '.byyx'" :rules="rules_xlxw.byyx">
                    <span v-if="xlxw_editFlag" class="list_text" :title="item.byyx">{{item.byyx}}</span>
                    <el-input v-else v-model="item.byyx"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item :prop="'ryxlxws.' + index + '.zylb'" :rules="rules_xlxw.zylb">
                    <span v-if='xlxw_editFlag' class="list_text" :title="item.zymc"> {{item.zymc}}</span>
                    <el-input v-else v-model="item.zymc"></el-input>
                    <!-- <el-select
                      v-model="item.zylb"
                      value-key="value"
                      placeholder="请选择"
                      :disabled="xlxw_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zylb_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(xlxw.ryxlxws,'xlxw',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="xlxw.ryxlxws == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!xlxw_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('xlxw')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 家庭情况 -->
        <div id="qsxx" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe647;</i>
              </span>
              <span>家庭情况</span>
            </div>
            <div class="title_r" v-if="qsxx_editFlag" @click="editList('qsxx')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('qsxx')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!qsxx_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="5">亲属称谓</el-col>
              <el-col :span="5">亲属姓名</el-col>
              <el-col :span="5">工作单位</el-col>
              <el-col :span="5">工作职务</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="qsxx_form" :model="qsxx" :rules="rules_qsxx">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in qsxx.ryjtqks"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjtqks.' + index + '.qscw'" :rules="rules_qsxx.qscw">
                    <el-select
                      v-model="item.qscw"
                      value-key="value"
                      :placeholder="qsxx_editFlag?'':'请选择'"
                      :disabled="qsxx_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in qscw_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                    <!-- <el-input v-model="item.qscw" :disabled="qsxx_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjtqks.' + index + '.qsxm'" :rules="rules_qsxx.qsxm">
                    <el-input v-model="item.qsxm" :disabled="qsxx_editFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjtqks.' + index + '.gzdw'" :rules="rules_qsxx.gzdw">
                    <span v-if="qsxx_editFlag" class="list_text" :title="item.gzdw">{{item.gzdw}}</span>
                    <el-input v-else v-model="item.gzdw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjtqks.' + index + '.gzzw'" :rules="rules_qsxx.gzzw">
                    <span v-if="qsxx_editFlag" class="list_text" :title="item.gzzw">{{item.gzzw}}</span>
                    <el-input v-else v-model="item.gzzw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(qsxx.ryjtqks,'qsxx',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="qsxx.ryjtqks == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!qsxx_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('qsxx')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 语言能力 -->
        <div id="yynl" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe602;</i>
              </span>
              <span>语言能力</span>
            </div>
            <div class="title_r" v-if="yynl_editFlag" @click="editList('yynl')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('yynl')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!yynl_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="10">语种</el-col>
              <el-col :span="10">语种熟练程度</el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="yynl_form" :model="yynl" :rules="rules_yynl">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in yynl.yzxxs"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="10">
                  <el-form-item :prop="'yzxxs.' + index + '.yz'" :rules="rules_yynl.yz">
                    <el-select
                      v-model="item.yz"
                      value-key="value"
                      :placeholder="yynl_editFlag?'':'请选择'"
                      :disabled="yynl_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in yz_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :prop="'yzxxs.' + index + '.yzslcd'" :rules="rules_yynl.yzslcd">
                    <el-select
                      v-model="item.yzslcd"
                      value-key="value"
                      :placeholder="yynl_editFlag?'':'请选择'"
                      :disabled="yynl_editFlag"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in yzslcd_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(yynl.yzxxs,'yynl',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="yynl.yzxxs == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!yynl_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('yynl')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 奖惩情况 -->
        <div id="jc" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe63e;</i>
              </span>
              <span>奖惩情况</span>
            </div>
            <div class="title_r" v-if="jc_editFlag" @click="editList('jc')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('jc')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!jc_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="5">奖惩类别</el-col>
              <el-col :span="5">奖惩名称</el-col>
              <el-col :span="5">奖惩批准日期</el-col>
              <!-- <el-col :span="4">奖惩批准机关名称</el-col> -->
              <el-col :span="5">奖惩原因</el-col>
              <!-- <el-col :span="3">奖惩撤销日期</el-col> -->
              <!-- <el-col :span="2">行政处分</el-col> -->
              <!-- <el-col :span="3">行政、刑事处罚</el-col> -->
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="jc_form" :model="jc" :rules="rules_jc">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in jc.ryjcs"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjcs.' + index + '.jclb'" :rules="rules_jc.jclb">
                    <el-select
                      v-model="item.jclb"
                      value-key="value"
                      :placeholder="jc_editFlag?'':'请选择'"
                      :disabled="jc_editFlag"
                      @change="jclb"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in jclb_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                    <!-- <el-input v-model="item.jclb" :disabled="jc_editFlag"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjcs.' + index + '.jcmc'" :rules="rules_jc.jcmc">
                    <el-select
                      v-model="item.jcmc"
                      value-key="value"
                      :placeholder="jc_editFlag?'':'请选择'"
                      :disabled="jc_editFlag"
                      v-if="item.jclb == '1'"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in jlmc_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.jcmc"
                      value-key="value"
                      :placeholder="jc_editFlag?'':'请选择'"
                      :disabled="jc_editFlag"
                      v-if="item.jclb == '2'"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in cfmc_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.jcmc"
                      value-key="value"
                      :placeholder="jc_editFlag?'':'请选择'"
                      v-if="item.jclb == ''"
                    ></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjcs.' + index + '.jcpzrq'" :rules="rules_jc.jcpzrq">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="jc_editFlag"
                      v-model="item.jcpzrq"
                       v-if="jcTimeFlag"
                    ></el-date-picker>
                    <el-input v-model="item.jcpzrq" :disabled="jc_editFlag" v-if="!jcTimeFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'ryjcs.' + index + '.jcyy'" :rules="rules_jc.jcyy">
                    <span v-if="jc_editFlag" class="list_text" :title="item.jcyy">{{item.jcyy}}</span>
                    <el-input v-else v-model="item.jcyy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(jc.ryjcs,'jc',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="jc.ryjcs == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!jc_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('jc')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 培训经历 -->
        <div id="pxqk" class="per_xlxx">
          <div class="title_wrap">
            <div class="title_l">
              <span class="base-icon_parent">
                <i class="iconfont base-content-icon">&#xe643;</i>
              </span>
              <span>培训经历</span>
            </div>
            <div class="title_r" v-if="pxqk_editFlag" @click="editList('pxqk')">
              <i class="iconfont">&#xe604;</i>
              <span>编辑</span>
            </div>
            <div class="title_r gzxxWg_btn" v-else @click="rygzSave('pxqk')">
              <i class="iconfont">&#xe663;</i>
              <span>完成</span>
            </div>
          </div>
          <div class="list_wrap" :class="{'bj_list':!pxqk_editFlag}">
            <el-row class="table_row">
              <el-col :span="2">序号</el-col>
              <el-col :span="5">参加培训名称</el-col>
              <el-col :span="5">培训起始日期</el-col>
              <el-col :span="5">培训终止日期</el-col>
              <el-col :span="5">培训主办单位</el-col>
              <!-- <el-col :span="3">参加培训类别</el-col> -->
              <!-- <el-col :span="4">培训学习单位名称</el-col> -->
              <el-col :span="2"></el-col>
            </el-row>
            <el-form ref="pxqk_form" :model="pxqk" :rules="rules_pxqk">
              <el-row
                :class="{'row_class':true, 'row_class2':index%2==0}"
                v-for="(item,index) in pxqk.rypxqks"
                :key="index"
              >
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="5">
                  <el-form-item :prop="'rypxqks.' + index + '.cjpxmc'" :rules="rules_pxqk.cjpxmc">
                    <span
                      v-if="pxqk_editFlag"
                      class="list_text"
                      :title="item.cjpxmc"
                    >{{item.cjpxmc}}</span>
                    <el-input v-else v-model="item.cjpxmc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'rypxqks.' + index + '.pxqsrq'" :rules="rules_pxqk.pxqsrq">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="pxqk_editFlag"
                      v-model="item.pxqsrq"
                      v-if="pxqkTimeFlag"
                    ></el-date-picker>
                    <el-input v-model="item.pxqsrq" :disabled="pxqk_editFlag" v-if="!pxqkTimeFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'rypxqks.' + index + '.pxzzrq'" :rules="rules_pxqk.pxzzrq">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      :disabled="pxqk_editFlag"
                      v-model="item.pxzzrq"
                      v-if="pxqkTimeFlag2"
                    ></el-date-picker>
                    <el-input v-model="item.pxzzrq" :disabled="pxqk_editFlag" v-if="!pxqkTimeFlag2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :prop="'rypxqks.' + index + '.pxzbdw'" :rules="rules_pxqk.pxzbdw">
                    <span
                      v-if="pxqk_editFlag"
                      class="list_text"
                      :title="item.pxzbdw"
                    >{{item.pxzbdw}}</span>
                    <el-input v-else v-model="item.pxzbdw"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="3">
                  <el-form-item>
                    <el-input v-model="item.cjpxlb" :disabled="pxqk_editFlag"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-input v-model="item.pxxxdwmc" :disabled="pxqk_editFlag"></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col :span="2">
                  <i class="iconfont del_icon" @click="del(pxqk.rypxqks,'pxqk',item,index)">&#xe606;</i>
                </el-col>
              </el-row>
              <el-row class="zwsj" v-if="pxqk.rypxqks == ''">暂无数据</el-row>
            </el-form>
            <el-row v-if="!pxqk_editFlag">
              <el-col>
                <div class="add_btn" @click="addList('pxqk')">
                  <i class="iconfont">&#xe62d;</i>
                  <span>新增</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/common/scss/public.scss";
import "@/common/scss/jcxx.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getData } from "@/common/js/common";
import { log } from 'util';
export default {
  name: "",
  components: {},
  data() {
    var _this = this;
    return {
      imgShow: false,
      imgShowMan: true,
      imgShowWomen: false,
      imgShowI: true,
      uploadUrl: conf.urlPrefix + '/dagl/profiles?grbh=' + this.$route.query.grbh,
      pickerOptions0: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date(
              JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
            ).getTime()
          );
        }
      },
      navBarFixed: false,
      jcxx_editFlag: true,
      gzxx_editFlag: true,
      xlxw_editFlag: true,
      xzzw_editFlag: true,
      jc_editFlag: true,
      pxqk_editFlag: true,
      kycg_editFlag: true,
      qsxx_editFlag: true,
      yynl_editFlag: true,
      cgjl_editFlag: true,
      zcxx_editFlag: true,
      zyzg_editFlag: true,
      zcxxTimeFlag: true,
      zcxxTimeFlag2: true,
      gzxxTimeFlag: true,
      gzxxTimeFlag2: true,
      zyzgTimeFlag: true,
      xlxwTimeFlag: true,
      xlxwTimeFlag2: true,
      jcTimeFlag: true,
      pxqkTimeFlag: true,
      pxqkTimeFlag2: true,
      options_two: [], //2级行政区划
      options_four: [], //4级行政区划
      jg_arr: [],
      csd_arr: [],
      hjd_arr: [],
      xzz_arr: [],
      zzmm_dmb: "",
      xx_dmb: "",
      mz_dmb: "",
      jkzk_dmb: "",
      hyzk_dmb: "",
      xl_dmb: "",
      zylb_dmb: "",
      qscw_dmb: "",
      zcjb_dmb: "",
      zyzgmc_dmb: "",
      zyzgdj_dmb: "",
      zc_dmb: "",
      yz_dmb: "",
      yzslcd_dmb: "",
      jclb_dmb: "",
      jlmc_dmb: "",
      cfmc_dmb: "",
      table_name: "",
      grbh: this.$route.query.grbh,
      //基础信息数据
      jcxx_data: {
        sfzhm: "",
        xm: "",
        xbmc: "",
        zzmmmc: "",
        xlmc: "",
        cdbh: "",
        nl: "",
        dayxid: "",
        cdid: "",
        mzmc: "",
        csrq: ""
      },
      jump: "0",
      imgSrc: '',
      jcxx_formData: {
        // xm:"",
        // cym:"",
        // zgxl:"",
        // mz: "",
        // zzmm: "",
        // rdsj:"",
        // jg: "",
        // csd: "",
        // cjgzsj: "",
        // hjxzqh:"",
        // hjdz: "",
        // xzzxzqh:"",
        // xzz: "",
        // xzzyb: "",
        // dh: "",
        // sj: "",
        // dzyx:"",
        // hyzk: ""
      },
      // 基础信息校验
      rules1: {
        xm: [{ validator: validator('50, "full", "姓名", false') }],
        cym: [{ validator: validator('50, "full", "曾用名", true') }],
        zgxl: [{ validator: validator('2, "full", "学历", true') }],
        mz: [{ validator: validator('2, "full", "民族", true') }],
        zzmm: [{ validator: validator('2, "full", "政治面貌", true') }],
        rdsj: [
          {
            type: "string",
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        jg: [{ validator: validator('12, "full", "籍贯", true') }],
        csd: [{ validator: validator('12, "full", "出生地", true') }],
        cjgzsj: [
          {
            type: "string",
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        hjxzqh: [{ validator: validator('12, "full", "户籍行政区划", true') }],
        hjdz: [{ validator: validator('128, "full", "户籍详细地址", true') }],
        xzzxzqh: [
          { validator: validator('12, "full", "现住址行政区划", true') }
        ],
        xzz: [{ validator: validator('128, "full", "现住址详细地址", true') }],
        xzzyb: [{ validator: validator('6, "yb", "现住址邮编", true') }],
        dh: [{ validator: validator('32, "less", "固定电话", true') }],
        sj: [{ validator: validator('11, "sjh", "手机", true') }],
        dzyx: [{ validator: validator('64, "email", "电子邮箱", true') }],
        hyzk: [{ validator: validator('2, "full", "婚姻状况", true') }]
      },
      // 工作信息数据
      gzxx: {
        rygzs: []
      },
      rules_gzxx: {
        gzdwmc: [
          { validator: validator('128, "full", "工作单位名称", false') }
        ],
        gzkssj: [{ validator: validator('10, "full", "工作开始时间", true') }],
        gzjssj: [{ validator: validator('10, "full", "工作结束时间", true') }],
        csgzhdrzw: [
          { validator: validator('64, "full", "从事工作或担任职务", true') }
        ],
        zwgwlx: [
          { validator: validator('64, "full", "工作职位（岗位）类型", true') }
        ],
        dwzmr: [{ validator: validator('40, "full", "单位证明人", true') }]
      },
      // 学历学位数据
      xlxw: {
        ryxlxws: []
      },
      rules_xlxw: {
        xl: [{ validator: validator('2, "full", "学历", false') }],
        sfdyxl: [{ validator: validator('1, "full", "是否第一学历", true') }],
        rxrq: [{ validator: validator('10, "full", "入校日期", true') }],
        byrq: [{ validator: validator('10, "full", "毕业日期", true') }],
        byyx: [{ validator: validator('128, "full", "毕业院校", true') }],
        zylb: [{ validator: validator('64, "full", "专业名称", true') }]
      },
      // 奖惩数据
      jc: {
        ryjcs: []
      },
      rules_jc: {
        jclb: [{ validator: validator('1, "full", "奖惩类别", false') }],
        jcmc: [{ validator: validator('4, "full", "奖惩名称", false') }],
        jcpzrq: [{ validator: validator('10, "full", "奖惩批准日期", true') }],
        // jcpzjgmc: [{ validator: validator('128, "full", "奖惩批准机关名称", true') }],
        jcyy: [{ validator: validator('128, "full", "奖惩原因", true') }]
        // jccxrq: [{ validator: validator('10, "full", "奖惩撤销日期", true') }],
        // xzcf: [{ validator: validator('128, "full", "行政处罚", true') }],
        // xzxscf: [{ validator: validator('128, "full", "行政、刑事处罚", true') }]
      },
      // 培训情况数据
      pxqk: {
        rypxqks: []
      },
      rules_pxqk: {
        cjpxmc: [{ validator: validator('64, "full", "参加培训名称", false') }],
        pxqsrq: [{ validator: validator('10, "full", "培训起始日期", true') }],
        pxzzrq: [{ validator: validator('10, "full", "培训终止日期", true') }],
        pxzbdw: [{ validator: validator('128, "full", "培训主办单位", true') }]
        // cjpxlb: [{ validator: validator('2, "full", "参加培训类别", true') }],
        // pxxxdwmc: [{ validator: validator('128, "full", "培训学习单位名称", true') }],
      },
      // 亲属信息数据
      qsxx: {
        ryjtqks: []
      },
      rules_qsxx: {
        qscw: [{ validator: validator('64, "full", "亲属称谓", false') }],
        qsxm: [{ validator: validator('32, "full", "亲属姓名", false') }],
        gzdw: [{ validator: validator('128, "full", "工作单位", true') }],
        gzzw: [{ validator: validator('32, "full", "工作职务", true') }]
      },
      // 语言能力
      yynl: {
        yzxxs: []
      },
      rules_yynl: {
        yz: [{ validator: validator('2, "full", "语种", false') }],
        yzslcd: [{ validator: validator('1, "full", "语种熟练程度", true') }]
      },
      // 职称信息数据
      zcxx: {
        ryzcs: []
      },
      rules_zcxx: {
        zyjszcmc: [{ validator: validator('128, "less", "专业技术职称", false') }],
        zcjb: [{ validator: validator('3, "full", "职称级别", false') }],
        zcpdsj: [{ validator: validator('10, "full", "职称评定时间", true') }],
        zcpsdw: [{ validator: validator('128, "full", "职称评审单位", true') }],
        zyjszwmc: [
          { validator: validator('128, "full", "专业技术职务名称", true') }
        ],
        zyjszwprsj: [
          { validator: validator('10, "full", "专业技术职务聘任时间", true') }
        ]
      },
      // 职业资格数据
      zyzg: {
        ryzyzgs: []
      },
      rules_zyzg: {
        zyzgmc: [{ validator: validator('64, "less", "职业资格名称", false') }],
        zyzgdj: [{ validator: validator('2, "full", "职业资格等级", true') }],
        jspdsj: [{ validator: validator('10, "full", "技术评定时间", true') }],
        jspsdw: [{ validator: validator('64, "full", "技术评审单位", true') }]
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
      }
    };
  },
  methods: {
    //模糊查询 职业资格信息
    querySearch_zy(queryString, cb) {
      this.querySearch(queryString, cb, "/dagl/hdzyjszc", 'ryzgs', 'zyzgmc')
    },
    //下拉选 职业资格信息
    handleSelect_zy(item,i, arr){
      this.handleSelect(item,i, arr, 'zyzgmcName', 'zyzgmc')
    },
    // 失焦  职业资格信息
    on_blurzy(i, arr){
      this.on_blur(i, arr, 'zyzgmcName', 'zyzgmc')
    },
    //模糊查询 职称信息
    querySearch_zc(queryString, cb) {
      this.querySearch(queryString, cb, "/dagl/hdzccx", 'ryzcs', 'zyjszc')
    },
    // 自动获取焦点
    zc_focus(event){
      event.path[3].firstElementChild.focus()
    },
    //下拉选 职称信息
    handleSelect_zc(item,i, arr){
      this.handleSelect(item,i, arr, 'zyjszcmc', 'zyjszc')
    },
    // 失焦  职称信息
    on_blurzc(i, arr){
      this.on_blur(i, arr, 'zyjszcmc', 'zyjszc')
    },
    // calldata returnData返回的字段
    querySearch(query, cb, url, calldata, red){
      var list = [{}];
      $({
        url: url,
        method: "get",
        params: {
          zc: query
        }
      }).then(res => {
        var _data = res.returnData;
        if (+_data.executeResult == 1) {
          if (_data[calldata]) {
            if (_data[calldata].length == 0) {
              this.$message.error('没有数据信息！');
            }
            for (let i of _data[calldata]) {
              i.value = i[red]; //将想要展示的数据作为value
            }
            list = _data[calldata];
            cb(list);
          }
        }
      });
    },
    //模糊查询下拉选
    handleSelect(item,i, arr, mc, id) {
      if (arr) {
          arr.forEach( (val, j) =>{
            if (item.dmid) {
            arr[i][mc] = item.value
            arr[i][id] = item.dmid
            }else {
              arr[i][mc] = ''
              arr[i][id] = ''
            }
          })
      }
    },
    //模糊查询 失焦
    on_blur(i, arr, mc, id) {
      if (arr) {
        arr.forEach( (val, j) =>{
          arr[i][id] ? "" : (arr[i][mc] = "");
        })
      }else {
        arr[0][id] = item.dmid
      }
    },
    // 返回
    back(){
      this.$router.push({ path: "/dagl/daSearch" })
    },
    // 自定义上传
    // upLoad (file) {
    //   // const formData1 = new FormData()
    //   // console.log(file.file);
      
    //   // formData1.append('profile',file.file)
    //   // console.log(formData);
    //   // formData.append('grbh',this.grbh)
    //   $.put('/dagl/profiles?grbh='+this.grbh,{profiles:file.file}).then(res => res.data)
    //   .then(data => {
    //     console.log(data)
    //     // if(data.code === 200){
    //     //   this.imgurl = data.data[0]
    //     // }
    //   })
    // },
    // 成功
    handleAvatarSuccess(res, file) {
        this.$message({
          type: "success",
          center: true,
          message: res.returnData.message
        });
        this.imgShow = true,
        this.imgShowMan = false,
        this.imgShowWomen = false,
        this.imgShowI = false,
        this.imgSrc = conf.urlPrefix + '/dagl/txck?zplj=' + res.returnData.imgpath + '&grbh=' + this.grbh
      },
      beforeAvatarUpload(file) {
        const supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if(supportedTypes.indexOf(file.type)<0){
            this.$message.error('文件格式只支持：jpg、jpeg 和 png');
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
      },
    yxxxQh() {
      if (this.jump == 1) {
        var _this = this;
        this.$nextTick(() => {
          _this.powerCheck("/dagl/yxxx", function() {
            // if (!_this.jcxx_data.dayxid) {
            //   _this.$alert("该人员没有影像信息！", {
            //     center: true,
            //     confirmButtonText: "确定"
            //   });
            // } else {
              _this.$router.push({
                name: "imgModule",
                query: {
                  grbh: _this.grbh,
                  cdid: _this.jcxx_data.cdid,
                  dayxid: _this.jcxx_data.dayxid,
                  xm: _this.jcxx_data.xm
                }
              });
            // }
          });
        });
      }
    },
    // 菜单实现锚点跳转，且地址栏url不变
    menu(obj) {
      document.querySelector(obj).scrollIntoView(true);
    },
    //左侧菜单定位
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 170) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    // 行政区划查询
    xzqhCx() {
      $.get("/xzqh2.json").then(res => {
        this.options_two = res.returnData.xzqhlb;
      });
      $.get("/xzqh4.json").then(res => {
        this.options_four = res.returnData.xzqhlb;
      });
    },
    // 获取行政区划最后一级传给后台
    handleChange(obj) {
      if (obj == "csd") {
        this.jcxx_formData.csd = this.csd_arr[this.csd_arr.length - 1];
      } else if (obj == "hjd") {
        this.jcxx_formData.hjxzqh = this.hjd_arr[this.hjd_arr.length - 1];
      } else if (obj == "xzz") {
        this.jcxx_formData.xzzxzqh = this.xzz_arr[this.xzz_arr.length - 1];
      } else if (obj == "jg") {
        this.jcxx_formData.jg = this.jg_arr[this.jg_arr.length - 1];
      }
    },
    // 行政区划回显
    xzqh_arr(str) {
      var arr = [];
      if (str) {
        var xzqh_dl = str.substring(0, 2) + "0000000000";
        var xzqh_zl = str.substring(0, 6) + "000000";
        arr.push(xzqh_dl);
        arr.push(xzqh_zl);
        if (str.substring(8, 9) != "0") {
          arr.push(str);
        }
        return arr;
      }
    },
    // 代码表查询
    dmbCx() {
      var _this = this;
      _this.table_name =
        "szdayy_d_zzmm,szdayy_d_xx,szdayy_d_mz,szdayy_d_jkzk,szdayy_d_hyzk,szdayy_d_xl,szdayy_d_zylb,szdayy_d_qsgx,szdayy_d_zcjb,szdayy_d_zyzgmc,szdayy_d_zyzgdj,szdayy_d_zc,szdayy_d_yz,szdayy_d_slcd,szdayy_d_jclb,szdayy_d_jlmc,szdayy_d_cfmc";
      $.get("/dmbgl/dgdmblbCx", {
        params: { table_names: _this.table_name }
      }).then(res => {
        var result = res.returnData.dmblb;
        _this.zzmm_dmb = result.szdayy_d_zzmm;
        _this.xx_dmb = result.szdayy_d_xx;
        _this.mz_dmb = result.szdayy_d_mz;
        _this.jkzk_dmb = result.szdayy_d_jkzk;
        _this.hyzk_dmb = result.szdayy_d_hyzk;
        _this.xl_dmb = result.szdayy_d_xl;
        _this.zylb_dmb = result.szdayy_d_zylb;
        _this.qscw_dmb = result.szdayy_d_qsgx;
        _this.zcjb_dmb = result.szdayy_d_zcjb;
        _this.zyzgmc_dmb = result.szdayy_d_zyzgmc;
        _this.zyzgdj_dmb = result.szdayy_d_zyzgdj;
        _this.zc_dmb = result.szdayy_d_zc;
        _this.yz_dmb = result.szdayy_d_yz;
        _this.yzslcd_dmb = result.szdayy_d_slcd;
        _this.jclb_dmb = result.szdayy_d_jclb;
        _this.jlmc_dmb = result.szdayy_d_jlmc;
        _this.cfmc_dmb = result.szdayy_d_cfmc;
      });
    },
    jclb() {
      // (this.jc.ryjcs.jcmc)
      this.jc.ryjcs.jcmc = "";
    },
    // 基础信息查询
    jcxxCx() {
      this.LoadOn();
      $.get("/dagl/ryjbxxCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          var _res = res.returnData.ryjbxx;
          if (_res.zplj !== '') {
            this.imgShow = true,
            this.imgShowMan = false,
            this.imgShowWomen = false,
            this.imgShowI = false,
            this.imgSrc = conf.urlPrefix + '/dagl/txck?zplj=' + _res.zplj + '&grbh=' + this.grbh
          }
          if (_res.xb == '2' && _res.zplj == '') {
            this.imgShow = false
            this.imgShowMan = false
            this.imgShowWomen = true
            this.imgShowI = true
          } else if (_res.xb == '1' && _res.zplj == '') {
            this.imgShow = false
            this.imgShowMan = true
            this.imgShowWomen = false
            this.imgShowI = true
          }
          this.jcxx_data.xm = _res.xm;
          this.jcxx_data.sfzhm = _res.sfzhm;
          this.jcxx_data.xbmc = _res.xbmc;
          this.jcxx_data.xlmc = _res.xlmc;
          this.jcxx_data.zzmmmc = _res.zzmmmc;
          this.jcxx_data.cdbh = _res.cdbh;
          this.jcxx_data.nl = _res.nl;
          this.jcxx_data.dayxid = _res.dayxid;
          this.jcxx_data.cdid = _res.cdid;
          this.jcxx_data.mzmc = _res.mzmc;
          this.jcxx_data.csrq = _res.csrq;
          this.jcxx_data.ycddwmc = _res.ycddwmc;
          this.jcxx_data.dwmc = _res.dwmc;
          this.jump = "1";
          this.jcxx_formData = _res;
          this.$nextTick(() => {
            this.$refs.jcxxForm.clearValidate();
          });
          this.jg_arr = this.xzqh_arr(_res.jg); // 籍贯
          this.csd_arr = this.xzqh_arr(_res.csd); //出生地
          this.hjd_arr = this.xzqh_arr(_res.hjxzqh);  //户籍行政区划
          this.xzz_arr = this.xzqh_arr(_res.xzzxzqh);//现住址行政区划
          this.LoadClose();
        }
      });
    },
    // 工作信息查询
    gzxxCx() {
      $.get("/dagl/rygzxxCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.gzxx.rygzs = res.returnData.rygzs;
          this.gzxx.rygzs.forEach( item =>{
            if (item.gzkssj && item.gzkssj.length !== 10) {
              this.gzxxTimeFlag = false
            }
            if (item.gzjssj && item.gzjssj.length !== 10) {
              this.gzxxTimeFlag2 = false
            }
          })
        }
      });
    },
    // 学历学位查询
    xlxwCx() {
      $.get("/dagl/ryxlxwCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.xlxw.ryxlxws = res.returnData.ryxlxws;
          this.xlxw.ryxlxws.forEach( item =>{
            if (item.rxrq && item.rxrq.length !== 10) {
              this.xlxwTimeFlag = false
            }
            if (item.byrq && item.byrq.length !== 10) {
              this.xlxwTimeFlag2 = false
            }
          })
        }
      });
    },
    // 奖惩查询
    jcCx() {
      $.get("/dagl/ryjcxxCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.jc.ryjcs = res.returnData.ryjcs;
          this.jc.ryjcs.forEach( item =>{
            if (item.jcpzrq && item.jcpzrq.length !== 10) {
              this.jcTimeFlag = false
            }
          })
        }
      });
    },
    // 培训情况查询
    pxqkCx() {
      $.get("/dagl/rypxqkCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.pxqk.rypxqks = res.returnData.rypxqks;
          this.pxqk.rypxqks.forEach( item =>{
            if (item.pxqsrq && item.pxqsrq.length !== 10) {
              this.pxqkTimeFlag = false
            }
            if (item.pxzzrq && item.pxzzrq.length !== 10) {
              this.pxqkTimeFlag2 = false
            }
          })
        }
      });
    },
    // 亲属信息查询
    qsxxCx() {
      $.get("/dagl/ryjtqkCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.qsxx.ryjtqks = res.returnData.ryjtqks;
        }
      });
    },
    // 语言能力查询
    yynlCx() {
      $.get("/dagl/ryyynlCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.yynl.yzxxs = res.returnData.yzxxs;
        }
      });
    },
    // 职称信息查询
    zcxxCx() {
      $.get("/dagl/ryzcCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.zcxx.ryzcs = res.returnData.ryzcs;
          this.zcxx.ryzcs.forEach( item =>{
            if (item.zcpdsj && item.zcpdsj.length !== 10) {
              this.zcxxTimeFlag = false
            }
            if (item.zyjszwprsj && item.zyjszwprsj.length !== 10) {
              this.zcxxTimeFlag2 = false
            }
          })
        }
      });
    },
    // 专业资格查询
    zyzgCx() {
      $.get("/dagl/ryzyzgCx", { params: { grbh: this.grbh } }).then(res => {
        if (res.returnData.executeResult == "1") {
          this.zyzg.ryzyzgs = res.returnData.ryzyzgs;
          this.zyzg.ryzyzgs.forEach( item =>{
            if (item.jspdsj && item.jspdsj.length !== 10) {
              this.zyzgTimeFlag = false
            }
          })
        }
      });
    },
    // 基本信息保存
    jcxxBc() {
      this.$refs["jcxxForm"].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.jcxx_formData.grbh = this.grbh;
              $({
                url: "/dagl/ryjbSave",
                method: "post",
                data: this.jcxx_formData
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.jcxx_editFlag = true;
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.jcxxCx();
                  this.$refs["jcxxForm"].resetFields();
                } else {
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
    // tabla列表新增点击事件
    addList(obj) {
      if (obj == "gzxx") {
        this.$refs["gzxx_form"].validate(valid => {
          if (valid) {
            if (this.gzxx.rygzs.length < 10) {
              this.gzxx.rygzs.push({
                grbh: this.grbh,
                gzdwmc: "",
                gzkssj: "",
                gzjssj: "",
                csgzhdrzw: "",
                zwgwlx: "",
                dwzmr: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "xlxw") {
        this.$refs["xlxw_form"].validate(valid => {
          if (valid) {
            if (this.xlxw.ryxlxws.length < 10) {
              this.xlxw.ryxlxws.push({
                xl: "",
                sfdyxl: "",
                rxrq: "",
                byrq: "",
                byyx: "",
                zylb: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "jc") {
        this.$refs["jc_form"].validate(valid => {
          if (valid) {
            if (this.jc.ryjcs.length < 10) {
              this.jc.ryjcs.push({
                jclb: "",
                jcmc: "",
                jcpzrq: "",
                // jcpzjgmc: "",
                jcyy: ""
                // jccxrq: "",
                // xzcf: "",
                // xzxscf: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "pxqk") {
        this.$refs["pxqk_form"].validate(valid => {
          if (valid) {
            if (this.pxqk.rypxqks.length < 10) {
              this.pxqk.rypxqks.push({
                cjpxmc: "",
                pxqsrq: "",
                pxzzrq: "",
                pxzbdw: ""
                // cjpxlb: "",
                // pxxxdwmc: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "qsxx") {
        this.$refs["qsxx_form"].validate(valid => {
          if (valid) {
            if (this.qsxx.ryjtqks.length < 15) {
              this.qsxx.ryjtqks.push({
                qscw: "",
                qsxm: "",
                gzdw: "",
                gzzw: ""
              });
            } else {
              this.$alert("新增数据不能超过15条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "yynl") {
        this.$refs["yynl_form"].validate(valid => {
          if (valid) {
            if (this.yynl.yzxxs.length < 10) {
              this.yynl.yzxxs.push({
                yz: "",
                yzslcd: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "zcxx") {
        this.$refs["zcxx_form"].validate(valid => {
          if (valid) {
            if (this.zcxx.ryzcs.length < 10) {
              this.zcxx.ryzcs.push({
                zyjszc: "",
                zcjb: "",
                zcpdsj: "",
                zcpsdw: "",
                zyjszwmc: "",
                zyjszwprsj: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      } else if (obj == "zyzg") {
        this.$refs["zyzg_form"].validate(valid => {
          if (valid) {
            if (this.zyzg.ryzyzgs.length < 10) {
              this.zyzg.ryzyzgs.push({
                zyzgmc: "",
                zyzgdj: "",
                jspdsj: "",
                jspsdw: ""
              });
            } else {
              this.$alert("新增数据不能超过10条", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          }
        });
      }
    },
    // 列表删除方法  list:当前列表的数据对应的数组；name:当前需要删除那一行的标志;item:当前删除这一行的数据；index：当前这一行的序号
    del(list, name, item, index) {
      if (name == "gzxx") {
        if (this.gzxx_editFlag == true) {
          var gzxxDel_data = {
            grbh: this.grbh,
            // gzdwmc: item.gzdwmc,
            // gzkssj: item.gzkssj
            gzid: item.gzid
          };
          this.delCom("/dagl/rygzDelete", gzxxDel_data, this.gzxxCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "xlxw") {
        if (this.xlxw_editFlag == true) {
          var xlxwDel_data = {
            grbh: this.grbh,
            // xl: item.xl
            xlid: item.xlid
          };
          this.delCom("/dagl/ryxlxwDelete", xlxwDel_data, this.xlxwCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "jc") {
        if (this.jc_editFlag == true) {
          var jcDel_data = {
            grbh: this.grbh,
            // jclb: item.jclb,
            // jcmc: item.jcmc
            jcid: item.jcid
          };
          this.delCom("/dagl/ryjcDelete", jcDel_data, this.jcCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "pxqk") {
        if (this.pxqk_editFlag == true) {
          var pxqkDel_data = {
            grbh: this.grbh,
            // cjpxmc: item.cjpxmc
            pxid: item.pxid
          };
          this.delCom("/dagl/rypxqkDelete", pxqkDel_data, this.pxqkCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "qsxx") {
        if (this.qsxx_editFlag == true) {
          var qsxxDel_data = {
            grbh: this.grbh,
            qsid: item.qsid
            // qscw: item.qscw,
            // qsxm: item.qsxm
          };
          this.delCom("/dagl/jtqkDelete", qsxxDel_data, this.qsxxCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "yynl") {
        if (this.yynl_editFlag == true) {
          var yynlDel_data = {
            grbh: this.grbh,
            // yz: item.yz
            yzid: item.yzid
          };
          this.delCom("/dagl/deleteRyyzxx", yynlDel_data, this.yynlCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "zcxx") {
        if (this.zcxx_editFlag == true) {
          // var zcxxDel_data = {
          //   grbh: this.grbh,
          //   zyjszc: item.zyjszc,
          //   zcjb: item.zcjb
          // };
          var zcxxDel_data = {
            grbh: this.grbh,
            zcid: item.zcid
          };
          this.delCom("/dagl/zcxxDelete", zcxxDel_data, this.zcxxCx);
        } else {
          this.delBd(list, index);
        }
      } else if (name == "zyzg") {
        if (this.zyzg_editFlag == true) {
          // var zyzgDel_data = {
          //   grbh: this.grbh,
          //   zyzgmc: item.zyzgmc,
          //   zyzgdj: item.zyzgdj
          // };
          var zyzgDel_data = {
            grbh: this.grbh,
            zyzgid: item.zyzgid
          };
          this.delCom("/dagl/zyzgDelete", zyzgDel_data, this.zyzgCx);
        } else {
          this.delBd(list, index);
        }
      }
    },
    // 通过接口删除的方法
    delCom(url, data, fun) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $({
          url: url,
          method: "post",
          data: data
        }).then(res => {
          var _res = res.returnData;
          if (+_res.executeResult === 1) {
            fun();
            this.$message({
              type: "success",
              center: true,
              message: res.returnMsg
            });
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
      });
    },
    // 通过本地删除方法
    delBd(arr, index) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
      arr.some((item, i) => {
        if (i == index) {
          arr.splice(i, 1);
          // 在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          return true;
        }
      });
      });
    },
    // 信息列表保存接口
    rygzSave(name) {
      if (name == "gzxx") {
        this.gzxx.rygzs.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          gzxxs: this.gzxx.rygzs,
          grbh: this.grbh
        };
        if (this.gzxx.rygzs.length == 0) {
          //判断没有数据点保存时不走后台
          this.gzxx_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.gzxx.rygzs, "gzdwmc", "gzkssj")) {
            this.$alert("请不要输入相同的工作单位名称和工作开始时间！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc(
              "gzxx_form",
              "/dagl/rygzSave",
              _data,
              "gzxx",
              this.gzxxCx
            );
          }
        }
      } else if (name == "xlxw") {
        this.xlxw.ryxlxws.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          xlxws: this.xlxw.ryxlxws,
          grbh: this.grbh
        };
        if (this.xlxw.ryxlxws.length == 0) {
          this.xlxw_editFlag = true;
        } else {
          this.listBc(
            "xlxw_form",
            "/dagl/ryxlxwSave",
            _data,
            "xlxw",
            this.xlxwCx
          );
          //判断是否有重复数据
          // if(this.qcArr(this.xlxw.ryxlxws,'xl')){
          //   this.$alert('请不要输入相同的学历！', {
          //     center: true,
          //     confirmButtonText: "确定"
          //   });
          // }else{

          // var num = 0;
          // _data.xlxws.forEach((v,k)=>{
          //     if(v.sfdyxl == 1){
          //       num++
          //     }
          //     if(k == _data.xlxws.length -1){
          //       if(num >1){
          //         this.$alert('只能有一个第一学历！', {
          //         center: true,
          //         confirmButtonText: "确定"
          //         });
          //       }else{
          //         this.listBc('xlxw_form',"/dagl/ryxlxwSave",_data,'xlxw',this.xlxwCx);
          //       }
          //     }
          // })
          // }
        }
      } else if (name == "jc") {
        this.jc.ryjcs.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          jcxxs: this.jc.ryjcs,
          grbh: this.grbh
        };
        if (this.jc.ryjcs.length == 0) {
          this.jc_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.jc.ryjcs, "jclb", "jcmc", "jcpzrq")) {
            this.$alert("同一天内不能录入相同的奖惩信息！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc("jc_form", "/dagl/ryjcSave", _data, "jc", this.jcCx);
          }
        }
      } else if (name == "pxqk") {
        this.pxqk.rypxqks.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          pxqks: this.pxqk.rypxqks,
          grbh: this.grbh
        };
        if (this.pxqk.rypxqks.length == 0) {
          this.pxqk_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.pxqk.rypxqks, "cjpxmc")) {
            this.$alert("请不要输入相同的参加培训名称！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc(
              "pxqk_form",
              "/dagl/rypxqkSave",
              _data,
              "pxqk",
              this.pxqkCx
            );
          }
        }
      } else if (name == "qsxx") {
        this.qsxx.ryjtqks.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          jtqks: this.qsxx.ryjtqks,
          grbh: this.grbh
        };
        if (this.qsxx.ryjtqks.length == 0) {
          this.qsxx_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.qsxx.ryjtqks, "qscw", "qsxm")) {
            this.$alert("请不要输入相同的亲属称谓和亲属姓名！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc(
              "qsxx_form",
              "/dagl/jtqkSave",
              _data,
              "qsxx",
              this.qsxxCx
            );
          }
        }
      } else if (name == "yynl") {
        this.yynl.yzxxs.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          yzxxs: this.yynl.yzxxs,
          grbh: this.grbh
        };
        if (this.yynl.yzxxs.length == 0) {
          this.yynl_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.yynl.yzxxs, "yz")) {
            this.$alert("请不要输入相同的语种！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc(
              "yynl_form",
              "/dagl/yynlSave",
              _data,
              "yynl",
              this.yynlCx
            );
          }
        }
      } else if (name == "zcxx") {
        this.zcxx.ryzcs.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          zcxxs: this.zcxx.ryzcs,
          grbh: this.grbh
        };
        if (this.zcxx.ryzcs.length == 0) {
          this.zcxx_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.zcxx.ryzcs, "zcjb", "zyjszc")) {
            this.$alert("请不要输入相同的专业技术职称和职称级别！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc(
              "zcxx_form",
              "/dagl/zcxxSave",
              _data,
              "zcxx",
              this.zcxxCx
            );
          }
        }
      } else if (name == "zyzg") {
        this.zyzg.ryzyzgs.map(item => {
          return (item.grbh = this.grbh);
        });
        var _data = {
          zyzgs: this.zyzg.ryzyzgs,
          grbh: this.grbh
        };
        console.log(this.zyzg.ryzyzgs);
        
        if (this.zyzg.ryzyzgs.length == 0) {
          this.zyzg_editFlag = true;
        } else {
          //判断是否有重复数据
          if (this.qcArr(this.zyzg.ryzyzgs, "zyzgdj", "zyzgmc")) {

            this.$alert("请不要输入相同的职业资格名称和职业资格等级！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.listBc(
              "zyzg_form",
              "/dagl/zyzgSave",
              _data,
              "zyzg",
              this.zyzgCx
            );
          }
        }
      }
    },
    // 列表保存的公共方法 form:校验的表单；url：保存的接口名；Data：接口保存传的参数；flag：对呀切换的标志；fun：重新查询数据的方法
    listBc(form, url, Data, flag, fun) {
      var _this = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $({
                url: url,
                method: "post",
                data: Data
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  const _name = flag + "_editFlag";
                  this[_name] = true;
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  fun();
                  this.$refs[form].resetFields();
                } else {
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
    // tabla列表编辑点击事件
    editList(dome) {
      const _name = dome + "_editFlag";
      this[_name] = false;
      // 时间格式
      var _time = dome + "TimeFlag"
      if (_time == 'zcxxTimeFlag') {
      this.TimeEnd(_time, this.zcxx.ryzcs, 'zcpdsj')
      } else if(_time == 'gzxxTimeFlag'){
        this.TimeEnd(_time, this.gzxx.rygzs, 'gzkssj')
      } else if (_time == 'zyzgTimeFlag') {
        this.TimeEnd(_time, this.zyzg.ryzyzgs, 'jspdsj')
      } else if (_time == 'xlxwTimeFlag') {
        this.TimeEnd(_time, this.xlxw.ryxlxws, 'rxrq')
      } else if (_time == 'jcTimeFlag') {
        this.TimeEnd(_time, this.jc.ryjcs, 'jcpzrq')
      } else if (_time == 'pxqkTimeFlag') {
        this.TimeEnd(_time, this.pxqk.rypxqks, 'pxqsrq')
      } 
      var _time2 = dome + "TimeFlag2";
      if (_time2 == 'zcxxTimeFlag2') {
        this.TimeEnd(_time2, this.zcxx.ryzcs, 'zyjszwprsj')
      }else if(_time2 == 'gzxxTimeFlag2'){
        this.TimeEnd(_time2, this.gzxx.rygzs, 'gzjssj')
      }else if (_time2 == 'xlxwTimeFlag2') {
        this.TimeEnd(_time2, this.xlxw.ryxlxws, 'byrq')
      }else if (_time2 == 'pxqkTimeFlag2') {
        this.TimeEnd(_time2, this.pxqk.rypxqks, 'pxzzrq')
      }

      this.addList(dome);
    },
    // 时间格式方法
    TimeEnd(_time, Arr, _item){
      if (!this[_time]) {
        this[_time] = true
        Arr.map(item=>{
          if (item[_item].length != 10) {
            return item[_item] = ''
          } else {
            return item[_item]
          }
        })
      }
    },
    qcArr1(arr, arg) {
      let temp = [];
      let newArr = arr.reduce((acc, cur) => {
        if (temp.indexOf(cur[arg]) === -1) {
          temp.push(cur[arg]);
          acc.push(cur);
          return acc;
        } else {
          return acc;
        }
      }, []);

      // 可以用别的方法判断是否有重复，毕竟已经把重复的项过滤掉了
      let isDuplicate = newArr.length === arr.length;
      return isDuplicate;
    },
    qcArr(arr, ...arg) {
      var flag = false;
      for (var i = 0; i < arr.length; i++) {
        var num = 0;
        for (var j = 0; j < arr.length; j++) {
          var str = `function(){ return`;
          for (var z = 0; z < arg.length; z++) {
            if (z == arg.length - 1) {
              if (arg[z]) {
                str += ` "${arr[i][arg[z]]}" == "${arr[j][arg[z]]}"}`;
              }
            } else {
              if (arg[z]) {
                str += ` "${arr[i][arg[z]]}" == "${arr[j][arg[z]]}" &&`;
              }
            }
          }
          var ssss = eval("(" + str + ")");
          if (ssss()) {
            num++;
            if (num == 2) {
              flag = true;
              break;
            }
          }
        }
        if (flag) {
          break;
        }
      }
      return flag;
    },
    // // 时间格式显示
    // TimeEnd(ActionTime,_item,flag){
    //   if (ActionTime) {
    //     ActionTime.forEach( item =>{
    //       if (item[_item] && item[_item].length !== 10) {
    //         flag = false
    //       }
    //     })
    //   }
    // }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.gzxxCx();
    this.xlxwCx();
    this.jcCx();
    this.pxqkCx();
    this.qsxxCx();
    this.yynlCx();
    this.zcxxCx();
    this.zyzgCx();
    this.dmbCx();
    this.xzqhCx();
    this.handleChange();
    this.jcxxCx();
    // this.clearShearPlate();
    // window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
  }
};
</script>
<style scoped lang="scss">
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
}
.cc_text {
  float: left;
  // width: 58%;
  padding:0 15px;
  font-family: "微软雅黑";
  color: #000 !important;
  moz-user-select: -moz-text;
  -moz-user-select: text;
  -o-user-select: text;
  -khtml-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.list_text {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000;
  min-height: 40px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    // height: 100%;
    // width: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
      width: 116px;
      height: 138px;
      // height: 100%;
      // width: 100%;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    position:absolute;
    left: 0;
    top: 0;
    font-size: 28px;
    color: #fff;
    width: 116px;
    height: 138px;
    line-height: 138px;
    text-align: center;
  }
  .avatar {
    width: 116px;
    height: 138px;
    display: block;
  }
  .back {
    font-weight: 600;
    position: absolute;
    top: 70px;
    right: 2%;
    color: rgb(0, 129, 230);
    cursor: pointer;
  }
   .main> div > div{
    height: 100%;
  }
</style>