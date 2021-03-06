import $axios from "@/apis/index.js";

export default {
  //获取案件信息接口
  getTbInoutCaseareaCaseInfoList(data) {
    return $axios.post("/management/klFileinfo/caseInfoList", data);
  },
  //获取全部嫌疑人接口
  getTbInoutCaseareaGetZfqySuspects(data) {
    return $axios.post("/management/tbInoutCasearea/getZfqySuspects", data);
  },
  //获取音视频信息接口
  getVideoByType(data) {
    return $axios.post("/management/klFileinfo/selectBurnFileList", data);
  },
  //刻录保存接口
  saveBurnInfo(data) {
    return $axios.postJson("/management/klBurnlog/burnSave", data);
  },
  //重复刻录接口
  saveBurnAgain(data) {
    return $axios.post("/management/klBurnlog/burnAgain", data);
  },
  //获取案件相关人员信息
  getPeopleInvolved(data) {
    return $axios.post("/management/tbInoutCasearea/getPeopleInvolved", data);
  },
  //获取案件相关人员信息
  getPeopleHistoricalVideo(data) {
    return $axios.post(
      "/management/klGjfileinfo/getPeopleHistoricalVideo",data);
  },
  //获取案件相关人员信息
  getPersonList(data) {
    return $axios.post("/management/klFileinfo/getZfqySuspects", data);
  },
  //获取刻录视频存放地址
  getKLPath(data) {
    return $axios.post("management/tbParaconfig/list", data);
  },
  //获取刻录文件分盘设定大小
  getKLSize(data) {
    return $axios.post("management/tbParaconfig/list", data);
  },
  //获取刻录机厂家
  getKLCompany(data) {
    return $axios.post("management/tbParaconfig/list", data);
  },
  //获取科达平台的登录信息
  getPlatForm(data) {
    return $axios.post("management/tbParaconfig/list", data);
  },
  //获取案件相关人员信息
  getGjHistoryVideoByTrailId(data) {
    return $axios.post(
      "/management/klGjfileinfo/getHistoryTrack",data);
  },
   //获取历史轨迹坐标
   getTrackHistoryByTrailId(data) {
    return $axios.post(
      "/management/klGjfileinfo/getTrackHistory",data);
  },
  //获取坐垫返回数据
  getZDInfo(data){
    return $axios.get("/ignore/getVitalSign?RoomId="+data);
  }
};
