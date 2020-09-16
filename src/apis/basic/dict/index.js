import $axios from '@/apis/index.js'

export default {
    getTree(data) {
        return $axios.post('management/lrBaseDataitem/treeList', data)
    },
    getList(data) {
        return $axios.post('/management/lrBaseDataitem/list', data)
    },
    view(data) {
        return $axios.post('/management/tbPosition/list', data)
    },
    detail(data) {
        return $axios.post('/management/tbBelongings/distributionQuery', data)
    },
}