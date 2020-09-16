import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/tbArear/list', data)
	}, 
	save(data) { 
		return $axios.post('/management/tbArear/add', data)
	},
	delete(Id) {
		return $axios.post('/management/tbArear/remove', Id)
    },
    getRadioList(data)
    {
        return $axios.post('/management/tbTerminal/list', data)
    },
    getCheckedRadioList(data)
    {
        return $axios.post('/management/tbAreaandradio/list', data)
    },
    SaveRadioList(data)
    {
        return $axios.post('/management/tbAreaandradio/add', data)
    }
}
