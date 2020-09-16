// 预约登记，待办流程，入区登记
import $axios, {
	getAxios
} from '@/apis/index.js'

export default {

	// 入区登记列表信息-非工作人员
	postData(data) {
		return $axios.formDataRequest('/management/tbUnsuspect/add', data)
	},

	// 入区登记人员详情信息
	getCaseInfoList(data) {
		return $axios.post('/management/tbInoutCasearea/caseInfoList', data)
	},

	getTypeList(data) {
		return $axios.post('/management/lrBaseDataitemdetail/list', data)
	},

}