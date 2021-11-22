/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Navbar from '../../../../components/Navbar';
import Modal from '../../../../components/Modal';
import api from '../../../../services/api';
import { logout } from '../../../../services/auth';

import ModalContext from '../../../../context/ModalContext';

const Details = (props) => {
    const history = useHistory();
    const [details, setDetails] = useState([]);
    const [links, setLinks] = useState([]);
    const [informationPaginate, setInformationPaginate] = useState({});
    const [currentPage, setCurrentPage] = useState('?page=1');

    const { open, setOpen } = useContext(ModalContext);
    const { setContent } = useContext(ModalContext);

    const colors = {
        passed: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const { match } = props;
    function getDetails(page) {
        const detailsArray = [];
        api.get(`site/details/${match.params.id}${page}`)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response.data.data;
                    setLinks(response.data.data.links);
                    setInformationPaginate({from:response.data.data.from, to:response.data.data.to, total:response.data.data.total});
                    if (data instanceof Array) {
                        response.data.data.data.map((element) => {
                            detailsArray.push({
                                description: element.description,
                                veredict: element.veredict,
                                url: element.url,
                                element: element.element,
                                elements_detailed: element.elements_detailed,
                            });
                        });
                    } else {
                        Object.keys(data).map((key) => {
                            detailsArray.push({
                                description: data[key].description,
                                veredict: data[key].veredict,
                                url: data[key].url,
                                element: data[key].element,
                                elements_detailed: data[key].elements_detailed,
                            });
                        });
                    }
                }
                setDetails(detailsArray);
            })
            .catch((err) => {
                console.log(err);
                logout(history)
            });
    }

    useEffect(() => {
        setDetails([]);
        getDetails(currentPage);
    }, [currentPage]);

    return (
        <>
            {open ? <Modal /> : null}
            <Navbar current="sites" endpoint="site/details"/>
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
                                                Descrição
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Elemento
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Elemento detalhado
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Veredito
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {details.map((detail) => (
                                            <tr key={detail.url}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {detail.url}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {detail.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {detail.element}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setContent(
                                                                    detail.elements_detailed,
                                                                );
                                                                setOpen(true);
                                                            }}
                                                            className="flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300"
                                                        >
                                                            Ver mais
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className={classNames(
                                                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                                            colors[detail.veredict],
                                                        )}
                                                    >
                                                        {detail.veredict}
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
                                                Mostrando <span className="font-medium">{informationPaginate.from ?? 0}</span> a{' '}
                                                <span className="font-medium">{informationPaginate.to ?? 0}</span> de{' '}
                                                <span className="font-medium">{informationPaginate.total ?? 0}</span> resultados
                                            </p>
                                        </div>
                                        <div>
                                            <nav
                                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                                aria-label="Pagination"
                                            >
                                                {links.map((element) => (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setCurrentPage(element.url);
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
};

export default Details;
