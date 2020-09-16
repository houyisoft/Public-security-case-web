import $axios from '@/apis/index.js'

export default {
	login(data) {
		return $axios.post('/login', data)
	},
	// getAuthor(data) {
	// 	return $axios.post('/management/lrBaseAuthorize/list', data)
	// },
	getRouters(data) {
		return $axios.post('authorizeMenu', data)
	},
	getTitle() {
		return $axios.post('/management/tbParaconfig/list', {configName:'SoftwareName'})
	},
	//跳转笔录
	JumpBL(data) {
		return $axios.post('/management/tbInoutpersonCasearea/JumpLogin', data)
	},
	//更改LED屏
	operatorLED(data) {
		return $axios.post('/ignore/operatorLed', data)
	},
	//修改密码
	resetPwd(data) {
		return $axios.post('/resetPwd', data)
	},
}