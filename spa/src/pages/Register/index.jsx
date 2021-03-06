import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LockClosedIcon, ArrowLeftIcon, HomeIcon } from '@heroicons/react/solid';

import { TOKEN_KEY, logout } from '../../services/auth';
import api from '../../services/api';
import logo from '../../assets/Logo_indigo.svg';
import spinner from '../../assets/Spinner.svg';

export default function Register() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({error: false});

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);

         try {
            if(name !== null || email !== null || password !== null){
                api.post('register', { name, email, password }).then((response) => {
                    if(response.data.success){
                        localStorage.setItem(TOKEN_KEY, response.data.data.token);
                        history.push('/dashboard/panel');
                    }else{
                        setError({error: true, message: "Servidor indisponível"});
                        setLoading(false);
                    }
                }).catch((err) => {
                    console.log(err);
                    logout(history)
                });
            }else{
                setError({error: true, message: "Campos obrigatórios não foram informados."});
                setLoading(false);
            }
        } catch (err) {
            setError({error: true, message: "Servidor indisponível"});
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto text-indigo-500"
                        src={logo}
                        alt="Logotipo do Acessibility Stamp, contendo o icone de uma pessoa entre dois parenteses angulares (Exemplificação de TAG HTML)"
                    />
                    <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
                        Cadastre-se
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">* Representa campos obrigatórios.</p>
                </div>
                <form onSubmit={handleRegister} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Nome *
                            </label>
                            <input
                                placeholder="Nome *"
                                id="name"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Endereço de e-mail *
                            </label>
                            <input
                                placeholder="Email *"
                                id="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Senha *
                            </label>
                            <input
                                placeholder="Senha *"
                                id="password"
                                type="password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error.error ? (
                        <div className="text-center">
                            <span className="text-red-500">{error.message}</span>
                        </div>
                    ) : null}
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
                            {loading ? (
                                <>
                                    Aguardando servidor
                                    <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                                        <img
                                            className="mx-auto h-5 animate-spin  w-auto"
                                            src={spinner}
                                            alt="Icone de carregamento"
                                        />
                                    </span>
                                </>
                            ) : (
                                <>Enviar</>
                            )}
                        </button>
                    </div>
                    <div>
                        <Link className="flex justify-center text-indigo-500 group-hover:text-indigo-600" to="/login">
                            <ArrowLeftIcon className="text-indigo-500 align-middle group-hover:text-indigo-600 h-5 w-5 pr-1"/>
                            Já tenho cadastro
                        </Link>
                        <Link
                            className="flex justify-center align-middle text-indigo-500 group-hover:text-indigo-600"
                            to="/"
                        >
                            Voltar para página inicial
                            <HomeIcon className="text-indigo-500 group-hover:text-indigo-600 h-5 w-5 pl-1" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
