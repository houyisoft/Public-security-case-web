import $axios from '@/apis/index.js'

export default {
    // 信息采集录入
    addInfo(data) {
        return $axios.post('/management/zfSuspectinfo/add',data)
    },
    // 信息采集编辑
    editInfo(data) {
        return $axios.post('/management/zfSuspectinfo/edit',data)
    },
    // 信息采集数据回显
    echoInfo(data) {
        return $axios.post('/management/zfSuspectinfo/getZfSuspectinfo',data)
    },
    // 获得嫌疑人对应的数据-信息采集用
    listSuspect() {
        return $axios.post('/management/lrBaseDataitemdetail/getLrBaseDataitemdetail')
    },
}