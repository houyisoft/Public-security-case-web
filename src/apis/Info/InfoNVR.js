import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbNvrBase/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbNvrBase/add', data)
	}, 
	edit(data) { 
		return $axios.post('/management/tbNvrBase/edit', data)
	},
	delete(Id) {
		return $axios.post('/management/tbNvrBase/remove', Id)
    },
    use(Id){
        return $axios.post('/management/tbNvrBase/updateUseState', Id)
    },
    unUse(Id){
        return $axios.post('/management/tbNvrBase/updateNoUseState', Id)
	},
	getNvrType(type)
	{
		return $axios.post('/management/lrBaseDataitemdetail/list',type)
	}
}
