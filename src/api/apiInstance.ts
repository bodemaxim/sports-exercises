import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    //  authorization: `<Your Auth Token>`,
    contentType: 'application/json',
    timeout: 1000
  }
  // .. other options
})

export default axiosInstance
