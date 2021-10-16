/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../../../../components/Navbar';
import Modal from '../../../../components/Modal';
import api from '../../../../services/api';
import { logout } from '../../../../services/auth';

import ModalContext from '../../../../context/ModalContext';

const Details = (props) => {
    const history = useHistory();
    const [details, setDetails] = useState([]);

    const { open, setOpen } = useContext(ModalContext);
    const { setContent } = useContext(ModalContext);

    const colors = {
        passed: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const { match } = props;
    async function getDetails() {
        const detailsArray = [];
        api.post('site/get-detailed', { id: match.params.id }).then((response) => {
            if (response.data.success) {
                response.data.data.map((element) => {
                    detailsArray.push({
                        description: element.description,
                        veredict: element.veredict,
                        url: element.url,
                        element: element.element,
                        elements_detailed: element.elements_detailed,
                    });
                });
            }

            setDetails(detailsArray);
        }).catch((err) => {
            console.log(err);
            logout(history)
        });

    }

    useEffect(() => {
        getDetails();
    }, []);
    return (
        <>
            {open ? <Modal /> : null}
            <Navbar current="sites" />
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
                                                                setContent(detail.elements_detailed);
                                                                setOpen(true);
                                                            }}
                                                            className="flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300"
                                                        >
                                                            Ver mais
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", colors[detail.veredict])}>
                                                        {detail.veredict}
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

export default Details;
