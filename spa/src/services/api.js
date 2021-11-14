import axios from 'axios';

import { getToken } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    // baseURL: 'https://77ba-168-90-219-232.ngrok.io',
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
