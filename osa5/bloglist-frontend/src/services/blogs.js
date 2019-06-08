
import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const get = blog => {
    const request = axios.get(`${baseUrl}/${blog.id}`)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, attributes) => {
    const request = axios.patch(`${baseUrl}/${id}`, attributes)
    return request.then(response => response.data)
}

export default { get, getAll, create, update, setToken, login }