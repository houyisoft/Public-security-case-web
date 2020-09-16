/**
 * 
 * @param {array} list 要转换成树形结构的数据
 * @param {object} options 结构参数配置，其中nodeCallback是遍历完成后都当前遍历节点处理的回调函数
 */
export function handleTree(list, options = {}) {
    const {
        rootId = '0',
            idField = 'id',
            parentIdField = 'parentId',
            childrenField = 'children',
            callback
    } = options
    //对源数据深度克隆
    const cloneList = JSON.parse(JSON.stringify(list))
    //循环所有项
    const tree = cloneList.filter(father => {
        let branchArray = cloneList.filter(child => {
            //返回每一项的子级数组
            return father[idField] === child[parentIdField]
        });
        if (branchArray.length > 0) {
            father[childrenField] = branchArray;
        } else {
            delete father[childrenField];
        }
        if (callback) {
            callback(father, !!branchArray.length);
        }
        //返回第一层
        return father[parentIdField] === rootId;
    });
    return tree != '' ? tree : list;
}

// 首字母大小
export function titleCase(str) {
    if (str)
        return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
    return str;
}

// 下划转驼峰
export function camelCase(str) {
    if (str)
        return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
    return str;
}

// 格式化时间
export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "M+": (date.getMonth() + 1).toString(), // 月
        "D+": date.getDate().toString(), // 日
        "h+": date.getHours().toString(), // 时
        "m+": date.getMinutes().toString(), // 分
        "s+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}