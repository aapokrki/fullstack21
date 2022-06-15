import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log(content)
  const object = {content, votes: 0}
  const response = await axios.post(baseUrl, object)
  console.log(response.data)
  return response.data
}

const update = async (content) => {
  const object = {...content, votes: content.votes + 1}
  const response = await axios.put(`${ baseUrl }/${content.id}`, object)
  return response.data

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, update }