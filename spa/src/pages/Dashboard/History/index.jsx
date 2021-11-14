/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Navbar from '../../../components/Navbar';
import HistoryContext from '../../../context/HistoryContext';
import PageCurrentContext from '../../../context/PageCurrentContext';

import logo from '../../../assets/Logo_indigo.svg';

const History = () => {
    const { dataHistory } = useContext(HistoryContext);

    const { setPageCurrent } = useContext(PageCurrentContext);

    const status = {
        1: { text: 'Em andamento', class: 'bg-yellow-100 text-yellow-800' },
        2: { text: 'Avaliação concluida', class: 'bg-green-100 text-green-800' },
        3: { text: 'Falha na avaliação', class: 'bg-red-100 text-red-800' },
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    if (dataHistory != null) {
        const {data} = dataHistory.data;
        let mountedData = [{}];
        if(data instanceof Array){
            mountedData = data;
        }else{
            mountedData = [];
            Object.keys(data).map((key) => {
                mountedData.push({
                    url: data[key].utl,
                    name: data[key].name,
                    score: data[key].score,
                    average: data[key].average,
                    status: data[key].status,
                    created_at: data[key].created_at
                });
            });
        }
        return (
            <>
                <Navbar current="history" filter="true" endpoint="history" />
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <div className="flex flex-col m-3">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Site
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Ultima nota
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Média de nota
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Data de avaliação
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {mountedData.map((site) => (
                                                <tr key={site.url}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {site.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {site.url}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {typeof site.score !== 'undefined'
                                                                ? site.score
                                                                : '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {typeof site.average !== 'undefined'
                                                                ? site.average
                                                                : '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={classNames(
                                                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                                                status[site.status].class,
                                                            )}
                                                        >
                                                            {status[site.status].text}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {typeof site.created_at !== 'undefined'
                                                                ? new Date(
                                                                      site.created_at,
                                                                  ).toLocaleString()
                                                                : '-'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Mostrando <span className="font-medium">{dataHistory.data.from ?? 0}</span> a{' '}
                                                    <span className="font-medium">{dataHistory.data.to ?? 0}</span> de{' '}
                                                    <span className="font-medium">{dataHistory.data.total ?? 0}</span> resultados
                                                </p>
                                            </div>
                                            <div>
                                                <nav
                                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                                    aria-label="Pagination"
                                                >
                                                    {dataHistory.data.links.map((element) => (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setPageCurrent(element.url);
                                                            }}
                                                            className={element.active ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                                                        >
                                                            {element.label === "Next &raquo;" ? (
                                                                <>
                                                                    <span className="sr-only">Próximo</span>
                                                                    <ChevronRightIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </>
                                                            ) : element.label === "&laquo; Previous" ? (
                                                                <>
                                                                    <span className="sr-only">Anterior</span>
                                                                    <ChevronLeftIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </>
                                                            ) : element.label}
                                                        </button>
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <Navbar current="history" filter endpoint="history" />
            <div className="bg-indigo-600">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center justify-center">
                            <p className="ml-3 font-medium text-white">
                                Selecione um site para continuar
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-10 opacity-40">
                <img
                    className="mx-auto h-96 w-auto text-indigo-500"
                    src={logo}
                    alt="Logotipo do Acessibility Stamp, contendo o icone de uma pessoa entre dois parenteses angulares (Exemplificação de TAG HTML)"
                />
            </div>
        </>
    );
};

export default History;
