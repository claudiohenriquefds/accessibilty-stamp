import React, { useEffect, useState } from 'react';
import { useHistory , Link } from 'react-router-dom';
import { LockClosedIcon, ArrowRightIcon } from '@heroicons/react/solid';


import { isAuthenticated, TOKEN_KEY } from '../../services/auth';
import api from '../../services/api';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/dashboard');
        }
    });

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('user/login', { email, password });

            localStorage.setItem(TOKEN_KEY, response.data.authorization_token);

            history.push('/dashboard');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Logue-se com sua conta.</h2>
                </div>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Endereço de e-mail
                            </label>
                            <input
                                placeholder="Email"
                                id="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <input
                                placeholder="Senha"
                                id="password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Enviar
                        </button>
                    </div>
                    <div>
                        <Link className="flex justify-center align-middle text-indigo-500 group-hover:text-indigo-600" to="/register">
                            Não tenho cadastro
                            <ArrowRightIcon className="text-indigo-500 group-hover:text-indigo-600 h-5 w-5 pl-1"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
