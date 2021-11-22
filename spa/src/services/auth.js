/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

export const TOKEN_KEY = 'access_token';
export const isAuthenticated = () => {
    try{
        return jwt.decode(localStorage.getItem(TOKEN_KEY), {complete: true}).payload.exp < (new Date()).getTime();
    }catch({ message }){
        return false;
    }
}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = (history) => {
    localStorage.removeItem(TOKEN_KEY);
    history.push('/');
};
