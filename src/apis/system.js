import $axios from '@/apis/index.js'

export default {
	getSystemlist(data) {
		return $axios.post('/management/lrBaseModule/list', data)
	},
	getSublist(data) {
		return $axios.post('/management/lrBaseModule/sublist', data)
	},
	addSystem(data) {
		if (data.fModuleid) {
			return $axios.post('/management/lrBaseModule/edit', data)
		} else {
			return $axios.post('/management/lrBaseModule/add', data)
		}
	},
	getDetail(id) {
		return $axios.post(`/management/lrBaseModule/${id}`)
	},
	remove(data) {
		return $axios.post('/management/lrBaseModule/remove',data)
	}
}