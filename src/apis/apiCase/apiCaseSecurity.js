import $axios from '@/apis/index.js'

export default {
	// 人身检查-列表信息
	getTbInoutpersonCaseareaSelectCriminalSuspect(data) {
		return $axios.post('/tbInoutpersonCasearea/selectCriminalSuspect', data)
	},
}
