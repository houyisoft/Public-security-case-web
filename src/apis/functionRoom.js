import $axios from '@/apis/index.js'

export default {
	getRoomlist(data) {
		return $axios.post('/management/tbFunctionroomBase/getRoomListCount', data)
    },
    getPeopleByRoomId(data) {
      return $axios.post('/management/tbInoutpersonCasearea/getPersonByFunctionRoomId', data)
      },
    //刷手环获取信息 
    getPersonmain(data) {
		return $axios.post('/management/tbInoutpersonCasearea/infoByWristbandId', data)
    },
    //获取功能室
    limitedRoomList(data) {
		return $axios.post('/management/tbFunctionroomBase/limitedRoomList', data)
    },
    //进出功能室
    accessRoom(data) {
		return $axios.post('/management/tbFunctionroomBase/setFunctionRoom', data)
    },
    outRoom(data)
    {
      return $axios.post('/management/tbFunctionroomBase/inOrOutFunctionRoom', data)
    },
    getPolice(data)
    {
      return $axios.post('/management/lrBaseUser/findUserByCardCode', data)
    }
}
