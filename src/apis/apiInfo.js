import $axios from '@/apis/index.js'

export default {
	login(data) {
		return $axios.post('/login', data)
	},
}
