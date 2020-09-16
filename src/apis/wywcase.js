import $axios from "@/apis/index.js";

export default {
  //  字典表
  diclist(data) {
    return $axios.post(
      "/management/lrBaseDataitemdetail/getLrBaseDataitemdetail",
      data
    );
  },
  //图片上传
  addimg(data) {
    return $axios.postData("/api/fastdfs/upload/addImg", data);
  },
  //上传图片
  upLoadImageBase64(data){
    return $axios.post('/api/fastdfs/upload/uploadImageBase64', data)
  },
  //  信息采集列表
  getInfolist(data) {
    return $axios.post("/management/zfSuspectinfo/list", data);
  },
  //  人身检查列表
  getRsjclist(data) {
    return $axios.post(
      "/management/tbInoutpersonCasearea/selectCriminalSuspect",
      data
    );
  },
  //人身检查详情
  rsjcMain(data) {
    return $axios.post("/management/zfPersonssecurity/list", data);
  },
  //  新增人身检查
  addRsjc(data) {
    return $axios.postData("/management/zfPersonssecurity/add", data);
  },
  //  修改人身检查
  editRsjc(data) {
    return $axios.postData("/management/zfPersonssecurity/edit", data);
  },
  //  新增换衣拍照
  addHypz(data) {
    return $axios.post("/management/zfChangeclothes/add", data);
  },
  //  新增换衣拍照
  editHypz(data) {
    return $axios.post("/management/zfChangeclothes/edit", data);
  },
  //换衣拍照详情
  hypzMain(data) {
    return $axios.post("/management/zfChangeclothes/list", data);
  },
  // 物品返回列表
  getBelongList(data) {
    return $axios.post("/management/tbBelongings/listQuery", data);
  },
  // 物品返回详情
  getBelongMain(data) {
    return $axios.post("/management/zfPersonalgoodsdetail/list", data);
  },
  // 物品返回取出
  takeout(data) {
    return $axios.post("management/tbBelongings/takeOut", data);
  },
  //获取人身检查摄像头信息
  getSecurityNvrDetail(data) {
    return $axios.post("management/tbParaconfig/getNvrDetail", data);
  },
  //获取拍照存储地址
  getSecuritySnapShotPath(data) {
    return $axios.post("management/tbParaconfig/list",data);
  },
  //获取摄像头类型（1科达，2usb)
  getCameraType(data)
  {
    return $axios.post("/management/tbParaconfig/list",data);
  }
};
