/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';

import api from '../../services/api';
import spinner from '../../assets/Spinner_indigo.svg';
import logo from '../../assets/Logo_indigo.svg';

export default function Info({ match }) {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        const response = await api.get(`stamp/info?id=${match.params.id}`);
        if (response.data.success) {
            setInfo(JSON.parse(response.data.data));
        }else{
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                {info !== null ? (
                    <div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Detalhes da análise do website
                                </h3>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Nome</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {info.name}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Url</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {info.url}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Quantidade de avaliações
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {info.validations}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Ultima nota
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {info.last_score}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Média de nota
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {info.average !== 'undefined' ? info.average.toFixed(1) : '-'}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Data e horário da última avaliação
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {info.last_validate}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Selo</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <img
                                                width="300"
                                                src={info.stamp}
                                                alt="Selo de acessibilidade"
                                            />
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {loading ? (
                            <div className="flex justify-center">
                                <img
                                    className="mx-auto animate-spin w-full h-20"
                                    src={spinner}
                                    alt="Icone de carregamento"
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="block">
                                    <img
                                        className="mx-auto h-12 w-auto text-indigo-500"
                                        src={logo}
                                        alt="Logotipo do Acessibility Stamp, contendo o icone de uma pessoa entre dois parenteses angulares (Exemplificação de TAG HTML)"
                                    />
                                    <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
                                        Site não encontrado.
                                    </h2>
                                    <a
                                        className="flex justify-center align-middle text-indigo-500 group-hover:text-indigo-600"
                                        target="_self"
                                        href={window.location.host}
                                    >
                                        <ArrowLeftIcon className="text-indigo-500 group-hover:text-indigo-600 h-5 w-5 pl-1" />
                                        Voltar para página inicial
                                    </a>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
