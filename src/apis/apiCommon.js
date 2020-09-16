import $axios from '@/apis/index.js'

export default {
	// 类型列表
	// @params: type 1-涉案人员-人员类型 2-性别 3-证件类型 4-文化程度 5-笔录类别 6-进入场所原因 7-案件性质 8-案件类别（案由）9-出区去向 10-非涉案人员工作人员-人员类型 11-非涉案人员民警-人员类型 12-非涉案人员其他-人员类型
	// @params: caseNatureId 案件性质id  type=8时必传
	getLrBaseDataitemdetailList(data = {
		type: 1
	}) {
		return $axios.post('/management/lrBaseDataitemdetail/list', data)
	},

	// 部门列表
	getLrBaseDepartmentList(data) {
		return new Promise((resolve, reject) => {
			resolve()
		})
		return $axios.post("/management/tbDepartment/list", data)
	},

	// 功能室列表
	getTbFunctionroomBaseList(data) {
		return $axios.post("/management/tbFunctionroomBase/list", data)
	},
	// 功能室列表入区
	getTbFunctionroomrqBaseList(data) {
		return $axios.post("/management/tbFunctionroomBase/listAll", data)
	},

	// 岗位列表
	getTbPostList(data) {
		return $axios.post('/management/tbPost/list', data)
	},

	uploadImg(formData) {
		return $axios
			.postData(
				"/api/fastdfs/upload/addImg",
				formData
			)
	},
	getWitnessType(data)
	{
	  return $axios.post("/management/tbParaconfig/list",data);
	}

}