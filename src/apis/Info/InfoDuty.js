import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbDuty/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbDuty/add', data)
	},
	edit(data) {
		return $axios.post('/management/tbDuty/edit', data)
	},
	delete(Id) {
		return $axios.post('/management/tbDuty/remove', Id)
    }
}
