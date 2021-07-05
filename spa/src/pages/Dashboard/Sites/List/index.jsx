import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import api from '../../../../services/api';

import Navbar from '../../../../components/Navbar';

const Site = () => {
    const [sites, setSites] = useState([]);

    async function getSites() {
        const sitesArray = [];
        const response = await api.get('site/show');
        if (response.data.success) {
            const data = JSON.parse(response.data.data);
            // eslint-disable-next-line array-callback-return
            data.map((element) => {
                sitesArray.push({
                    name: element.name,
                    last_score: element.last_score,
                    grade_average: element.average.toFixed(1),
                    pages: element.pages,
                    url: element.url,
                    image: element.stamp,
                });
            });
        }

        setSites(sitesArray);
    }

    useEffect(() => {
        getSites();
    }, []);

    return (
        <>
            <Navbar current="sites" search="site" />
            <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="flex flex-col m-3">
                    <div className="w-full flex flex-row-reverse">
                        <Link
                            to="/dashboard/sites/new"
                            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-800 my-2"
                        >
                            Novo site
                        </Link>
                    </div>
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
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Ultima nota (Página principal)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Média de nota (Todas as páginas encontradas)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Páginas
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Selo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {sites.map((site) => (
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
                                                        {site.last_score}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {site.grade_average}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {site.pages}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="min-w-full max-w-none w-48"
                                                            src={site.image}
                                                            alt=""
                                                        />
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
};

export default Site;
