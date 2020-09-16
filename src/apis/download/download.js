import $axios from '@/apis/index.js'

export default {
    //获取下载列表接口
    getDownloadList(data) {
        return $axios.post('/management/klGjfileinfo/downlist', data)
    },
    //下载完成保存接口
    getDownloadFinishList(data) {
        return $axios.post('/management/klGjfileinfo/downFinishlist', data)
    },
    //出区保存轨迹信息
    save(data) {
        return $axios.post('/management/klGjfileinfo/add', data)
    },
}