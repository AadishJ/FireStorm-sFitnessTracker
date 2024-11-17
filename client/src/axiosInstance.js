import axios from 'axios';

const axiosInstance = axios.create( {
    baseURL: 'https://fitnesstracker-zk27.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
} );

export default axiosInstance;
