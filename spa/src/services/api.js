import axios from 'axios';

import { getToken } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:8080',
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
