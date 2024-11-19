import axios from 'axios';
import { useMemo } from 'react';

const useAxiosInstance = () =>
{
    const axiosInstance = useMemo( () =>
    {
        return axios.create( {
            baseURL: process.env.REACT_APP_API_BASE_URL, // Set this in your `.env` file
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        } );
    }, [] );

    return {axiosInstance};
};

export default useAxiosInstance;
