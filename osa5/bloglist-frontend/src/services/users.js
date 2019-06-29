import axios from "axios";

const baseUrl = `${BACKEND_URL}/users`

const get = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { get, getAll }