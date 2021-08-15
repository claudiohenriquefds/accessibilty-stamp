import jwt from 'jsonwebtoken';

require('dotenv').config();

export const TOKEN_KEY = 'access_token';
export const isAuthenticated = () => jwt.decode(localStorage.getItem(TOKEN_KEY), {complete: true}).payload.exp < (new Date()).getTime();
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = (history) => {
    localStorage.removeItem(TOKEN_KEY);
    history.push('/');
};
