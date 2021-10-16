import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Navbar from '../../../../components/Navbar';
import api from '../../../../services/api';
import { logout } from '../../../../services/auth';
import spinner from '../../../../assets/Spinner.svg';

const NewSite = () => {
    const [name, setName] = useState(null);
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ error: false });

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            if (name !== null || url !== null) {
                api.post('site/store', { name, url }).then((response) => {
                    if (response.data.success) {
                        history.push('/dashboard/sites');
                    } else {
                        setError({ error: true, message: 'Falha ao registrar site' });
                        setLoading(false);
                    }
                }).catch((err) => {
                    console.log(err);
                    logout(history)
                });
            } else {
                setError({ error: true, message: 'Campos obrigatórios não foram informados.' });
                setLoading(false);
            }
        } catch (err) {
            setError({ error: true, message: 'Servidor indisponível' });
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar current="sites" />
            <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="flex flex-col m-3">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                <p className="mt-2 m-5 text-sm text-gray-600">* Representa campos obrigatórios.</p>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Nome do site *
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Ex: Stamp Acessibility"
                                                className="mt-1 ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 outline-none"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Url do site *
                                            </label>
                                            <input
                                                id="url"
                                                type="text"
                                                placeholder="Ex: http://acessibility-stamp.vercel.app"
                                                className="mt-1 ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 outline-none"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {error.error ? (
                                    <div className="text-center">
                                        <span className="text-red-500">{error.message}</span>
                                    </div>
                                ) : null}
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2"
                                    >
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
                                    <Link
                                        to="/dashboard/sites"
                                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-800 m-2"
                                    >
                                        Cancelar
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewSite;
