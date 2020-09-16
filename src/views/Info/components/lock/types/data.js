function createLocker(len) {
    const result = [];
    while (len-- > 0) {
        result.push({
            code: ''
        })
    }
    return result;
}

function createGoods(len) {
    const result = [];
    while (len-- > 0) {
        result.push({
            siteNO: ''
        })
    }
    return result;
}
const lockers = {
    '柯达1': obj => {
        return Object.assign({
            isMain: true,
            boxCount: 12,
            children: createLocker(12)
        }, obj);
    },
    '柯达2': obj => {
        return Object.assign({
            isMain: false,
            boxCount: 12,
            children: createLocker(12)
        }, obj);
    },
    '东城电子1': obj => {
        return Object.assign({
            isMain: true,
            boxCount: 18,
            children: createLocker(18)
        }, obj);
    },
    '东城电子2': obj => {
        return Object.assign({
            isMain: true,
            boxCount: 25,
            children: createLocker(25)
        }, obj);
    },
    '宝树科技1': obj => {
        return Object.assign({
            isMain: true,
            boxCount: 12,
            children: createLocker(12)
        }, obj);
    },
    '东城电子3': obj => {
        return Object.assign({
            isMain: false,
            boxCount: 20,
            children: createLocker(20)
        }, obj);
    },
    '宝树科技2': obj => {
        return Object.assign({
            isMain: false,
            boxCount: 16,
            children: createLocker(16)
        }, obj);
    },
    '货架': obj => {
        obj.children = createGoods(30);
        return obj
    }
};
export default function addLocker(lockerPp, type, obj = {}) {
    const data = lockers[lockerPp + type](obj);
    data._isNew = true;
    data._uuid = Date.now();
    return data;
}