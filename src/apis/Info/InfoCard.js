import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbCard/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbCard/add', data)
	},
	edit(data) {
		return $axios.post('/management/tbCard/edit', data)
	},
	delete(Id) {
		return $axios.post('/management/tbCard/remove', Id)
    },
    use(Id){
        return $axios.post('/management/tbCard/updateUseState', Id)
    },
    unUse(Id){
        return $axios.post('/management/tbCard/updateNoUseState', Id)
	},
	getPersonType()
	{
		return $axios.post('/management/lrBaseDataitem/getPersonType')
	}
}
