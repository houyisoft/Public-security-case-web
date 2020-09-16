import $axios from '@/apis/index.js'

export default {
    // 随身物品列表
    getBelongList(data) {
        return $axios.post('/management/tbBelongings/listQuery', data)
    },
    // 添加物品
    addGoods(data) {
        return $axios.post('/management/zfPersonalgoodsdetail/add', data)
    },
    // 查询储物柜
    listQuery(data) {
        return $axios.post('/management/tbLocker/listQuery', data)
    },
    // 查询箱体
    queryBox(data) {
        return $axios.post('/management/tbBox/list', data)
    },
    // 查询货位 management/tbPosition/list
    queryPosition(data) {
        return $axios.post('/management/tbPosition/list', data)
    },
    // 查询类别
    queryGoods(data) {
        return $axios.post('/management/lrBaseDataitemdetail/goodsList', data)
    },
    // 物品列表
    queryDetail(data) {
        return $axios.post('/management/zfPersonalgoodsdetail/list', data)
    },
    //根据手环查询犯人
    queryDetailByBand(data) {
        return $axios.post('/management/tbBelongings/detailQueryByWristbandNo', data);
    },
    // 分配储物柜
    distSave(data) {
        return $axios.post('/management/zfPersonalgoodsdetail/distributionSave', data)
    },
    // 删除物品
    delDist(data) {
        return $axios.post('management/zfPersonalgoodsdetail/remove', data)
    },
    // 人员类型
    getLrBaseDataitemdetail(data) {
        return $axios.post('/management/lrBaseDataitemdetail/getLrBaseDataitemdetail', data)
    },
    // 箱体编号
    boxList(data) {
        return $axios.post('/management/tbBox/list', data)
    },
    // 货位编号
    positionList(data) {
        return $axios.post('/management/tbPosition/list', data)
    },
    detail(data) {
        return $axios.post('/management/tbBelongings/distributionQuery', data)
    },
    addDists(data) {
        return $axios.post('/management/zfPersonalgoodsdetail/addGoodsDetailList', data)
    },
	getBoxList(data) {
		return $axios.post('/management/tbLocker/listQuery', data)
	},
	queryGoodsPosition(data) {
		return $axios.post('/management/tbBelongings/distributionQueryShelves', data)
	},
}