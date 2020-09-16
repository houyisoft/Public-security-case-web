import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbCircequipment/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbCircequipment/add', data)
	},
	edit(data) {
		return $axios.post('/management/tbCircequipment/edit', data)
	},
	delete(Id) {
		return $axios.post('/management/tbCircequipment/remove', Id)
    },
    use(Id){
        return $axios.post('/management/tbCard/updateUseState', Id)
    },
    unUse(Id){
        return $axios.post('/management/tbCard/updateNoUseState', Id)
	},
	getDeviceType(type)
	{
		return $axios.post('/management/lrBaseDataitemdetail/list',type)
	}
}
