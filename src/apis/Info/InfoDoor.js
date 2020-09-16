import $axios from '@/apis/index.js'

export default {
	getCloseList(data) {
		return $axios.post('/management/tbDoorclose/list', data)
	}, 
	getHostList(data) {
		return $axios.post('/management/tbDoorhost/list', data)
	}, 
	getReadList(data) {
		return $axios.post('/management/tbDoorread/list', data)
	}, 
	getCloseInfo() {
		return $axios.post('/management/tbDoorclose/listInfo')
	}, 
	getRoomInfo() {
		return $axios.post('/management/tbFunctionroomBase/listInfo')
	}, getFunctionRoom(data)
	{
		return $axios.post('/management/tbFunctionroomBase/list',data)
	},
	edit(data){
		return $axios.post('/management/tbDoorclose/edit',data)
	},
	getSameInfo(){
		return $axios.post('/management/tbDoorclose/getDoorClose')
	}
}
