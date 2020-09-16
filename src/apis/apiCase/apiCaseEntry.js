// 预约登记，待办流程，入区登记
import $axios from '@/apis/index.js'

export default {
	// 非涉案人员列表（综合）
	getTbUnsuspectList(data) {
		return $axios.post('/management/tbUnsuspect/list', data)
	},
	// 非涉案人员列表 - 工作人员列表（含辅警）
	getLrBaseUserList(data) {
		return $axios.post('/management/lrBaseUser/list', data)
	},

	// 入区登记列表信息-非工作人员
	getTbInoutCaseareaList(data) {
		return $axios.post('/management/tbInoutCasearea/list', data)
	},
	getTbUnsuspectPoliceList(data) {
		return $axios.post('/management/tbUnsuspect/policeList', data)
	},


	// 入区登记人员详情信息
	getTbInoutpersonCaseareaInfo(data) {
		return $axios.post('/management/tbInoutpersonCasearea/info', data)
	},

	// 预约人员信息列表
	// @params: pageNum
	// @params: pageSize
	getZfAppointmentpersonsList(data) {
		return $axios.post('/management/zfAppointmentpersons/list', data)
	},

	// 获取第三方案件信息接口
	// orgId 办案单位编号 
	// shouliriq_start 受理时间开始时间 required
	// shouliriq_end 受理时间结束时间 required
	// jinghao 警号
	// gonganid 公安机构编号
	getTbInoutCaseareaCaseInfoList(data) {
		return $axios.post('/management/tbInoutCasearea/caseInfoList', data)
	},

	// 获取第三方接警处信息
	// "orgId": "",
	// "shouliriq_start": "",
	// "shouliriq_end": "",
	// "jinghao": "",
	// "gonganid": ""
	getTbInoutCaseareaGetJcjxxs(data) {
		return $axios.post('/management/tbInoutCasearea/getJcjxxs', data)
	},

	// 获取第三方民警信息
	// "jinghao": ""
	getTbInoutCaseareaGetPersonalsAndRoles(data) {
		return $axios.post('/management/tbInoutCasearea/getPersonalsAndRoles', data)
	},

	// 保存入区登记信息
	getTbInoutCaseareaAdd(data) {
		return $axios.postJson('/management/tbInoutCasearea/add', data)
	},

	// 非涉案人员详情信息
	getTbUnsuspectInfo(data) {
		return $axios.post('/management/tbUnsuspect/info', data)
	},

	// 获取页面右侧数据
	getInAreaFormRightData(data) {
		return $axios.post('/management/tbInoutpersonCasearea/InAreaFormRightData', data)
	},
	//人员详细页面数据列表
	personnelListByType(data) {
		return $axios.post('/management/tbInoutpersonCasearea/personnelListByType', data)
	},
	// 获取右侧功能室列表信息
	selectTbFunctionroomBaseList(data) {
		return $axios.post('/management/tbFunctionroomBase/list', data)
	},

	// 待办流程列表
	getTbInoutpersonCaseareaList(data) {
		// @params: pageNum 
		// @params: pageSize 
		// @params: name 涉案人员
		// @params: centerInfoId 案件编号
		// @params: startDate 入区开始时间
		// @params: endDate 入区结束时间
		return $axios.post('/management/tbInoutpersonCasearea/list', data)
	},

	// 获取第三方接口获取嫌疑人列表
	// type 案件编码
	// casecode // 人员类型编号 1：嫌疑人 3：受害人 4：证人
	getTbInoutCaseareaGetZfqySuspects(data) {
		return $axios.post('/management/tbInoutCasearea/getZfqySuspects', data)
	},

	/* 非涉案人员入区 */
	geTtbUnsuspectAdd(data) {
		// {
		// 	"Authorization": "",
		// 	"fId": "",
		// 	"policeNO": "",
		// 	"policeName": "",
		// 	"departmentID": "",
		// 	"station": "",
		// 	"centerID": "",
		// 	"cardID": "",
		// 	"cardNo": "",
		// 	"cardType": "",
		// 	"facePic": "",
		// 	"fGender": "",
		// 	"fMobile": "",
		// 	"iDType": "",
		// 	"iDNO": "",
		// 	"fAccount": "",
		// 	"fDescription": "",
		// 	"fAllowEndTime": "2020-01-01 00:00:00",
		// 	"postCardNo": "",
		// 	"peopleType": "",
		// 	"type": 1, 1-工作人员 2-民警 3-其他
		// 	"inBecause": "",
		// 	"caseId": "",
		// 	"caseNature": "",
		// 	"casesName": "",
		// 	"suspectListStr": [{
		// 			"name": "嫌疑人1",
		// 			"phone": "13304541234",
		// 			"cardType": "111",
		// 			"cardNumber": "53453453"
		// 		},
		// 		{
		// 			"name": "嫌疑人2",
		// 			"phone": "13304541234",
		// 			"cardType": "111",
		// 			"cardNumber": "53453453"
		// 		}
		// 	]
		// }
		return $axios.post('/management/tbUnsuspect/add', data)
	},

	// 预约登记列表
	getTbInoutCaseareaGetAppointmentList(data) {
		return $axios.post('/management/tbInoutCasearea/getAppointmentList', data)
	},

	postTbInoutCaseareaAddAppointmentSave(data) {
		return $axios.postJson('/management/tbInoutCasearea/addAppointmentSave', data)
	},
	//人证比对
	faceCheck(data) {
		return $axios.post('/management/udms/faceCheck', data)
	},
	//人证核验 结果回调方法
	getFaceCheckResult(data) {
		return $axios.post('/management/udms/getFaceCheckResult', data)
	},
	isCheckSex(data) {
		return $axios.postData('/management/tbInoutCasearea/choiceFunctionRoom', data)
	},
	//获取案件相关人员信息
	getPeopleInvolved(data) {
		return $axios.post('/management/tbInoutCasearea/getPeopleInvolved', data)
    },
	//判断手环或卡是否可以使用
	isUseBracelet(data) {
		return $axios.post('/management/tbBracelet/isUse', data)
    }
}
