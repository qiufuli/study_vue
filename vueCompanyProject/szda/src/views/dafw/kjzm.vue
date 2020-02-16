<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px;height:48px;background: #EAF5FF;">
        <el-breadcrumb-item>
          <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
        </el-breadcrumb-item>
        <el-breadcrumb-item style="line-height: 52px;">开具证明</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base-content kjzm">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="证明打印" name="first">
          <!-- 证明打印 -->
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
            <div class="btn_parent">
              <el-button
                type="primary"
                size="medium"
                @click="handleSubmit(1, 1)"
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
          <!-- 基本信息 -->
          <div class="base-content_public base-content_personMes" v-if="flag">
            <div class="searchResult">
              <my-bread level1="iconjichuxinxi" level2="基础信息"></my-bread>
              <p class="totles" style="color: rgb(64, 158, 255);cursor: pointer;" @click="blank">点击→可查看<b>档案影像</b></p>
            </div>
            <div>
              <el-form :model="BaseFormData" class="BaseFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名：">
                        <!-- @click="see(BaseFormData.grbh)"
                        class="base_input_view HasColor" -->
                      <span
                        class="base_input_view"
                        :title="BaseFormData.xm"
                      >{{BaseFormData.xm}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别：">
                      <input v-model="BaseFormData.xb" readonly class="base_input_view Baseclass">
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="存档日期：">
                      <input v-model="BaseFormData.cdrq" readonly class="base_input_view Baseclass">
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="委托存档单位：">
                        <!-- @click="see(BaseFormData.grbh)"
                        class="base_input_view HasColor" -->
                      <span
                        class="base_input_view"
                        :title="BaseFormData.dwmc">{{BaseFormData.dwmc}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在位置：">
                      <input
                        v-model="BaseFormData.dacfwz"
                        readonly
                        class="base_input_view Baseclass"
                        :title="BaseFormData.dacfwz"
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 证明信息 -->
          <div class="base-content_public" v-if="flag" style="margin-top: 10px;">
            <div>
              <my-bread level1="iconkaijuzhengming" level2="证明信息"></my-bread>
            </div>
            <div class="zmxx_content">
              <el-form ref="forms" :model="zmxxFormData" class="zmxxFormData" :rules="rules1">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开往单位名称：" prop="kwdwmc" required label-width="140px">
                      <el-input v-model="zmxxFormData.kwdwmc"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="单位性质：" prop="dwxz" label-width="120px">
                      <el-select
                        v-model="zmxxFormData.dwxz"
                        value-key="value"
                        :title="dwxzTitle"
                        @change="checkVal"
                        clearable
                      >
                        <el-option
                          :label="item.dmmc"
                          :value="item.dmid"
                          v-for="item in dwxz_dmb"
                          :key="item.dmid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="有效期：" prop="yxq" required label-width="100px">
                      <el-input v-model="zmxxFormData.yxq"></el-input>
                      <span class="yxq">（天）</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-checkbox
                    v-model="zmxxFormData.one"
                  >该同志的人事档案于{{zmxxFormData.cdrq}}至今保存在{{zmxxFormData.dwmc}}，存档编号：{{zmxxFormData.cdbh}}</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox v-model="zmxxFormData.two">
                    该同志于&nbsp;&nbsp;
                    <el-date-picker
                      v-model="zmxxFormData.cjgzsj"
                      align="right"
                      class="cover_width style_cover"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :picker-options="pickerOptions1"
                    ></el-date-picker>参加工作；
                  </el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox v-model="zmxxFormData.three">该同志人事档案中无收入、住房情况记录；</el-checkbox>
                </el-row>
                <el-row class="style_cover">
                  <el-checkbox v-model="zmxxFormData.four">
                    该同志档案&nbsp;&nbsp;
                    <el-select
                      v-model="zmxxFormData.sfyjrzggcdcl"
                      placeholder="请选择"
                      @change="currentSel"
                      class="width_yw"
                    >
                      <el-option label="有" value="1"></el-option>
                      <el-option label="无" value="2"></el-option>
                    </el-select>&nbsp;&nbsp;加入中国共产党的材料
                    <el-form-item label="；入党时间" v-if="zmxx_rq" class="rdsj">
                      <el-date-picker
                        v-model="zmxxFormData.rdsj"
                        class="zmxx_rq"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="；入党材料名称" v-if="zmxx_rq" class="rdclmc" prop="rdclmc">
                      <el-select
                        v-model="zmxxFormData.rdclmc"
                        clearable
                        value-key="value"
                        v-if="rdclmcflag"
                      >
                        <el-option
                          :value="item.rdclmc"
                          v-for="(item,i) in zmxxFormData.rdscmcs"
                          :key="i"
                        ></el-option>
                      </el-select>
                      <el-input
                        v-if="!rdclmcflag"
                        v-model="zmxxFormData.rdclmc"
                        style="width:300px !important;"
                      ></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox v-model="zmxxFormData.five">
                    出生地
                    <el-cascader
                      v-model="csd_arr"
                      @change="handleChange"
                      :options="options"
                      clearable
                      class="style_cover big_width"
                    ></el-cascader>
                    <el-form-item label="，父亲是" prop="fq" class="fq">
                      <el-input v-model="zmxxFormData.fq"></el-input>
                    </el-form-item>
                    <el-form-item label="，母亲是" prop="mq" class="fq">
                      <el-input v-model="zmxxFormData.mq"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-row>
                <el-row style="table_cover">
                  <el-row style="font-size:14px;color: #606266;">职称信息</el-row>
                  <el-table
                    :data="work_tableData"
                    style="width: 100%;margin-bottom: 15px;"
                    @selection-change="work_handleSelectionChange"
                    :header-cell-style="{background:'#e5faff',color:'#ffffff'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="zyjszc" label="专业技术职称" min-width="8%" align="center"></el-table-column>
                    <el-table-column prop="zcjb" label="职称级别" min-width="10%" align="center"></el-table-column>
                    <el-table-column prop="zcpdsj" label="职称评定时间" min-width="10%" align="center"></el-table-column>
                    <el-table-column prop="zcpsdw" label="职称评定单位" min-width="10%" align="center"></el-table-column>
                  </el-table>
                </el-row>
                <el-row style="table_cover">
                  <el-row style="font-size:14px;color: #606266;">履历信息</el-row>
                  <el-table
                    ref="going_multipleTable"
                    :data="going_tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-bottom: 15px;"
                    @selection-change="going_handleSelectionChange"
                    :header-cell-style="{background:'#e5faff',color:'#ffffff'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="gzkssj" label="工作起时间" min-width="8%" align="center"></el-table-column>
                    <el-table-column label="工作结束时间" min-width="10%" align="center">
                      <template slot-scope="scope">{{ scope.row.gzjssj ? scope.row.gzjssj: '至今' }}</template>
                    </el-table-column>
                    <el-table-column prop="gzdwmc" label="工作单位名称" min-width="10%" align="center"></el-table-column>
                    <el-table-column
                      prop="csgzhdrzw"
                      label="从事工作或担任职务"
                      min-width="10%"
                      align="center"
                    ></el-table-column>
                  </el-table>
                </el-row>
                <el-form ref="ArrGoing" :model="GoingFormdata" :rules="rules2" class="xzll">
                  <el-row
                    :class="{'row_class':true, 'row_class2':index%2==0}"
                    v-for="(item,index) in GoingFormdata.ArrGoing"
                    :key="index"
                    style="height:60px;"
                  >
                    <el-col :span="1">{{index+1}}</el-col>
                    <el-col :span="5" style="height:60px">
                      <el-form-item
                        class="clmc"
                        :prop="'ArrGoing.' + index + '.gzkssj'"
                        :rules="rules2.gzkssj"
                        style="height:60px"
                      >
                        <el-date-picker
                          v-model="item.gzkssj"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :picker-options="ksjc_pickerOptionsStart"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" style="height:60px">
                      <el-form-item
                        class="clmc"
                        :prop="'ArrGoing.' + index + '.gzjssj'"
                        :rules="rules2.gzjssj"
                        style="height:60px"
                      >
                        <el-date-picker
                          v-model="item.gzjssj"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :picker-options="jsjc_pickerOptionsEnd"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" style="height:60px">
                      <el-form-item
                        class="clmc"
                        :prop="'ArrGoing.' + index + '.gzdwmc'"
                        :rules="rules2.gzdwmc"
                        style="height:60px"
                      >
                        <el-input v-model="item.gzdwmc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5" style="height:60px">
                      <el-form-item
                        class="clmc lastright"
                        :prop="'ArrGoing.' + index + '.csgzhdrzw'"
                        :rules="rules2.csgzhdrzw"
                        style="height:60px"
                      >
                        <el-input v-model="item.csgzhdrzw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i class="iconfont del_icon" @click="del(index)">&#xe606;</i>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row>
                  <div class="title_r" @click="addList" v-if="llMax">
                    <i class="iconfont">&#xe62d;</i>
                    <span>新增</span>
                  </div>
                </el-row>
                <div class="btn_parent">
                  <el-button type="primary" size="medium" @click="llcheck" class="zmxx_btn">履历信息保存</el-button>
                </div>
                <el-row style="table_cover">
                  <!-- <el-checkbox v-model="zmxxFormData.eight" style="width:100%">亲属信息</el-checkbox> -->
                  <el-row style="font-size:14px;color: #606266;">亲属信息</el-row>
                  <el-table
                    ref="family_multipleTable"
                    :data="family_tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-bottom: 15px;"
                    :header-cell-style="{background:'#e5faff',color:'#ffffff'}"
                    @selection-change="family_handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="qsxm" label="亲属姓名" align="center"></el-table-column>
                    <el-table-column prop="qscw" label="亲属称谓" align="center"></el-table-column>
                  </el-table>
                </el-row>
                <!-- <el-row style="table_cover">
                  <el-checkbox v-model="zmxxFormData.nine">报到信息</el-checkbox>
                  <el-table
                    ref="common_multipleTable"
                    :data="common_tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-bottom: 15px;"
                    @selection-change="common_handleSelectionChange"
                    :header-cell-style="{background:'#e5faff',color:'#ffffff'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="bddw" label="报到单位" width="200" align="center"></el-table-column>
                    <el-table-column prop="bdsj" label="报到时间" width="200" align="center"></el-table-column>
                  </el-table>
                </el-row>-->
                <el-row>
                  <el-checkbox v-model="zmxxFormData.ten">
                    <!-- 其他情况
                    <el-input v-model="zmxxFormData.mail"></el-input>-->
                    <el-form-item label="其他情况" prop="qtqk" class="qtqk fq">
                      <el-input v-model="zmxxFormData.qtqk"></el-input>
                    </el-form-item>
                  </el-checkbox>
                </el-row>
                <div class="btn_parent">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="handleQuire"
                    class="zmxx_btn"
                  >保存并打印</el-button>
                </div>
              </el-form>
            </div>
          </div>
          <!-- 历次开具证明 -->
          <div class="base-content_public" v-if="flag" style="margin-top: 10px;">
            <div>
              <my-bread level1="iconzaitu" level2="历次开具证明"></my-bread>
            </div>
            <div class="table_div">
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="xh" label="序号" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="kwdwmc" label="开往单位名称" min-width="20%" align="center"></el-table-column>
                <el-table-column prop="dwxz" label="单位性质" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="czsj" label="开具日期" min-width="20%" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
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
        <!-- 证明查询 -->
        <el-tab-pane label="证明查询" name="second">
          <el-form
            ref="Search_form"
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
                <el-form-item label="办理日期开始：" prop="blrqks">
                  <el-date-picker
                    v-model="Search_formData.blrqks"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="Search_ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办理日期结束：" prop="blrqjs">
                  <el-date-picker
                    v-model="Search_formData.blrqjs"
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
            <div class="btn_parent">
              <el-button type="primary" size="medium" @click="Search_zmcx(1, 1)" class="base_btn">查询</el-button>
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
              <p class="totles">共{{Search_total}}条</p>
            </div>
            <div class="table_div">
              <el-table :data="zmcx_tableData" @sort-change="sortChange" stripe style="width: 100%">
                <el-table-column prop="xh" label="序号" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="sfzhm" label="身份证号码" sortable='custom' min-width="20%" align="center"></el-table-column>
                <el-table-column prop="xm" label="姓名" sortable='custom' min-width="10%" align="center"></el-table-column>
                <el-table-column prop="cdbh" label="存档编号" sortable='custom' min-width="20%" align="center"></el-table-column>
                <el-table-column prop="czsj" label="操作时间" sortable='custom' min-width="10%" align="center"></el-table-column>
                <el-table-column prop="czy" label="操作员" sortable='custom' min-width="10%" align="center"></el-table-column>
                <el-table-column label="操作" min-width="7%" align="center">
                  <template slot-scope="scope">
                    <span
                      class="Search_dialog"
                      @click="Search_dialog(scope.row.kjid, scope.row.cdid)"
                    >查看</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <el-row class="btn_parent page_style" v-if="Search_totalFlag">
            <el-pagination
              @current-change="SearchCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="Search_total"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 弹出框 -->
      <el-dialog title :visible.sync="table_flag" class="zmx_dialog">
        <div class="da_cotent">
          <el-form :model="Search_dialog_formData">
            <div ref="print" class="zmx" style="padding: 50px 30px 20px 30px;">
              <p class="title_name">证明信</p>
              <p class="title_bh">编号：{{Search_dialog_formData.zmbh}}</p>
              <p class="underline">{{Search_dialog_formData.kwdwmc}}</p>：
              <p>
                <span class="underline first_line">{{Search_dialog_formData.xm}}</span>同志（身份证号：
                <span class="underline">{{Search_dialog_formData.sfzhm}}</span> ）的人事档案保存在
                <span class="underline">{{Search_dialog_formData.dwmc}}</span>。根据有关规定及其人事档案记载，证明情况如下：
              </p>
              <p v-if="Search_dialog_formData.one">
                {{replace_arr('one')}}. 
                该同志的人事档案于
                <span
                  class="underline"
                >{{Search_dialog_formData.cdqsj}}</span>至
                <span class="underline">{{Search_dialog_formData.cdzsj}}</span>保存在
                <span class="underline">{{Search_dialog_formData.cddw}}</span>，存档编号
                <span class="underline">{{Search_dialog_formData.cdbh}}</span>。
                
              </p>
              <p v-if="Search_dialog_formData.two">
                {{replace_arr('two')}}. 该同志于
                <span
                  class="underline"
                >{{Search_dialog_formData.cjgzsj == null ? '&nbsp;' :Search_dialog_formData.cjgzsj}}</span>参加工作。
              </p>
              <p
                class="margin-botm"
                v-if="Search_dialog_formData.three"
              >{{replace_arr('three')}}. 该同志人事档案中无收入、住房情况记录。</p>
              <p v-if="Search_dialog_formData.four">
                {{replace_arr('four')}}.该同志档案
                <span
                  class="underline"
                >{{Search_dialog_formData.sfyjrzggcdcl}}</span>加入中国共产党的材料
                <span v-if="zmxx_rq">
                  ，入党时间
                  <span class="underline">{{Search_dialog_formData.rdsj}}</span>
                  ，入党材料名称
                  <span class="underline">{{Search_dialog_formData.rdclmc == null ? '&nbsp;' :Search_dialog_formData.rdclmc}}</span>
                </span> 。
              </p>
              <p v-if="Search_dialog_formData.five">
                {{replace_arr('five')}}.出生地
                <span class="underline">{{Search_dialog_formData.csd}}</span>，父亲是
                <span
                  class="underline"
                >{{Search_dialog_formData.fq == null ? '&nbsp;' :Search_dialog_formData.fq }}</span>,母亲是
                <span
                  class="underline"
                >{{Search_dialog_formData.mq == null ? '&nbsp;' :Search_dialog_formData.mq}}</span>。
              </p>
              <div v-if="Search_dialog_formData.six">
                <p>{{replace_arr('six')}}.职称信息</p>
                <p>
                  专业技术职称：
                  <span
                    class="underline"
                  >{{Search_dialog_formData.zcs.zyjszc == null ? '&nbsp;' :Search_dialog_formData.zcs.zyjszc}}</span>，职称级别：
                  <span
                    class="underline"
                  >{{Search_dialog_formData.zcs.zcjb == null ? '&nbsp;' :Search_dialog_formData.zcs.zcjb}}</span>,职称评定时间：
                  <span
                    class="underline"
                  >{{Search_dialog_formData.zcs.zcpdsj == null ? '&nbsp;' :Search_dialog_formData.zcs.zcpdsj}}</span>，职称评定单位：
                  <span
                    class="underline"
                  >{{Search_dialog_formData.zcs.zcpsdw == null ? '&nbsp;' :Search_dialog_formData.zcs.zcpsdw}}</span>。
                </p>
              </div>
              <div v-if="Search_dialog_formData.seven">
                <p>{{replace_arr('seven')}}.履历信息</p>
                <el-table :data="Search_goingFormData" style="width: 90%;margin-left: 15px;" border>
                  <el-table-column prop="gzkssj" label="工作起始时间" min-width="15%" align="center"></el-table-column>
                  <el-table-column prop="gzjssj" label="工作结束时间" min-width="15%" align="center"></el-table-column>
                  <el-table-column prop="gzdwmc" label="工作单位名称" min-width="15%" align="center"></el-table-column>
                  <el-table-column
                    prop="csgzhdrzw"
                    label="从事工作或担任职务"
                    min-width="20%"
                    align="center"
                  ></el-table-column>
                </el-table>
              </div>
              <div v-if="Search_dialog_formData.eight">
                <p>{{replace_arr('eight')}}.亲属信息</p>
                <div v-for="(item,index) in Search_dialog_formData.qinshuEntity" :key="index">
                  <p>{{item.qscw}}是{{item.qsxm}}</p>
                </div>
              </div>
              <div v-if="Search_dialog_formData.nine">
                <p>{{replace_arr('nine')}}.报道信息</p>
                <div v-for="(item,index) in Search_dialog_formData.bddwentity" :key="index">
                  <p>报道单位：{{item.bddw}}，报道时间：{{item.bdsj}}</p>
                </div>
              </div>
              <p
                v-if="Search_dialog_formData.ten"
              >{{replace_arr('ten')}}.其他情况：{{Search_dialog_formData.qtqk}}</p>
              <p>（本证明使用有效期为{{Search_dialog_formData.yxq}}天）</p>
              <p class="title_bh">（存档机构盖章）</p>
              <p class="title_bh">{{Search_dialog_formData.czsj}}</p>
            </div>
          </el-form>
          <div class="btn_parent">
            <el-button type="primary" size="medium" @click="window_print" class="base_btn">打印</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import "@/common/scss/common.scss";
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import { getData, deepClone } from "@/common/js/common";
export default {
  name: "",
  data() {
    return {
      tableHeadClassName: "tableHeadClassName",
      tableRowClassName: "tableRowClassName",
      table_flag: false,
      secondFlag: false,
      rdclmcflag: false, //入党材料标识
      llMax: true,
      pageSize: 12,
      total: "",
      pageNum: 1,
      tableData: [],
      dwxz_dmb: [], //单位性质代码表
      dwxzTitle: "", //单位性质title
      fwqsj: "",
      totals: "0",
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() > new Date(this.fwqsj).getTime();
        }
      },
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > new Date(this.fwqsj).getTime();
        }
      },
      csd_arr: [],
      zmcx_tableData: [],
      family_tableData: [],
      work_tableData: [],
      going_tableData: [],
      GoingFormdata: {
        ArrGoing: [
          {
            gzdwmc: "", //类型：String  必有字段  备注：128,"full","工作单位名称",false
            gzkssj: "", //类型：String  必有字段  备注：10,"full","工作开始时间",false
            gzjssj: "", //类型：String  必有字段  备注：10,"full","工作结束时间",false
            csgzhdrzw: "" //类型：String  可有字段  备注：64,"full","从事工作或担任职务",true
          }
        ] //新增履历数组
      },
      common_tableData: [],
      now_data: "",
      flag: false,
      options: [],
      value1: "",
      activeName: "first",
      formData: { sfzhm: "", xm: "", cdbh: "" },
      BaseFormData: { xm: "", mail: "" },
      zmxx_rq: false,
      zmxxFormData: {
        yxq: "",
        rdclmc: "",
        //接收数据证明信息
        cjgzsj: "",
        sfyjrzggcdcl: "",
        qtqk: "",
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false
      },
      going_multipleSelection: [],
      family_multipleSelection: [],
      common_multipleSelection: [],
      rules: {
        sfzhm: [{ validator: validator('18, "full", "身份证号码", true') }],
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        xm: [{ validator: validator('64, "full", "姓名", true') }]
      },
      rules1: {
        kwdwmc: [
          { validator: validator('128, "full", "开往单位名称", false') }
        ],
        dwxz: [{ validator: validator('2, "full", "单位性质", true') }],
        yxq: [{ validator: validator('3, "number", "有效期", false') }],
        fq: [{ validator: validator('32, "full", "父亲", true') }],
        mq: [{ validator: validator('32, "full", "母亲", true') }],
        rdclmc: [
          { validator: validator('1024, "full", "入党材料名称", true') }
        ],
        qtqk: [{ validator: validator('226, "full", "其他情况", true') }]
      },
      rules2: {
        gzkssj: [{ validator: validator('10, "full", "工作开始时间", false') }],
        gzjssj: [{ validator: validator('10, "full", "工作结束时间", false') }],
        gzdwmc: [
          { validator: validator('128, "full", "工作单位名称", false') }
        ],
        csgzhdrzw: [
          { validator: validator('64, "full", "从事工作或担任职务", true') }
        ]
      },
      Search_formData: { dazt: "1" }, //证明查询数据
      Search_dialog_formData: { zcs: {} },
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        blrqks: [{ validator: validator('10, "full", "办理日期开始", true') }],
        blrqjs: [{ validator: validator('10, "full", "办理日期结束", true') }],
        dazt: [{ validator: validator('1, "full", "档案状态", true') }]
      },
      Search_goingFormData: [],
      Search_total: 0,
      Search_totalFlag: false,
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.Search_formData.jdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.Search_formData.jdkssj;
          if (beginDateVal) {
            s;
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
          let endDateVal = this.Search_formData.jdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },
      Search_jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.Search_formData.jdkssj;
          if (beginDateVal) {
            s;
            return (
              time.getTime() > new Date(this.fwqsj) ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      }
    };
  },
  created() {
    this.xzqhCx();
    this.getdmb();
  },
  beforeMount() {
    this.fwqsj = JSON.parse(sessionStorage.getItem("czyInfo")).xtsj;
  },
  methods: {
    // 列表排序
     sortChange(column, prop, order) {
      this.form_data_page.prop = column.prop
      this.form_data_page.order = column.order
      var _this = this;
      getData(
        "/dafw/kjzmcx",
        this.form_data_page,
        function(res) {
          //查询列表信息
          _this.zmcx_tableData = res.returnData.kjzms;
          // _this.Search_total = parseInt(res.rowsCount);
          // _this.Search_totalFlag = true;
          // _this.secondFlag = true;
          for (var i = 0; i < res.returnData.kjzms.length; i++) {
            //序号赋值
            _this.zmcx_tableData[i].xh = parseInt(res.startNum) + i;
          }
        },
        function() {
          _this.secondFlag = false;
          _this.Search_totalFlag = false;
        }
      );
        
      },
    // 影像跳转新页面
    blank(){
      let routeData = this.$router.resolve({
        path: "/imgmod",
        query: {
          grbh: this.BaseFormData.grbh,
          dayxid: this.BaseFormData.dayxid,
          xm: this.BaseFormData.xm
        }
      });
      var _this = this;
        this.$nextTick(() => {
          _this.powerCheck("/dagl/yxxx", function() {
            window.open(routeData.href, '_blank');
            // _this.$router.push({ path:"/dagl/personal",query:{grbh:_this.grbh_jd}});
          });
      });
    },
    replace_arr(str) {
      for (var i = 0; i < this._arr.length; i++) {
        var _arr = this._arr[i];
        if (_arr == str) {
          return i + 1;
        }
      }
    },
    handleCurrentChange(val) {
      this.handleSubmit(val);
    },
    work_handleSelectionChange(val){
      val.length == 0 ? this.zmxxFormData.six = false: this.zmxxFormData.six = true;
    },
    going_handleSelectionChange(val) {
      //表格复选数据
      this.going_multipleSelection = val;
    },
    family_handleSelectionChange(val) {
      //表格复选数据
      this.family_multipleSelection = val;
    },
    common_handleSelectionChange(val) {
      //表格复选数据
      this.common_multipleSelection = val;
    },
    getdmb() {
      var _this = this;
      const data = { table_name: "szdayy_d_dwxz" }; //单位性质代码表
      getData(
        "/dmbgl/dmblbCx",
        data,
        function(res) {
          _this.dwxz_dmb = res.returnData.dmblb;
        },
        function() {}
      );
    },
    checkVal() {
      this.dwxzTitle = this.dwxz_dmb.find(item => {
        return item.dmid == this.zmxxFormData.dwxz;
      }).dmmc;
    },
    handleSubmit(num, flag) {
      // 查询
      this.$refs.form.validate(valid => {
        if (valid)
          if (this.formData.sfzhm || this.formData.cdbh || this.formData.xm) {
            var _this = this;
            getData(
              "/dafw/jcxxcx",
              _this.formData,
              function(res) {
                //查询基础信息
                _this.BaseFormData = res.returnData.kjzmjc;
                _this.BaseFormData.xb =
                  _this.BaseFormData.xb == "1" ? "男" : "女";
                _this.flag = true;
                $({
                  url: "/dafw/zmxxcx",
                  method: "get",
                  params: _this.formData
                }).then(res => {
                  const _res = res.returnData;
                  if (+_res.executeResult === 1) {
                    //开局证明信息接口
                    res.returnData.kjzmzm.qinshuEntity
                      ? (_this.family_tableData =
                          res.returnData.kjzmzm.qinshuEntity)
                      : _this.family_tableData =[]; //家庭数据
                    res.returnData.kjzmzm.llEntity
                      ? (_this.going_tableData = res.returnData.kjzmzm.llEntity)
                      : _this.going_tableData =[]; //履历数据
                    res.returnData.kjzmzm.zcs
                      ? (_this.work_tableData = [res.returnData.kjzmzm.zcs])
                      : _this.work_tableData =[]; //最高职称
                    _this.now_data = res.returnData.kjzmzm.czsj; //系统时间
                    _this.common_tableData = res.returnData.kjzmzm.bddwentity; //报道时间
                    _this.zmxxFormData = res.returnData.kjzmzm;
                    _this.$nextTick( ()=>{
                      _this.$refs.forms.clearValidate()
                    })
                    if (res.returnData.rdscmcs) {
                      //入党材料赋值
                      _this.rdclmcflag = true;
                      _this.zmxxFormData.rdscmcs = res.returnData.rdscmcs;
                    } else {
                      _this.rdclmcflag = false;
                    }
                    if (_this.going_tableData.length > 10) {
                      _this.llMax = false;
                      _this.GoingFormdata.ArrGoing = [];
                    }
                    // _this.zmxxFormData = {
                    //   ...res.returnData.kjzmzm,
                    //   ..._this.zmxxFormData
                    // }; //复选框数据
                    if (res.returnData.kjzmzm.csd) {
                      _this.csd_arr = _this.xzqh_arr(res.returnData.kjzmzm.csd);
                    } else {
                      _this.csd_arr = []
                    }
                    
                  } 
                });
                if (flag == 1) {
                  _this.form_data_page = deepClone(_this.formData);
                }
                const pagedata = _this.form_data_page;
                pagedata.pageNum = num || _this.pageNum;
                $({
                  url: "/dafw/lckjxxcx",
                  method: "get",
                  params: pagedata
                }).then(res => {
                  const _res = res.returnData;
                  if (+_res.executeResult === 1) {
                    //历次开具信息
                    res.returnData.lskjxxs
                      ? (_this.tableData = res.returnData.lskjxxs)
                      : _this.tableData = [];
                    _this.total = res.rowsCount;
                    for (var i = 0; i < res.returnData.lskjxxs.length; i++) {
                      //序号赋值
                      _this.tableData[i].xh = parseInt(res.startNum) + i;
                    }
                  }else {
                    _this.tableData = []
                    _this.total = ''
                  }
                });
              },
              function() {}
            );
          } else {
            this.$alert("请输入查询条件！", {
              center: true,
              confirmButtonText: "确定"
            });
          }
      });
    },
    addList() {
      if (
        this.GoingFormdata.ArrGoing.length + this.going_tableData.length >
        10
      ) {
        this.llMax = false;
      }
      this.$refs["ArrGoing"].validate(valid => {
        if (valid) {
          var ArrNew = [
            ...this.GoingFormdata.ArrGoing,
            ...this.going_tableData
          ];
          if (this.qcArr(ArrNew, "gzdwmc", "gzkssj")) {
            this.$alert("请不要输入相同的工作单位名称和工作开始时间！", {
              center: true,
              confirmButtonText: "确定"
            });
          } else {
            this.GoingFormdata.ArrGoing.push({
              gzdwmc: "", //类型：String  必有字段  备注：4,"full","材料类别",true
              gzkssj: "", //类型：String  必有字段  备注：128,"full","材料名称",true
              gzjssj: "", //类型：String  必有字段  备注：6,"full","材料份数",true
              csgzhdrzw: ""
            });
          }
        }
      });
    },
    llcheck() {
      var ArrNew = [...this.GoingFormdata.ArrGoing, ...this.going_tableData];
      if (this.qcArr(ArrNew, "gzdwmc", "gzkssj")) {
        this.$alert("请不要输入相同的工作单位名称和工作开始时间！", {
          center: true,
          confirmButtonText: "确定"
        });
      } else {
        this.$refs["ArrGoing"].validate(valid => {
          if (valid) {
            this.$confirm("确定要保存吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            })
              .then(() => {
                this.GoingFormdata.ArrGoing.map(item => {
                  return (item.grbh = this.zmxxFormData.grbh);
                });
                const data = {};
                data.llEntities = this.GoingFormdata.ArrGoing;
                $({
                  url: "/dafw/bcll",
                  method: "post",
                  data: data
                }).then(res => {
                  const _res = res.returnData;
                  if (+_res.executeResult === 1) {
                    this.$message({
                      type: "success",
                      center: true,
                      message: res.returnMsg
                    });
                    this.flag = false
                    this.total = false
                    this.handleSubmit(1, 1)
                    this.GoingFormdata.ArrGoing = [
                      {
                        gzdwmc: "", //类型：String  必有字段  备注：128,"full","工作单位名称",false
                        gzkssj: "", //类型：String  必有字段  备注：10,"full","工作开始时间",false
                        gzjssj: "", //类型：String  必有字段  备注：10,"full","工作结束时间",false
                        csgzhdrzw: "" //类型：String  可有字段  备注：64,"full","从事工作或担任职务",true
                      }
                    ]; //新增履历数组
                    this.$nextTick(_ => {
                      this.$refs.ArrGoing.clearValidate();
                    });
                  } else {
                    this.$alert(_res.message, {
                      center: true,
                      confirmButtonText: "确定"
                    });
                    this.handleSubmit(1, 1)
                  }
                });
              })
              .catch(() => {});
          }
        });
      }
    },
    del(num) {
      // 删除
        if (this.GoingFormdata.ArrGoing.length == 1) {
          this.$message.warning("没有更多数据了！");
          return false
        }
      this.GoingFormdata.ArrGoing.some((item, i) => {
        if (i == num) {
          this.GoingFormdata.ArrGoing.splice(i, 1);
          // 在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          return true;
        }
      });
    },
    handleQuire() {
      // 保存
      if (this.going_multipleSelection.length !== 0) {
        //履历
        this.zmxxFormData.llEntity = this.going_multipleSelection;
        this.zmxxFormData.seven = true;
      }
      if (this.family_multipleSelection.length !== 0) {
        //亲属
        this.zmxxFormData.qinshuEntity = this.family_multipleSelection;
        this.zmxxFormData.eight = true;
      }
      if (this.common_multipleSelection.length !== 0) {
        //报道
        this.zmxxFormData.bddwentity = this.common_multipleSelection;
        this.zmxxFormData.nine = true;
      }
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if (
            this.zmxxFormData.one ||
            this.zmxxFormData.two ||
            this.zmxxFormData.three ||
            this.zmxxFormData.four ||
            this.zmxxFormData.five ||
            this.zmxxFormData.six ||
            this.zmxxFormData.seven ||
            this.zmxxFormData.eight ||
            this.zmxxFormData.nine ||
            this.zmxxFormData.ten
          ) {
            if (this.zmxxFormData.two) {
              if (
                this.zmxxFormData.cjgzsj == "" ||
                this.zmxxFormData.cjgzsj == null
              ) {
                this.$alert("请选择参加工作时间！", {
                  center: true,
                  confirmButtonText: "确定"
                });
                return false;
              }
            }
            if (this.zmxxFormData.four) {
              if (this.zmxxFormData.sfyjrzggcdcl) {
                if (
                  this.zmxxFormData.sfyjrzggcdcl == 1 &&
                  this.zmxxFormData.rdsj == null
                ) {
                  this.$alert("请选择加入中国共产党时间！", {
                    center: true,
                    confirmButtonText: "确定"
                  });
                  return false;
                }
              } else {
                this.$alert("请选择是否加入中国共产党！", {
                  center: true,
                  confirmButtonText: "确定"
                });
                return false;
              }
            }
            if (this.zmxxFormData.five) {
              if (this.csd_arr.length == 0) {
                this.$alert("请选择出生地！", {
                  center: true,
                  confirmButtonText: "确定"
                });
                return false;
              }
            }
            if (this.zmxxFormData.seven) {
              if (this.going_multipleSelection.length == 0) {
                this.$alert("请选择履历信息！", {
                  center: true,
                  confirmButtonText: "确定"
                });
                return false;
              }
            }
            if (this.zmxxFormData.eight) {
              if (this.family_multipleSelection.length == 0) {
                this.$alert("请选择亲属信息！", {
                  center: true,
                  confirmButtonText: "确定"
                });
                return false;
              }
            }
            if (this.zmxxFormData.ten) {
              if (
                this.zmxxFormData.qtqk === undefined ||
                this.zmxxFormData.qtqk === ""
              ) {
                this.$alert("其他情况不能为空！", {
                  center: true,
                  confirmButtonText: "确定"
                });
                return false;
              }
            }
            this.kjzm_bc(); //保存接口
          } else {
            this.$alert("请选择保存内容！", {
              center: true,
              confirmButtonText: "确定"
            });
          }
        }
      });
    },
    kjzm_bc() {
      // 开具证明保存接口
      this.$confirm("确定要保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          const data = this.zmxxFormData;
          $({
            url: "/dafw/bczmxx",
            method: "post",
            data: data
          }).then(res => {
            const _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.$message({
                type: "success",
                center: true,
                message: res.returnMsg
              });
              this.flag = false
              this.total = ''
              
              var kjid = _res.kjid;
              var cdid = _res.cdid; //弹框
              this.Search_dialog(kjid, cdid);
            } else {
              this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
              });
              this.handleSubmit();
            }
          });
        })
        .catch(() => {});
    },
    xzqhCx() {
      // 行政区划查询
      $.get("/xzqh2.json").then(res => {
        this.options = res.returnData.xzqhlb;
      });
    },
    handleChange() {
      // 获取行政区划最后一级传给后台
      this.zmxxFormData.csd = this.csd_arr[this.csd_arr.length - 1];
    },
    xzqh_arr(str) {
      // 行政区划回显
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
    handleReset() {
      this.$refs.form.resetFields();
    },
    currentSel() {
      if (this.zmxxFormData.sfyjrzggcdcl == 1) {
        this.zmxx_rq = true;
      } else if (this.zmxxFormData.sfyjrzggcdcl == 2) {
        this.zmxx_rq = false;
        this.zmxxFormData.rdsj = "";
        this.zmxxFormData.rdclmc = "";
      }
    },
    Search_zmcx(num, flag) {
      // 证明查询
      this.$refs.Search_form.validate(valid => {
        if (valid) {
          if (flag == 1) {
            this.form_data_page = deepClone(this.Search_formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || this.pageNum;
          var _this = this;
          getData(
            "/dafw/kjzmcx",
            data,
            function(res) {
              //查询列表信息
              _this.zmcx_tableData = res.returnData.kjzms;
              _this.Search_total = parseInt(res.rowsCount);
              _this.Search_totalFlag = true;
              _this.secondFlag = true;
              for (var i = 0; i < res.returnData.kjzms.length; i++) {
                //序号赋值
                _this.zmcx_tableData[i].xh = parseInt(res.startNum) + i;
              }
            },
            function() {
              _this.secondFlag = false;
              _this.Search_totalFlag = false;
            }
          );
        }
      });
    },
    SearchCurrentChange(val) {
      //证明查询分页
      this.Search_zmcx(val);
    },
    Search_dialog(id, bh) {
      //查看
      var _this = this;
      const data = { kjid: id, cdid: bh };
      getData(
        "/dafw/ckzmx",
        data,
        function(res) {
          _this.table_flag = true;
          res.returnData.kjs.llEntity
            ? (_this.Search_goingFormData = res.returnData.kjs.llEntity)
            : "";
          res.returnData.kjs
            ? (_this.Search_dialog_formData = res.returnData.kjs)
            : "";
          res.returnData.kjs.zcs
            ? (_this.Search_dialog_formData.zcs = res.returnData.kjs.zcs)
            : (_this.Search_dialog_formData.zcs = []);
          var _arr = [];
          var xh = res.returnData.kjs.kjx.split(",").map((item, i) => {
            if (item == 1) {
              _this.Search_dialog_formData.one = true;
              _arr.push("one");
            } else if (item == 2) {
              _this.Search_dialog_formData.two = true;
              _arr.push("two");
            } else if (item == 3) {
              _this.Search_dialog_formData.three = true;
              _arr.push("three");
            } else if (item == 4) {
              _this.Search_dialog_formData.four = true;
              _arr.push("four");
            } else if (item == 5) {
              _this.Search_dialog_formData.five = true;
              _arr.push("five");
            } else if (item == 6) {
              _this.Search_dialog_formData.six = true;
              _arr.push("six");
            } else if (item == 7) {
              _this.Search_dialog_formData.seven = true;
              _arr.push("seven");
            } else if (item == 8) {
              _this.Search_dialog_formData.eight = true;
              _arr.push("eight");
            } else if (item == 9) {
              _this.Search_dialog_formData.nine = true;
              _arr.push("nine");
            } else if (item == 10) {
              _this.Search_dialog_formData.ten = true;
              _arr.push("ten");
            }
            return i + 1;
          });
          _this.Search_dialog_formData.xh = xh;
          _this._arr = _arr;
          if (_this.Search_dialog_formData.sfyjrzggcdcl == 1) {
            _this.Search_dialog_formData.sfyjrzggcdcl = "有";
            _this.zmxx_rq = true;
          } else if (_this.Search_dialog_formData.sfyjrzggcdcl == 2) {
            _this.Search_dialog_formData.sfyjrzggcdcl = "无";
            _this.zmxx_rq = false;
          }
        },
        function() {}
      );
    },
    window_print() {
      //打印
      this.$print(this.$refs.print);
    },
    form_reset() {
      //重置
      // this.$refs["search_form"].resetFields();
      this.formData = {};
      this.Search_formData = { dazt: "1" };
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.secondFlag = false;
        this.Search_totalFlag = false;
      } else if (this.activeName == "second") {
        this.flag = false;
        this.total = false;
        this.formData = {};
        this.Search_formData = { dazt: "1" };
      }
    },
    // 跳转个人页面
    see(row) {
      this.$router.push({ path: "/dagl/personal", query: { grbh: row } });
    },
    qcArr(arr, ...arg) {
      var flag = false;
      for (var i = 0; i < arr.length; i++) {
        var num = 0;
        for (var j = 0; j < arr.length; j++) {
          var str = `function(){ return`;
          for (var z = 0; z < arg.length; z++) {
            if (z == arg.length - 1) {
              str += ` "${arr[i][arg[z]]}" == "${arr[j][arg[z]]}"}`;
            } else {
              str += ` "${arr[i][arg[z]]}" == "${arr[j][arg[z]]}" &&`;
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
    }
  }
};
</script>
<style scoped lang="scss">
.fq_width {
  width: 26% !important;
}
.message {
  margin-left: 180px;
}
.formData {
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #fff;
}
.BaseFormData {
  padding: 15px 20px 0 20px;
}
.zmxxFormData {
  padding: 10px 20px 20px 20px;
  background-color: #fff;
}
.zmxx_btn {
  width: 116px;
  height: 32px;
  border: none;
  background: -webkit-linear-gradient(left, #0081e6, #39b5fd);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.zmxx_content {
  padding: 10px 40px;
  padding-bottom: 0;
}
.btn_parent {
  text-align: center;
}
// 字体颜色
.Baseclass, .HasColor{
  width: 53%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.HasColor {
  color: #1488f5;
  cursor: pointer;
}
.noWidth {
  border: none;
  height: 33px;
  display: inline-block;
}
.page_style {
  margin: 20px 0;
}
.table_div {
  padding: 0 20px;
}
.yxq {
  position: absolute;
  right: 50%;
}
.style_cover .width_yw {
  width: 100px;
}
.searchResult {
  position: relative;
}
.totles {
  position: absolute;
  left: 150px;
  top: 16px;
}
.font_class {
  font-size: 14px;
  color: #606266;
}
.big_width {
  width: 280px;
}
.fq {
  display: inline-block;
  margin-bottom: 0;
  width: 170px;
  .el-form-item__label {
    width: 70px;
  }
  .el-input {
    width: 65% !important;
  }
}
.rdsj {
  display: inline-block;
  width: 220px;
  margin-bottom: 0;
  vertical-align: middle;
}
.rdclmc {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  width: 600px;
}
.qtqk {
  .el-form-item__label {
    width: 70px !important;
  }
  .el-input {
    width: 300% !important;
  }
}
.da_cotent {
  width: 750px;
  margin: 0 auto;
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
.clmc {
  margin-top: 3px;
}
.lastright .el-input {
  margin-left: 60px;
}
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
</style>