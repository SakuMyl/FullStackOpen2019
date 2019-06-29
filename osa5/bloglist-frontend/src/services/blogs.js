
import axios from 'axios'

const baseUrl = `${BACKEND_URL}/blogs`

var token = null

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
const comment = async (id, content) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${baseUrl}/${id}/comments`, { content }, config)
    return response.data
}

const remove = async id => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}
const update = (id, attributes) => {
    const request = axios.patch(`${baseUrl}/${id}`, attributes)
    return request.then(response => response.data)
}

export default { get, getAll, create, update, comment, remove, setToken, login }