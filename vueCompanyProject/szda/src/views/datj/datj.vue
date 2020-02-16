<template>
  <div>
    <div class="left">
      <div class="waiceng datj">
        <div class="search">
          <el-input placeholder="查询" v-model="filterText"></el-input>
          <i class="iconfont iconiconfontzhizuobiaozhun22 icon_search"></i>
        </div>
        <el-tree
          ref="tree"
          class="menu-tree newBg over_div_con"
          :data="treeData"
          node-key="id"
          :default-expanded-keys="[1]"
          @node-click="clickMenuNode"
          :filter-node-method="filterNode"
        >
          <span class="custom-tree-node waiceng" @click="setCurrentKey" slot-scope="{ node }">
            <span class="treeTitle" :title="node.label">
              <i class="iconfont iconshebaojigou icon_two"></i>
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="right">
      <!-- 档案 -->
      <div class="percent-three">
        <div class="title" style="line-height: 21px;">
          <i class="iconfont icondangan"></i>档案
          <span class="specail-part">{{xbxx.dwrs}}</span>份
          <span class="float-r">单位：份</span>
        </div>
        <div class="da-totle-show">
          <div style="padding: 10px 0 0 19px; height: 100%">
            <!-- <img src="../../assets/images/nan.png" />  -->
            <img src="../../assets/images/nan1.png" style="height: 100%; margin-left:10px;" />
            <!-- ((xbxx.nan/xbxx.dwrs)*100).toFixed(2) ((xbxx.nv/xbxx.dwrs)*100).toFixed(2)-->
            <div class="da-totle-show-num">
              <span>{{xbxx.nan}}</span>
              <br />
              {{xbxx.dwrs == 0 ?'0':Math.round((xbxx.nan/xbxx.dwrs)*100)}}%
            </div>
          </div>
          <div style="padding: 10px 0 0 10px; height: 100%">
            <!-- <img src="../../assets/images/nv.png"/>  -->
            <img src="../../assets/images/nan2.png" style="height: 100%; margin-left:15px;" />
            <div class="da-totle-show-num" style="color:#FF9900">
              <span>{{xbxx.nv}}</span>
              <br />
              {{xbxx.dwrs == 0 ?'0':Math.round((xbxx.nv/xbxx.dwrs)*100)}}%
            </div>
          </div>
        </div>
        <div id="daChart" style="height: 215px" class="chart"></div>
      </div>
      <!-- 职称 -->
      <div class="percent-three">
        <div class="title" style="line-height: 21px;">
          <i class="iconfont iconshenfen"></i>职称
          <span class="float-r">单位：人</span>
        </div>
        <div class="chart">
          <ul class="zc-chart">
            <li>
              <div class="number-show">{{zcxx.zc1}}</div>
              <div class="type-show">高级</div>
            </li>
            <li>
              <div class="number-show">{{zcxx.zc2}}</div>
              <div class="type-show">中级</div>
            </li>
            <li>
              <div class="number-show">{{zcxx.zc3}}</div>
              <div class="type-show">初级</div>
            </li>
            <li>
              <div class="number-show">{{zcxx.zc4}}</div>
              <div class="type-show">助理级</div>
            </li>
            <li>
              <div class="number-show">{{zcxx.zc5}}</div>
              <div class="type-show">员级</div>
            </li>
            <li>
              <div class="number-show">{{zcxx.zc6}}</div>
              <div class="type-show">无职称信息</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 职业资格 -->
      <div class="percent-three">
        <div class="title">
          <i class="iconfont iconhangzhengzhiwu"></i>职业资格
          <span class="float-r">单位：人</span>
        </div>
        <div id="zyzgChart" class="chart"></div>
      </div>
      <!-- 学历 -->
      <div class="percent-three">
        <div class="title" style="line-height: 21px;">
          <i class="iconfont iconxueli1"></i>学历
          <span class="float-r">单位：人</span>
        </div>
        <div id="xlChart" class="chart"></div>
      </div>
      <!-- 年龄 -->
      <div class="percent-three">
        <div class="title" style="line-height: 21px;">
          <i class="iconfont iconnianling"></i>年龄
          <span class="float-r">单位：人</span>
        </div>
        <div id="nlChart" class="chart"></div>
      </div>
      <!-- 政治面貌 -->
      <div class="percent-three">
        <div class="title" style="line-height: 21px;">
          <i class="iconfont iconzhengzhimianmao"></i>政治面貌
          <span class="float-r">单位：人</span>
        </div>
        <div id="zzmmChart" class="chart"></div>
      </div>
      <!-- 参加工作时间 -->
      <div class="percent-five">
        <div class="title" style="line-height: 20px;">
          <i class="iconfont icongongzuo"></i>参加工作时间
          <span class="float-r">单位：人</span>
        </div>
        <div id="cjggsjChart" class="chart"></div>
      </div>
      <!-- 党龄 -->
      <div class="percent-five">
        <div class="title" style="line-height: 21px;">
          <i class="iconfont icondangling"></i>党龄
          <span class="float-r">单位：人</span>
        </div>
        <div id="dlChart" class="chart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "@/common/js/axios";
import { getData, deepClone } from "@/common/js/common";
import "@/common/scss/index.scss";

export default {
  name: "datj",
  data() {
    return {
      zcxx: {}, // 职称信息
      zyzgxx: {}, // 职业资格信息
      dlxx: {}, // 党龄信息
      glxx: {}, // 参加工作时间信息
      zzmmxx: {}, // 政治面貌信息
      xlxx: {}, // 学历信息
      nlxx: {}, // 年龄信息
      xbxx: [], // 性别信息
      zcTotle: 0, // 职称总和
      zyzgTotle: 0, // 职业资格总和
      dlTotle: 0, // 党龄总和
      glTotle: 0, // 参加工作时间总和
      zzmmTotle: 0, // 政治面貌总和
      xlTotle: 0, // 学历总和
      nlTotle: 0, // 年龄总和
      xbTotle: 0, // 性别总和
      sfdj: false,
      treeData: [],
      dwid: "",
      filterText: ""
    };
  },
  created() {
    this.getDataMenu();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    drawLine() {
      var _this = this;
      // 绘制图表
      let daChart = this.$echarts.init(document.getElementById("daChart"));
      let daData = [_this.xbxx.nan, _this.xbxx.nv];
      var daColorArray = [
        {
          top: "#0095EB", //黄
          bottom: "#59C0FB"
        },
        {
          top: "#E9AB25", //绿
          bottom: "#F5C96C"
        }
      ];
      daChart.setOption({
        tooltip: {
          show: true,
          formatter: "{b}:{c}"
        },
        grid: {
          left: "5%",
          top: "10%",
          right: "10%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          show: false,
          position: "top",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333333"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
              alignWithLabel: false,
              length: 5
            },
            splitLine: {
              //网格线
              show: false
            },
            inverse: "true", //排序
            axisLine: {
              show: false,
              lineStyle: {
                color: "#333333"
              }
            },
            data: ["男", "女"]
          }
        ],
        series: [
          {
            name: "档案",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{c}",
                textStyle: {
                  color: "#333333" //color of value
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                  let num = daColorArray.length;
                  return {
                    type: "linear",
                    colorStops: [
                      {
                        offset: 0,
                        color: daColorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: daColorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: daColorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: daColorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: daColorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: daColorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: daColorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: daColorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: daColorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: daColorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: daColorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: daColorArray[params.dataIndex % num].top
                      }
                    ]
                    //globalCoord: false
                  };
                },
                barBorderRadius: 70,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barGap: "0%",
            barCategoryGap: "80%",
            data: daData
          }
        ]
      });

      // 职业资格 绘制图标
      let zyzgChart = this.$echarts.init(document.getElementById("zyzgChart"));
      zyzgChart.clear();
      var dataStyle = {
        normal: {
          label: { show: false },
          labelLine: { show: false }
        }
      };
      var placeHolderStyle = {
        normal: {
          color: "rgba(230,230,230,0.7)",
          label: { show: false },
          labelLine: { show: false }
        },
        emphasis: {
          color: "rgba(0,0,0,0)"
        }
      };
      zyzgChart.setOption({
        color: [
          "#59C0FB",
          "#2DC4A6",
          "#E9AB25",
          "#F5C96C",
          "#1a9bfc",
          "#E66E61"
        ],
        tooltip: {
          // show: true,
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
            formatter: function(param) {
                // if (param.data.flag == 1) {
                //     var xsd = param.percent.toString().split(".")
                //     if(xsd.length==1){
                //         param.percent = param.percent.toString()+".00";
                //         return param.seriesName + '<br/>' +param.name + '：' + param.data.people + ' (' + param.percent + '%)'
                //     }
                //     if(xsd.length>1){
                //         if(xsd[1].length<2){
                //             param.percent = param.percent.toString()+"0";
                //         }
                //         return param.seriesName + '<br/>' + param.name + '：' + param.data.people + ' (' + param.percent + '%)'
                //     }
                // } 
                // return param.seriesName + '<br/>' + param.name + '：' + param.data.people + ' (' + (100 - param.percent).toFixed(2) + '%)'
                return param.seriesName + '<br/>' + param.name + '：'+param.data.people+'人  (' + ((param.data.people/param.data.all)*100).toFixed(2)+'%)'
            }
        },
        legend: {
          orient: "vartical",
          x: "left",
          top: "20%",
          left: "3%",
          data: ["高级技师", "技师", "高级", "中级", "初级", "无职业资格信息"]
        },
        series: [
          {
            name: "职业资格",
            type: "pie",
            clockWise: false,
            radius: [105, 115],
            center: ["65%", "45%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: _this.zyzgxx.zyzg1,
                people: _this.zyzgxx.zyzg1,
                name: "高级技师",
                flag: '1',
                all:_this.zyzgTotle
              },
              {
                value: _this.zyzgTotle - _this.zyzgxx.zyzg1,
                people: _this.zyzgxx.zyzg1,
                name: "高级技师",
                itemStyle: placeHolderStyle,
                all:_this.zyzgTotle
              }
            ]
          },
          {
            name: "职业资格",
            type: "pie",
            clockWise: false,
            radius: [90, 100],
            center: ["65%", "45%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: _this.zyzgxx.zyzg2,
                people: _this.zyzgxx.zyzg2,
                name: "技师",
                flag: '1',
                all:_this.zyzgTotle
              },
              {
                value: _this.zyzgTotle - _this.zyzgxx.zyzg2,
                people: _this.zyzgxx.zyzg2,
                name: "技师",
                itemStyle: placeHolderStyle,
                all:_this.zyzgTotle
              }
            ]
          },
          {
            name: "职业资格",
            type: "pie",
            clockWise: false,
            radius: [75, 85],
            center: ["65%", "45%"],
            itemStyle: dataStyle,
            hoverAnimation: false,

            data: [
              {
                value: _this.zyzgxx.zyzg3,
                people: _this.zyzgxx.zyzg3,
                name: "高级",
                flag: '1',
                all:_this.zyzgTotle
              },
              {
                value: _this.zyzgTotle - _this.zyzgxx.zyzg3,
                people: _this.zyzgxx.zyzg3,
                name: "高级",
                itemStyle: placeHolderStyle,
                all:_this.zyzgTotle
              }
            ]
          },
          {
            name: "职业资格",
            type: "pie",
            clockWise: false,
            hoverAnimation: false,
            radius: [60, 70],
            center: ["65%", "45%"],
            itemStyle: dataStyle,

            data: [
              {
                value: _this.zyzgxx.zyzg4,
                people: _this.zyzgxx.zyzg4,
                name: "中级",
                flag: '1',
                all:_this.zyzgTotle
              },
              {
                value: _this.zyzgTotle - _this.zyzgxx.zyzg4,
                people: _this.zyzgxx.zyzg4,
                name: "中级",
                itemStyle: placeHolderStyle,
                all:_this.zyzgTotle
              }
            ]
          },
          {
            name: "职业资格",
            type: "pie",
            clockWise: false,
            hoverAnimation: false,
            radius: [45, 55],
            center: ["65%", "45%"],
            itemStyle: dataStyle,

            data: [
              {
                value: _this.zyzgxx.zyzg5,
                people: _this.zyzgxx.zyzg5,
                name: "初级",
                flag: '1',
                all:_this.zyzgTotle
              },
              {
                value: _this.zyzgTotle - _this.zyzgxx.zyzg5,
                people: _this.zyzgxx.zyzg5,
                // name: "invisible",
                name: "初级",
                itemStyle: placeHolderStyle,
                all:_this.zyzgTotle
              }
            ]
          },
          {
            name: "职业资格",
            type: "pie",
            clockWise: false,
            hoverAnimation: false,
            radius: [30, 40],
            center: ["65%", "45%"],
            itemStyle: dataStyle,
            // minAngle: '360',
            data: [
              {
                value: _this.zyzgxx.zyzg6,
                people: _this.zyzgxx.zyzg6,
                name: "无职业资格信息",
                flag: '1',
                all:_this.zyzgTotle
              },
              {
                value: _this.zyzgTotle - _this.zyzgxx.zyzg6,
                people: _this.zyzgxx.zyzg6,
                name: "无职业资格信息",
                itemStyle: placeHolderStyle,
                all:_this.zyzgTotle
              }
            ]
          }
        ]
      });

      // 政治面貌 绘制图表
      let zzmmChart = this.$echarts.init(document.getElementById("zzmmChart"));
      zzmmChart.clear();
      var zzmmData = [
        {
          name: "中共党员",
          value: _this.zzmmxx.zzmm1 > 0 ? _this.zzmmxx.zzmm1 : "null"
        },
        {
          name: "中共预备党员",
          value: _this.zzmmxx.zzmm2 > 0 ? _this.zzmmxx.zzmm2 : "null"
        },
        {
          name: "共青团员",
          value: _this.zzmmxx.zzmm3 > 0 ? _this.zzmmxx.zzmm3 : "null"
        },
        {
          name: "民主党派",
          value: _this.zzmmxx.zzmm4 > 0 ? _this.zzmmxx.zzmm4 : "null"
        },
        {
          name: "无党派民主人士",
          value: _this.zzmmxx.zzmm5 > 0 ? _this.zzmmxx.zzmm5 : "null"
        },
        {
          name: "群众",
          value: _this.zzmmxx.zzmm6 > 0 ? _this.zzmmxx.zzmm6 : "null"
        }
      ];
      zzmmChart.setOption({
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: [
          "#89CEFE",
          "#6BD3CE",
          "#F1C056",
          "#F7A061",
          "#E66E61",
          "#AEB7F9",
          "#C8C0B5FF"
        ],
        legend: {
          orient: "vartical",
          x: "left",
          top: "12%",
          left: "3%",
          data: [
            "中共党员",
            "中共预备党员",
            "共青团员",
            "民主党派",
            "无党派民主人士",
            "群众"
          ],
          itemWidth: 20,
          itemHeight: 14,
          itemGap: 15,
          formatter: function(name) {
            return "   " + name;
          }
        },
        series: [
          {
            name: "政治面貌",
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 15, //最小的扇区角度（0 ~ 360）
            // stillShowZeroSum :true,
            radius: ["40%", "68%"],
            center: ["65%", "45%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 10
              }
            },
            label: {
              normal: {
                show: false,
                position: "center",
                // formatter: '{text|{b}}\n{value|{c=="null" ? 0:c}人}',
                formatter: function(a) {
                  if (a.data.value == "null") {
                    a.data.value = 0;
                  }
                  
                  return (
                    "{text|" + a.data.name + "}\n{value|" + a.data.value + "人}"
                  );
                },
                fontSize: 12,
                rich: {
                  text: {
                    color: "#666",
                    fontSize: 14,
                    align: "center",
                    verticalAlign: "middle",
                    padding: 5
                  },
                  value: {
                    color: "#38B5FDFF",
                    fontSize: 24,
                    align: "center",
                    verticalAlign: "middle"
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 46
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: zzmmData
          }
        ]
      });
      //  zzmmChart.dispatchAction({
      //   type: "highlight",
      //   seriesIndex: 0,
      //   dataIndex: 0
      // });

      // setTimeout(function() {
      //     zzmmChart.dispatchAction({
      //         type: 'highlight',
      //         seriesIndex: 0,
      //         dataIndex: 0
      //     });

      //     zzmmChart.on('mouseover', function(params) {
      //         if (params.name == zzmmData[0].name) {
      //             zzmmChart.dispatchAction({
      //                 type: 'highlight',
      //                 seriesIndex: 0,
      //                 dataIndex: 0
      //             });
      //         } else {
      //             zzmmChart.dispatchAction({
      //                 type: 'downplay',
      //                 seriesIndex: 0,
      //                 dataIndex: 0
      //             });
      //         }
      //     });

      //     zzmmChart.on('mouseout', function(params) {
      //         zzmmChart.dispatchAction({
      //             type: 'highlight',
      //             seriesIndex: 0,
      //             dataIndex: 0
      //         });
      //     });
      // }, 1000);

      // 学历 绘制图表
      let xlChart = this.$echarts.init(document.getElementById("xlChart"));
      xlChart.clear();
      var xlData = [
        _this.xlxx.xl1,
        _this.xlxx.xl2,
        _this.xlxx.xl3,
        _this.xlxx.xl4,
        _this.xlxx.xl5,
        _this.xlxx.xl6
      ];
      // var xlData= [0, 0, 0, 0 ,0, 0];
      var num = 0;
      var xxx = [];
      xlData.forEach(item => {
        if (item == 0) {
          num++;
        }
        if (num == xlData.length) {
          xxx = [null, null, null, null, null, null];
        }
      });
      xlData = xxx.length > 0 ? xxx : xlData;
      // var xlData = [100, 20, 30, 50 ,10, 3];
      var colorArray = [
        {
          top: "#0095EB", //黄
          bottom: "#59C0FB"
        },
        {
          top: "#E9AB25", //绿
          bottom: "#F5C96C"
        },
        {
          top: "#2DC4A6", //蓝
          bottom: "#74D5D4"
        },
        {
          top: "#4E8ADB", //深蓝
          bottom: "#95B5EF"
        },
        {
          top: "#E9AB25", //粉
          bottom: "#F5C96C"
        },
        {
          top: "#CDC5B8", //粉
          bottom: "#9D9B98"
        }
      ];
      var maxData;
      var maxData = deepClone(xlData).sort(function(a, b) {
        return b - a;
      })[0];
      var spirit1 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkUlEQVRYR+2XQU7CUBCG/yluDDzCEXCrNIGlUiI3QE4A3qCcQLiB3kBPIDeQBHALCdW4rDdQW1emHfNMSh7QIG0J3bSbJn1vOt/885L3DyHlh1LOj1CAytjpg9AioBoVkIE5CEOrLga7xG4A6BNnCKC1S/C2PcwYWg3RDvacTVyTwB2f6Pq1XpgH31cATqduNcc8S5p8Ga9xe3FRlAVBnzgs38wYWA3RDwWQ0hPhZl8AarIMIFMgUyBTIFMgUyAVBZDmbcjgd8soloOb9bAKMH96mtZUjcdBAGTVBIycvDDtGn2oviIygEdUUytIalIiAywMQfrz1xV71AGhFAWAwLaTFz1VhVgAlbEzIsJllOTB3nXvFwtAn7pd9rkbB8DXyAxaqJpdH9R7MQq3/5pS2YI4iddjyjMuFb7dp2DG+MkdnbydH9uhALLn8Onxzz7LAQNYOclxgAhoLttCuLPqwlT/s1Flkr5vB+SHhVHcaGeozHKK0cBN5minPwyAiG1murcaYhS6HkfWfcbs5aAlAfoFiS2HMKAVhhwAAAAASUVORK5CYII=";
      var spirit2 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABa0lEQVRYR+2XPVLCUBSFz8FCx4ol6A5wBWIjSSWUpAF3EFYg7EB3oE1CZzrQBnYgS4AdaKNjw3H4TyCj5oUhTV6Zm/vu9855M+9eIuPFjOsjFkA9pw3iBkDJAHAEImDF6/wndwdAfScA5sVTLgW0/NpqE/XrLsAGCrjltTdafY8A6NUpYYq3lJU36VSNFX92IKjvaB4QOrS9djzAQvq7vQGEiuUAuQK5ArkCuQK5AtkokOlrKExoe2ebfuCgz7E+UGA53HgcxgJhAmiIky+XV8F7uK9IDlDARfgEaZuUxAC0POqlXoXQAFBMBsAxjj9bYRXMAHr1IcjLZMWXf2/1foYAThNQ0wjgiO7KwmizqxYt//7PpnRmgVHhrSQNqkV8nw7WM4am57S743iAued8XgZHgCI32QyI5U2eHmj5bnif3cEkje+/EUpPtP0dO+NHs8UUU4aU8PbHEowBPdLuDuOie/HZzJpFVuYAP4bHUzBpydHrAAAAAElFTkSuQmCC";
      var spirit3 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABgElEQVRYR+2XzW3CQBCF563JnRKSDrAw53CN8PJTAaQDU0Ggg6SDpAIWG87hDghKgA6SM4knMsjSgi2CbYQv9sXWambn83sr7Qwo5wc516dYgObcG4DQIlAlMSDTmgWUW20ML8mNADQXEwWi1iXJ52NYjS3ZCWPkcuIIn7oo4VmZjXW4fgTQXk0r/Mur7MUPO/jEHc+SKvhuLSYcvJl56NbkIBZgLz3wci0AvVgBUChQKFAoUChQKJCLAnnfhtuxZd+HN+utFfiGgbreeNwKYMtEM2HsHGV2vvS+IjEADJj6H2RtUhIDjC0bcuG1BVGXCOWEABsYu76uQiqA5tybAXhMWHwfftr7pQKQy2kPvt9LAyBKwgkt1JtdH9T3qvbrv01pYEGawqc57dWozD93n+GMAcN4UObTJhbg4DlGBw1pTaCjk5wSqB7mMfGba0lH3yc6mGTw/RwgE324lh2xM1bmYIoBU52Yk57+KAOwEczvqiZncYBX8TmlNfu03AH+ANScnzDykSNSAAAAAElFTkSuQmCC";
      var spirit4 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhklEQVRYR+2XMVLCQBiF34vD2HIEKUhaPIHcACgUOvAGCbEXegG9gXZBC3MDuYG0xEK4gXbMOOR3ghMmkAySwJAm22Vn//zfvrcz+5ZIeTDl/ogEaPQmHSErBEpxAQUYk7Qto9jdpTYEUO9PbIKVXYq3rRERe2hqNX9Nvfehg9J0iesXQx3782sAlwOndCJ437e5X++6Unu+0Wzvu9F3ZDkv0rVMrRMJ4EkP8vZQAMFmGUCmQKZApkCmQKZAKgqkexuKzCxTO/Nv1qMqIIJvV0E5GDyOAyAyAzmaM6fbRuErmCtiAyyI8+AO9g0psQGstsqru0mVRJNkPhaAYDpXckZQhUQAjb4zAnARq7m/eCP7JQPoOS0QrSQAC0L3LQyGXREaQ7N4/28o9SxI0nizpjr4zJ/Kz9vqjcFcwTIK00gAz3NF4esyPXsPDGDtJCcEKq9cAR6GbVUP/ie0y7183074ZLXVkJ2RMv+9YtwyEfP0RwNMQT5aRtE70KFxEJ8TWrMsSx3gFzpmfzCywu9eAAAAAElFTkSuQmCC";
      var spirit5 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABeElEQVRYR+2XTW6CUBSFz4F00pGTJsVRuwMJzOsOrCvQ7gBXUN1B3UG7grKDugAJLkEnYNKJnTih5TY0yk/FVtDIBGa8dy/345yXvHuJih9WXB+5AOI0hxB0QLQKAwpmIGwa3uiQ3B0AmWo2yM4hyX/GiNg0/e42RhzNgrAHNXig/j7brmcAxL1qIbxwjy4eV0WXpmdHr+I0ZbM8ouEN8wEi6YHHkwEAcbEaoFagVqBWoFagVqAaBaTS21AWNPybpB8453Us+IAatNONx5kskAWEE6hri/pqle4rigMogZ7+g2OblMIANDzKtHkPSA9AoxAAOYeyHqRVKAfgaBOAd4WKJ8GZ3q8kwHUfYL8UgPJpbS3MNrsyoOE//duURhaUKvwrSdxGA1+Xb/GMoYS31JfzfIDIc+L1ZzMaMCCZk1wKiGwneTKm4Vvp7+wOJsf5vp9R8ELT27Fzz2gWTTFogwVPf1554Rxq+Ex9OcnbPonPpazZJFUO8A2hlDUwAyWvfwAAAABJRU5ErkJggg==";
      var spirit6 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADNElEQVR4Xu2bS3LaQBCG/xYS2zgnCD5BnBtARNbxDexUQZV3iU9gcgNnlyqpyuQEwetYJXyCkBPYuQHeWo9OiQQH4ZGGhxgoZlgyqHv6m9aoW/ND0PxDmscPA8BkwBIEos6PJpN1QswNEDWXuHT1nzIPmejeYhrY/tvr1Q2Jr1zoFuCzsBHHyZWyoIuiZB7aVDsnrzWqCoQUAHfDo5jTEISDqpyuZYcxtslqlUGIOsEFwE2AhnZsfaF+a1zkUwrgsXvzk0BHa0264osZuK977qHIbNQNLgF8nI4x87e63z5dCUDcDU4ZuKp4/pWYY8Z53XezYHOfx25wR0Bj9kvHcwsXujQDdnH1n1YWPKp77TfzAKJuwPPfrQxAZKyS5avIiCgwrQDYNeuQvrbuZ3lqBQCcthz/3dAAmCFgMkCnTdDcAmYPMJugeQqYx6CpA0whZCpBUwqbUvg/AdMLmF5AozdCphkyzZBphkwzZJohnZshO7Jezp/7aVUIaX0wwsCvuuc+O7TVJgOKDkc1AcAPdlRriM799QDA+Oz4bq9AH7Dfp8MywcNeZ4As+Cwj9hIAM35bhJ7tuX2ZtGCfANyCeUxEg1pkDcqETmrfCZZsQLLVUTG+4QzgB8dr74ZcroDmhgHg1vHcJ4Uon4YHscOvVaxs5sMGPchEksoAZOrRKEnDeUnapmEUVYBTv8oAPHZu+kR0sumARfbLZG/KAESdmwGI3m8DgKgNVp4BmXIcZIXKATBfO377WOR3IupO0rvZsayGqPtuTjk6O16qFBWkU24TnECApUY2D4CBsUge+7T6naAHwkUOTgmw7HdLAeACearyLBA4LFK1E/ChrIJcCsDkUSRQZ24bwL9M/P5c0l/cNk/nLBFLByMCcs/5TKpODGlNrgoKEx8XyvkXqFrLM0B0T6mKbH0/uf2qyFwpgKzSi+x0RIRX689HnYXsfaETWc1FGijpP0YmmwuSIUAv1IWwuqfsnYET1z4tErz0KTCdxt9MSC63VfkthIP5GuDL+ZMi2bXSDMgVFWdhI0nSJnP+LykyJ5sdT4d2bI8WXfH5uSwFYLOBbMe6AbAd7rvjVfsM+APofplf/GJgeQAAAABJRU5ErkJggg==";
      var spirit7 =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABUElEQVRYR+2X4VHCQBCF33ZgCdqBVmBeGlAqEDvACpQOtAOtQCrg0QGWoB1oBessE5iDRCQXhvzJ/czdzn77dif3ztDzsp7zoxFA0hOAGwCXGYAfAGYkp4fE1gAkzarkh8TvOxMQo/UBSRMAdwDuSQbkam0BSIqKl10zJ/EjklEQJHn1fUoyFG4EiI3HIwJskg0AgwKDAoMCgwKDAn0p0N9t6O5fZVmeJ37gdNexu/+YWZEaj5O0IKo2swWACcnv1FfkAFylFXQ1Ka0BSJqk28rHnbUE+ATwkKqQBTCfzxdmdt0y+fr4lvfLApA0dvdxDoCZxRys3O+O2Q1lnv81pdGCnMS7MZKifUreGBcko0WNrjh6/l7tBf3WJGcCFUncC8l4H2xWrcqOfd/H+Eay1s6/nmZBWbh72+mvAZhZyP1KMv4P9f1MWY8WdpRB60LzCxExJjCz9pZXAAAAAElFTkSuQmCC";
      xlChart.setOption({
        tooltip: {
          formatter: function(param) {
            return param.name + "：" + param.value + "人";
          }
        },
        xAxis: {
          show: false,
          max: maxData,
          splitLine: { show: false },
          offset: 10
        },
        yAxis: {
          data: ["研究生以上", "本科", "大专", "高中", "初中", "其他"],
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            align: "left",
            margin: 80,
            textStyle: {
              color: "black",
              fontSize: 14
            }
          }
        },
        grid: {
          top: "center",
          height: 200,
          left: 100,
          right: 70
        },
        series: [
          {
            // current data
            type: "pictorialBar",
            symbol: spirit1, //默认图标
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbolClip: true,
            symbolSize: 30,
            symbolBoundingData: maxData,
            hoverAnimation: true,
            data: [
              {
                value: xlData[0],
                symbol: spirit1, //对应的图标
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    offset: [10, 0],
                    textStyle: {
                      color: "#85CFFE",
                      fontSize: 18,
                      fontWeight: "bold"
                    }
                  }
                }
              },
              {
                value: xlData[1],
                symbol: spirit2, //对应的图标
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    offset: [10, 0],
                    textStyle: {
                      color: "#ffb85a",
                      fontSize: 18,
                      fontWeight: "bold"
                    }
                  }
                }
              },
              {
                value: xlData[2],
                symbol: spirit3, //对应的图标
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    offset: [10, 0],
                    textStyle: {
                      color: "#4FCCB4",
                      fontSize: 18,
                      fontWeight: "bold"
                    }
                  }
                }
              },
              {
                value: xlData[3],
                symbol: spirit4, //对应的图标
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    offset: [10, 0],
                    textStyle: {
                      color: "#588EDA",
                      fontSize: 18,
                      fontWeight: "bold"
                    }
                  }
                }
              },
              {
                value: xlData[4],
                symbol: spirit5, //对应的图标
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    offset: [10, 0],
                    textStyle: {
                      color: "#FFCD1A",
                      fontSize: 18,
                      fontWeight: "bold"
                    }
                  }
                }
              },
              {
                value: xlData[5],
                symbol: spirit6, //对应的图标
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    offset: [10, 0],
                    textStyle: {
                      color: "#fb65bd",
                      fontSize: 18,
                      fontWeight: "bold"
                    }
                  }
                }
              }
            ],
            z: 10
          },
          {
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 0.2
              }
            },
            animationDuration: 0,
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbol: spirit7,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: xlData,
            z: 5
          }
        ]
      });

      // 年龄 绘制图表
      let nlChart = this.$echarts.init(document.getElementById("nlChart"));
      nlChart.clear();
      var nlName = ["<20", "20-29", "30-39", "40-49", "50-59", ">60"];
      var nlData = [
        cl_num(_this.nlxx.nl1),
        cl_num(_this.nlxx.nl2),
        cl_num(_this.nlxx.nl3),
        cl_num(_this.nlxx.nl4),
        cl_num(_this.nlxx.nl5),
        cl_num(_this.nlxx.nl6)
      ];
      function cl_num(num) {
        return num == 0 ? 0 : num;
      }
      nlChart.setOption({
        tooltip: {
          formatter: "{b}: {c}人"
        },
        xAxis: {
          name: "年龄(岁)",
          color: [
            "#38B5FD",
            "#E9AB25",
            "#2DC4A6",
            "#2DC4A6",
            "#95B5EF",
            "#999"
          ],
          data: nlName,
          axisTick: {
            show: false
          },
          type: "category"
        },
        grid: {
          right: "18%",
          left:"1%" //距离右侧边距
        },
        yAxis: {
          show: false,
          splitLine: { show: false }
        },
        series: [
          {
            type: "pictorialBar",
            name: "年龄",
            symbol: "triangle",
            symbolClip: true,
            hoverAnimation: true,
            // hoverAnimation: false,
            cursor:"pointer",
            data: [
              {
                value: nlData[0],
                itemStyle: {
                  normal: {
                    color: "#38B5FD"
                  }
                }
              },
              {
                value: nlData[1],
                itemStyle: {
                  normal: {
                    color: "#E9AB25"
                  }
                }
              },
              {
                value: nlData[2],
                itemStyle: {
                  normal: {
                    color: "#74D5D4"
                  }
                }
              },
              {
                value: nlData[3],
                itemStyle: {
                  normal: {
                    color: "#2DC4A6"
                  }
                }
              },
              {
                value: nlData[4],
                itemStyle: {
                  normal: {
                    color: "#95B5EF"
                  }
                }
              },
              {
                value: nlData[5],
                itemStyle: {
                  normal: {
                    color: "#999"
                  }
                }
              }
            ],
            label: {
              normal: {
                show: true,
                position: "top",
                formatter:function(num){
                  if (num.value>=0) {
                    return num.value
                  } else {
                    return '0'
                  }
                },
                textStyle: {
                  fontSize: 16,
                  color: "#e54035"
                }
              }
            }
          }
        ]
      });

      // 参加工作时间 绘制图表
      let cjggsjChart = this.$echarts.init(
        document.getElementById("cjggsjChart")
      );
      cjggsjChart.clear();
      var cjggsjData = [
        _this.glxx.gl1,
        _this.glxx.gl2,
        _this.glxx.gl3,
        _this.glxx.gl4,
        _this.glxx.gl5,
        _this.glxx.gl6,
        _this.glxx.gl7,
        _this.glxx.gl8,
        _this.glxx.gl9
      ];
      // var cjggsjData = [ 10,11,15,3,1,8,15,10,5];
      cjggsjChart.setOption({
        tooltip: {
          formatter: "{b}: {c}"
        },
        grid: {
          top: "10",
          left: "5%",
          right: "1%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "<1960年",
              "60-64年",
              "65-69年",
              "70-74年",
              "75-79年",
              "80-84年",
              "85-89年",
              ">1990年",
              "其他"
            ],

            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#666666",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#666666", // 颜色
                width: 1 // 粗细
              }
            }
          }
        ],
        yAxis: {
          minInterval: 1
        },
        series: [
          {
            name: "套数",
            type: "bar",
            barWidth: "30%",
            data: cjggsjData,
            borderColor: "#0095EB",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0095EB" }, //柱图渐变色
                  { offset: 1, color: "#59C0FB" } //柱图渐变色
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}",
                textStyle: {
                  fontSize: 16,
                  color: "#b742b5"
                }
              }
            }
          }
        ]
      });

      // 党龄 绘制图表
      let dlChart = this.$echarts.init(document.getElementById("dlChart"));
      dlChart.clear();
      var totalCost = [
        _this.dlxx.dyrs,
        _this.dlxx.dyrs,
        _this.dlxx.dyrs,
        _this.dlxx.dyrs,
        _this.dlxx.dyrs,
        _this.dlxx.dyrs,
        _this.dlxx.dyrs
      ]; //背景色比例
      // var totalCost = [10, 10, 10, 10, 10, 10, 10]; //背景色比例
      var dlData = [
        _this.dlxx.dl1,
        _this.dlxx.dl2,
        _this.dlxx.dl3,
        _this.dlxx.dl4,
        _this.dlxx.dl5,
        _this.dlxx.dl6,
        _this.dlxx.dyrs
      ]; //数值
      // var dlData = [2, 4, 6, 8, 10, 9, 8]; //数值
      var grade = [
        "5年以下",
        "5-9年",
        "10-19年",
        "20-29年",
        "30-39年",
        "40年及以上",
        "党员人数"
      ];
      var data = {
        grade: grade,
        totalCost: totalCost,
        dlData: dlData
      };
      dlChart.setOption({
        tooltip: {
          formatter: "{b} : {c} "
        },
        grid: {
          left: "3%",
          top: "0",
          right: "10%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: data.grade
          },
          {
            type: "category",

            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#FF9900"
              }
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: data.dlData
          }
        ],
        series: [
          {
            type: "bar",
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                show: true,
                color: "#F0F0F0",
                barBorderRadius: 0,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barWidth: "50%",
            data: data.totalCost
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#F5C96C" }, //柱图渐变色
                  { offset: 1, color: "#E9AB25" } //柱图渐变色
                ])
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            barWidth: "50%",
            data: data.dlData
          }
        ]
      });
    },
    dan(data, event) {
      var clientY = event.clientY - 135;
      this.$refs["caozuo"].style.right = "-80px";
      this.$refs["caozuo"].style.top = clientY + "px";
      this.sfdj = !this.sfdj;
      this.datas = data;
    },
    // 获取右侧图表方法
    getEchart() {
      this.LoadOn();
      $.get("/datj/datjcx", { params: { dwid: this.dwid } }).then(res => {
        var _this = this;
        this.LoadClose();
        if (res.returnData.executeResult == "1") {
          _this.zcxx = res.returnData.zcxx;
          _this.zyzgxx = res.returnData.zyzgxx;
          _this.dlxx = res.returnData.dlxx;
          _this.glxx = res.returnData.glxx;
          _this.zzmmxx = res.returnData.zzmmxx;
          _this.xlxx = res.returnData.xlxx;
          _this.nlxx = res.returnData.nlxx;
          _this.xbxx = res.returnData.xbxx;

          _this.zcTotle =
            _this.zcxx.zc1 +
            _this.zcxx.zc2 +
            _this.zcxx.zc3 +
            _this.zcxx.zc4 +
            _this.zcxx.zc5 +
            _this.zcxx.zc6;
          _this.zyzgTotle =
            _this.zyzgxx.zyzg1 +
              _this.zyzgxx.zyzg2 +
              _this.zyzgxx.zyzg3 +
              _this.zyzgxx.zyzg4 +
              _this.zyzgxx.zyzg5 +
              _this.zyzgxx.zyzg6 ==
            0
              ? "1"
              : _this.zyzgxx.zyzg1 +
                _this.zyzgxx.zyzg2 +
                _this.zyzgxx.zyzg3 +
                _this.zyzgxx.zyzg4 +
                _this.zyzgxx.zyzg5 +
                _this.zyzgxx.zyzg6;

          _this.drawLine();
        } else {
          _this.$message.warning(res.returnData.message);
        }
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
                      _this.treeData[i].children[k].children.push(treNode);
                    }
                  }
                }
              }
            }
            this.dwid = result[0].dwid;
            this.getEchart();
          }
        }
      });
    },
    appendMenu: function(data) {
      this.addTableFlag = true;
      if (data) {
        this.formAdd.sjdwid = data.id;
      } else {
        this.formAdd.sjdwid = "";
      }
    },
    setCurrentKey: function() {
      this.$refs.tree.setCurrentKey(2);
      this.back = true;
    },
    addFormBtn: function() {
      $.post("/dagl/dwjgAdd", this.formAdd).then(res => {
        var result = res.returnData;
        if (result.executeResult == "1") {
          this.getDataMenu();
          this.addTableFlag = false;
          this.formAdd = this.formInitAdd;
          this.$message.warning("添加成功！");
        } else {
          this.$message.warning(result.returnData.message);
        }
      });
    },
    removeMenu: function(data) {
      this.$alert("确定要删除“" + data.label + "”吗？", "删除提醒", {
        confirmButtonText: "确定",
        callback: action => {
          $.post("/dagl/dwjgDelete", { dwid: data.id }).then(res => {
            var result = res.returnData;
            if (result.executeResult == "1") {
              this.getDataMenu();
              this.$message.warning("删除成功！");
            } else {
              this.$message.warning(result.returnData.message);
            }
          });
        }
      });
    },
    // 编辑单位机构 弹出修改输入框
    editMenu: function(data) {
      var _this = this;
      $.get("/dagl/dwjgxxCx", { params: { dwid: data.id } }).then(res => {
        if (res.returnData.executeResult == "1") {
          _this.formAdd = res.returnData.jgxx;
        }
      });
      _this.addTableFlag = true;
      _this.formAdd.sjdwid = data.parentId;
    },
    // 获取左侧 单位树的点击时的id
    clickMenuNode: function(data) {
      this.dwid = data.id;
      this.getEchart();
    }
  }
};
</script>
<style scoped lang="scss">
.menu-tree {
  background: none;
  color: #fff;
}
.custom-tree-node {
  width: 100%;
}
.search {
  width: 180px;
  margin: 10px auto;
  padding: 10px;
  position: relative;
  .el-input {
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
    // color: #fff;
  }
}
.percent-three,
.percent-five {
  float: left;
  margin: 1.5% 0 0 1.5%;
  background: #fff;
  .title {
    padding: 15px;
    font-weight: 700;
    .specail-part {
      font-size: 18px;
      color: #0081e6;
      margin: 0 5px 5px 5px;
    }
    .iconfont {
      color: #0081e6;
      font-size: 25px;
      font-weight: 500;
      vertical-align: text-top;
      margin-right: 5px;
    }
    .float-r {
      float: right;
      font-weight: 500;
    }
  }
}
.percent-three {
  width: 31%;
  .da-totle-show {
    height: 43px;
  }
  .da-totle-show > div {
    position: relative;
    padding-left: 15px;
    width: 44%;
    display: inline-block;
    .da-totle-show-num {
      position: absolute;
      top: 10px;
      left: 80px;
      color: #38b5fd;
      span {
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
}
.percent-five {
  width: 47.5%;
}
.chart {
  width: 100%;
  height: 258px;
  .zc-chart {
    padding-top: 30px;
    li {
      width: 24%;
      display: inline-block;
      margin: 25px 0;
    }
    .number-show {
      font-weight: 700;
      font-size: 18px;
      color: #38b5fd;
      text-align: center;
    }
    .type-show {
      margin-top: 10px;
      text-align: center;
    }
  }
}
  .over_div_con{
   overflow: hidden;
   overflow-y: auto;
   width: 100%;
   cursor: pointer;
   height: 600px;
  }
.over_div_con::-webkit-scrollbar {
  width: 9px;
  height: 50px;
  background-color: #2A3D55;
}

/*定义滚动条轨道 内阴影+圆角 */

.over_div_con::-webkit-scrollbar-track {
  border-radius: 4px;
  height: 50px;
  background-color: #2A3D55;
}

/*定义滑块 内阴影+圆角*/

.over_div_con::-webkit-scrollbar-thumb {
  border-radius: 4px;
  height: 50px;
  background-color: #c1c1c1;
}
</style>