import axios from 'axios'

const _buffer = new Map()

async function get (jsonFileName, flush = false) {
  if (flush || !_buffer.has(jsonFileName)) {
    const res = await axios.get(`/static/${jsonFileName}.json`)
    _buffer.set(jsonFileName, res.data.data)
  }
  return JSON.parse(JSON.stringify(_buffer.get(jsonFileName)))
}

async function getById (jsonFileName, id) {
  const dataList = await get(jsonFileName)
  return dataList.filter(t => { return t.id === id })[0]
}

async function update (jsonFileName, update) {
  update = Array.isArray(update) ? update : [update]
  let dataList = await get(jsonFileName)
  const updateMap = new Map()
  update.forEach(u => { updateMap.set(u.id, u) })
  dataList.forEach((data, i) => {
    if (updateMap.has(data.id)) {
      dataList[i] = {...data, ...updateMap.get(data.id)}
    }
  })
  _buffer.set(jsonFileName, dataList)
}

async function del (jsonFileName, id) {
  id = Array.isArray(id) ? id : [id]
  let dataList = await get(jsonFileName)
  for (let i = 0; i < dataList.length; i++) {
    if (id.indexOf(dataList[i].id) !== -1) {
      dataList.splice(i--, 1)
    }
  }
  _buffer.set(jsonFileName, dataList)
}

async function add (jsonFileName, item) {
  item = Array.isArray(item) ? item : [item]
  let dataList = await get(jsonFileName)
  let ids = dataList.map(it => { return it.id }).sort((a, b) => { return b - a })[0]
  item.forEach(i => { dataList.push({...i, ...{'id': ++ids}}) })
  _buffer.set(jsonFileName, dataList)
  return ids
}

export default {
  get,
  getById,
  update,
  delete: del,
  add
}
