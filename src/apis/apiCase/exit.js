// 预约登记，待办流程，入区登记
import $axios from '@/apis/index.js'

export default {

	// 保存嫌疑犯
	postSuspectData(data) {
		return $axios.formDataRequest('/management/tbInoutpersonCasearea/saveSuspectOutInfo', data)
	},
	// 保存警察
	postPoliceData(data) {
		return $axios.formDataRequest('/management/tbUnsuspect/savePoliceOutInfo', data)
    },
	// 民警归还卡
	restitutionCard(data) {
		return $axios.formDataRequest('/management/tbUnsuspect/restitutionCard', data)
    },
    
	// 保存其他人
	postOtherData(data) {
		return $axios.formDataRequest('/management/tbUnsuspect/saveOtherOutInfo', data)
	},

	// 犯人列表
	getSuspectList(data) {
		return $axios.post('/management/tbInoutpersonCasearea/suspectOutOfAreaList', data)
	},

	// 警察列表
	getPoliceList(data) {
		return $axios.post('/management/tbUnsuspect/policeList', data)
	},

	// 其他人列表
	getOtherList(data) {
		return $axios.post('/management/tbUnsuspect/getOtherOutList', data)
	},

	getTypeList(data) {
		return $axios.post('/management/lrBaseDataitemdetail/list', data)
	},

	getDetailList(data) {
		return $axios.post('/management/tbInoutpersonCasearea/getSuspectOutElectronicList', data);
	},

	// 确认嫌疑犯
	confrimSuspect(data) {
		return $axios.formDataRequest('/management/tbInoutpersonCasearea/confirmSuspectOutInfo', data)
	},
	// 下载文件流
	exportSuspectOutElectronicInfo(data) {
		return $axios.post('/management/tbInoutpersonCasearea/exportSuspectOutElectronicInfo', data)
	},

	//通过刷卡获取嫌疑人信息
	queryDetailByBand(data) {
		return $axios.post('/management/tbInoutpersonCasearea/getPersionInfoByCode', data)
	}

}