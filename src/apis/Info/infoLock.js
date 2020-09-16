import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbLocker/listQuery', data)
	},
	view(data) {
		return $axios.post('/management/tbPosition/positionList', data)
	},
	detail(data) {
		return $axios.post('/management/tbBelongings/distributionQuery', data)
	},
	getLockerInfoList(data) {
		return $axios.post('management/zfPersonalgoodsdetail/listQuery', data);
	},
    getSettingsList(data) {
        if (data.lockerType === 1) {
            return $axios.post('/management/tbLocker/settingLockerQuery', data);
        } else {
            return $axios.post('/management/tbLocker/settingGoodsShelvesQuery', data);
        }
    }
}