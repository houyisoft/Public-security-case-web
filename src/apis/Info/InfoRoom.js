import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbFunctionroomBase/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbFunctionroomBase/add', data)
	},
	delete(Id) {
		return $axios.post('/management/tbFunctionroomBase/remove', Id)
	},
	getRadio(data)
	{
		return $axios.post('/management/tbTerminal/list', data)
	},
	getCameraList(data) {
		return $axios.post('/management/tbNvrdetail/list', data)
	},
    //获取数据字典
    getTypeList(data) {
      return $axios.post('/management/lrBaseDataitemdetail/list', data)
    },
}
