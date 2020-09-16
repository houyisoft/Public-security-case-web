import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbBracelet/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbBracelet/add', data)
	},
	edit(data) {
		return $axios.post('/management/tbBracelet/edit', data)
	},
	delete(Id) {
		return $axios.post('/management/tbBracelet/remove', Id)
	}
}
