import axios from "axios";

const baseUrl = "http://localhost:3000/persons"

export const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(res => res.data)
}

export const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

export const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

export default { getAll, create, deletePerson }