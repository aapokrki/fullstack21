import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return (await request).data
}

const deleteBlog = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return (await request).data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken, deleteBlog }