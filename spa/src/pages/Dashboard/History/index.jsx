import React, { useContext } from 'react';

import Navbar from '../../../components/Navbar';
import HistoryContext from '../../../context/HistoryContext';

import logo from '../../../assets/Logo_indigo.svg';

const History = () => {
    const { dataHistory } = useContext(HistoryContext);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    if (dataHistory != null) {
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
                                            {JSON.parse(dataHistory.data).map((site) => (
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
                                                            {site.last_score !== null ? site.last_score : "-"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {site.average !== null ? site.average : "-"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", site.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
                                                            {site.status === 1 ? "Avaliação concluida" : "Falha na avaliação"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {site.date !== null ? site.date :  "-"}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
