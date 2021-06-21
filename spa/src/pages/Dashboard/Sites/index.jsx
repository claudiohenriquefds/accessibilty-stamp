import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Navbar from '../../../components/Navbar';

import stampLogo from '../../../assets/Logo.svg';

const sites = [
    {
        name: 'Acesso para todos',
        last_score: '5.7',
        grade_average: '5.9',
        pages: '10',
        url: 'https://www.acessoparatodos.com.br',
        image: stampLogo,
    },
    // More people...
];

const Sites = () => (
    <>
        <Navbar current="sites" search="site" />
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
                                            Name
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
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={site.image}
                                                        alt=""
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                        <div className="flex-1 flex justify-between sm:hidden">
                                            <a
                                                href="/"
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </a>
                                            <a
                                                href="/"
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </a>
                                        </div>
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">1</span>{' '}
                                                    to <span className="font-medium">10</span> of{' '}
                                                    <span className="font-medium">97</span> results
                                                </p>
                                            </div>
                                            <div>
                                                <nav
                                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                                    aria-label="Pagination"
                                                >
                                                    <a
                                                        href="/"
                                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                    >
                                                        <span className="sr-only">Previous</span>
                                                        <ChevronLeftIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                                    <a
                                                        href="/"
                                                        aria-current="page"
                                                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        1
                                                    </a>
                                                    <a
                                                        href="/"
                                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        2
                                                    </a>
                                                    <a
                                                        href="/"
                                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        3
                                                    </a>
                                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                        ...
                                                    </span>
                                                    <a
                                                        href="/"
                                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        8
                                                    </a>
                                                    <a
                                                        href="/"
                                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        9
                                                    </a>
                                                    <a
                                                        href="/"
                                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        10
                                                    </a>
                                                    <a
                                                        href="/"
                                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <ChevronRightIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Sites;
