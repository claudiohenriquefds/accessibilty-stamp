import axios from 'axios';

import { getToken } from './auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT_API,
});

api.interceptors.request.use(async (config) => {
    const token = getToken();

    if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
