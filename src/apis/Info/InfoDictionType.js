import $axios from '@/apis/index.js'
export default {
  getList(data) {
    return $axios.post('/management/lrBaseDataitem/list', data)
  },
  getSingle(id) {
    var data = {
      fItemid: id
    }
    return $axios.post('/management/lrBaseDataitem/list', data)
  },
  save(data) {
    if (!data.fItemid) {
      return $axios.post('/management/lrBaseDataitem/add', data)
    } else {
      return $axios.post('/management/lrBaseDataitem/edit', data)
    }

  },
  delete(id) {
    var data = {
      fItemid: id,
      fDeletemark: 1
    }
    return $axios.post('/management/lrBaseDataitem/edit', data)
  },
  getDictionaries() {
    return $axios.post('/management/lrBaseDataitem/getDictionaries', {})
  },
}