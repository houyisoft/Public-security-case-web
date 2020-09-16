import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbNvrdetail/list', data)
	},
	save(data) {
		return $axios.post('/management/tbNvrdetail/add', data)
	},
	edit(data) {
		return $axios.post('/management/tbNvrdetail/edit', data)
	},
	delete(Id) {
		return $axios.post('/management/tbNvrdetail/remove', Id)
    },
	getNvr(data)
	{
		return $axios.post('/management/tbNvrBase/list',data)
	},
	getFunctionRoom(data)
	{
		return $axios.post('/management/tbFunctionroomBase/list',data)
	},
	getManufacturers(data)
	{
		return $axios.post('management/lrBaseDataitemdetail/list',data)
	}
}
