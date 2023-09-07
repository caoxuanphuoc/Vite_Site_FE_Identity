import axios from 'axios'
const axiosClient = axios.create(
    {
        baseURL: 'https://localhost:44363'
    }
)
export default axiosClient