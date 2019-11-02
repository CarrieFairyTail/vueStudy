import axios from 'axios'

/**
 * 数据文件以JSON的形式存放在 /public文件夹下，可分目录，若分目录存放，则jsonFileName为"目录路径/文件名"，如
 * public
 *   | -- folder1
 *          | -- folder2
 *                  | -- file1.json
 *          | -- file2.json
 *  jsonFileName = 'folder1/folder2/file1'
 *  jsonFileName = 'folder1/file2'
 *
 *  JSON文件中为键值对的形式存放（key: value），value值为数组，数组中存放对象数据，默认呼获取key=data的数据
 *  对象数据中必须有字段"id"，且该字段为数值型，不能重复
 */
const _buffer = new Map()

/**
 * 获取json数据
 * @param jsonFileName json文件名（不含后缀）
 * @param attr 属性名
 * @param flush 强制重新获取，默认false
 * @returns {Promise<*>} 数据数组
 */
async function get(jsonFileName, attr = 'data', flush = false) {
    if (flush || !_buffer.has(jsonFileName)) {
        const res = await axios.get(`${process.env.BASE_URL}${jsonFileName}.json`);
        _buffer.set(jsonFileName, res.data[attr]);
    }
    return {
        result: true,
        data: JSON.parse(JSON.stringify(_buffer.get(jsonFileName)))
    };
}

/**
 * 根据ID获取单条数据
 * @param jsonFileName json文件名（不含后缀）
 * @param id 数据ID
 * @param attr 属性名
 * @returns {Promise<*>} 单条数据
 */
async function getById(jsonFileName, id, attr = 'data') {
    const dataList = (await get(jsonFileName, attr)).data;
    return {
        result: true,
        data: JSON.parse(JSON.stringify(dataList.filter(t => {
            return t.id === id
        })[0])),
    };
}

/**
 * 更新json数据
 * @param jsonFileName json文件名（不含后缀）
 * @param update 更新的数据，传数组可批量
 * @param attr 属性名
 * @returns {Promise<*>}
 */
async function update(jsonFileName, update, attr = 'data') {
    update = Array.isArray(update) ? update : [update];
    let dataList = (await get(jsonFileName, attr)).data;
    const updateMap = new Map();
    update.forEach(u => {
        updateMap.set(u.id, u)
    });
    dataList.forEach((data, i) => {
        if (updateMap.has(data.id)) {
            dataList[i] = {...data, ...updateMap.get(data.id)};
        }
    });
    _buffer.set(jsonFileName, dataList);
    return {
        result: true
    };
}

/**
 * 删除json数据
 * @param jsonFileName json文件名（不含后缀）
 * @param id 删除的ID，传数组可批量
 * @param attr 属性名
 * @returns {Promise<*>}
 */
async function del(jsonFileName, id, attr = 'data') {
    id = Array.isArray(id) ? id : [id];
    let dataList = (await get(jsonFileName, attr)).data;
    for (let i = 0; i < dataList.length; i++) {
        if (id.indexOf(dataList[i].id) !== -1) {
            dataList.splice(i--, 1);
        }
    }
    _buffer.set(jsonFileName, dataList);
    return {
        result: true
    };
}

/**
 * 添加json数据
 * @param jsonFileName json文件名（不含后缀）
 * @param item 添加的数据，传数组可批量
 * @param attr 属性名
 * @returns {Promise<*>} 新数据ID，若批量则返回最后一条数据ID
 */
async function add(jsonFileName, item, attr = 'data') {
    item = Array.isArray(item) ? item : [item];
    let dataList = (await get(jsonFileName, attr)).data;
    let ids = dataList.map(it => {
        return it.id
    }).sort((a, b) => {
        return b - a
    })[0];
    item.forEach(i => {
        dataList.push({...i, ...{'id': ++ids}})
    });
    _buffer.set(jsonFileName, dataList);
    return {
        result: true,
        data: ids
    };
}

export default {
    get,
    getById,
    update,
    delete: del,
    add
}
