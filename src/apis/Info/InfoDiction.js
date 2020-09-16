// 数据字典接口
import $axios from '@/apis/index.js'
export default {
  /**
   *  获取数据字典列表
   * @param {int} typeId 数据字典分类id
   * @param {int} pageIndex 分页-当前页码
   * @param {int} pageSize 分页-每页记录数
   * @param {string} keyword 查询关键字
   */
  getList(typeId, pageIndex, pageSize, keyword) {

    keyword = keyword || ''
    var userInfo = this.getUserInfo()
    if (userInfo) {
      var data = {
        centerID: userInfo.fcompanyid,
        fItemid: typeId,
        pageNum: pageIndex,
        pageSize,
        name: keyword
      }
      return $axios.post('/management/lrBaseDataitemdetail/listQuery', data)
    } else {
      throw '用户信息异常'
    }
  },

  save(data) {
    const obj = {

      fItemdetailid: data.fitemdetailid,
      fItemid: data.fitemid,
      fItemname: data.fitemname,
      fItemvalue: data.fitemvalue,
      fSimplespelling: data.fsimplespelling,
      fSortcode: data.fsortcode,
      fEnabledmark: data.fenabledmark,
      fDescription: data.fdescription
    }

    if (data && !data.fitemdetailid) {
      debugger
      obj.fDeletemark = 0
      obj.CenterID = this.getUserInfo().fcompanyid
      return $axios.post('/management/lrBaseDataitemdetail/add', obj)
    } else {
      obj.fDeletemark = 0
      return $axios.post('/management/lrBaseDataitemdetail/edit', obj)
    }
  },

  delete(id) {
    const data = {
      fItemdetailid: id,
      fDeletemark: 1
    }
    return $axios.post('/management/lrBaseDataitemdetail/edit', data)
  },

  getUserInfo() {
    var userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    }
    return userInfo
  }
}