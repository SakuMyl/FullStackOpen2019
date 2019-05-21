import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  const res = request.then(response => response.data)
  return res
}

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`
  console.log(url)
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export { getAll, create, update, remove }