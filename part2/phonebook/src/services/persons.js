import axios from 'axios'
const baseUrl = 'https://ubiquitous-orbit-pjwgvq66q62rwvx.app.github.dev:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const put = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.status)
}

export default { getAll, create, deletePerson, put }