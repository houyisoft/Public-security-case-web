import $axios from '@/apis/index.js'
import axios from 'axios'

export default {
	// 随身物品列表
	udmsLogin(data) {
		return $axios.post('/udms/login', {
			userName: 'admin1',
			password: 'admin123'
		})
	},
}
