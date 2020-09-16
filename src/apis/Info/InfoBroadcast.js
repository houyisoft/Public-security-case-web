import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbTerminal/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbTerminal/add', data)
	},
	delete(Id) {
		return $axios.post('/management/tbTerminal/remove', Id)
    }
}
