import axios from "axios";

const baseUrl = '/api/users'

const get = user => {
    const request = axios.get(`${baseUrl}/${user.id}`)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { get, getAll }