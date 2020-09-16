import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbParaconfig/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbParaconfig/add', data)
	},
	edit(data) {
		return $axios.post('/management/tbParaconfig/edit', data)
	},
	delete(data)
	{
		return $axios.post('/management/tbParaconfig/remove', data)
	}
}
