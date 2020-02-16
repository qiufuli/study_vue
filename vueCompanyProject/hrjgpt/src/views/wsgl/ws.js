/**
 * ###### Tus Mat 4 17:13:00 CST 2018
 * @name ws
 * @description 文书查询和保存的接口  只文书部分用
 * @return 
 *
 */
import Vue from "vue";
import $ from "@/common/js/axios";
// 文书查询接口
function Search(ajblid) {
  return $.get("/wsgl/getWssj", {
    params: {
      id: ajblid
    }
  }).then(res => {
    var result = res.returnData;
    if (result.executeResult == "1") {
      return result.sj;
    }
  });
}
// 文书保存接口
function baocun(wsid, sjx, lasqbid) {
  return $.post("/wsgl/insertWs", {
    wsid: wsid,
    sjx: sjx,
    lasqbid: lasqbid
  }).then(res => {
    var result = res.returnData;
    return result;
  });
}
// 修改传给后台的时间格式   返回14位，时分秒没有就加6个0，去掉'-'和'：'
function reviseTime(data) {
  if (typeof (data) == "string") {
    var result1 = data.replace(/-|:/g, "");
    if (result1.length == 8) {
      result1 = result1 + "000000";
    }
    if (result1.length == 6) {
      result1 = result1 + "01000000";
    }
    return result1;
  }
}
export {
  Search,
  baocun,
  reviseTime
};