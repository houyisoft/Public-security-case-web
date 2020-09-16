import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbLocker/listQuery', data)
	},
	getViewList(data) {
		return $axios.post('/management/tbPosition/positionList', data)
	},
	getChannelList(data) {
		return $axios.post('/management/tbNvrdetail/nvrList', data)
	},
	getNvrList(data) {
		return $axios.post('/management/tbNvrBase/list', data)
	},
	getLockerCode(data) {
		return $axios.post('/management/tbLocker/getMaxLockerCode', data)
	},
	saveOrUpdate(data) {
		if (data.lockerId) {
			return $axios.post('/management/tbLocker/edit', data);
		}
		return $axios.post('/management/tbLocker/add', data);
	},
	getDetail(data) {
		return $axios.post('/management/tbLocker/detail', data);
	},
	delete(data) {
		if (data.lockerType === 1) {
			return $axios.post('/management/tbLocker/removeLocker', data);
		} else {
			return $axios.post('/management/tbGoodsshelves/removeGoodsshelves', data);
		}
	},
	getSettingsList(data) {
		if (data.lockerType === 1) {
			return $axios.post('/management/tbLocker/settingLockerQuery', data);
		} else {
			return $axios.post('/management/tbLocker/settingGoodsShelvesQuery', data);
		}
	},
	postData(data) {
		return $axios.formDataRequest('/management/tbLocker/saveLocker', data)
	}
}