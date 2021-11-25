/* eslint-disable react/no-danger */
/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import spinner from '../../assets/Spinner_indigo.svg';
import logo from '../../assets/Logo_indigo.svg';
import { logout } from '../../services/auth';

import api from '../../services/api';

const navigation = [
    { name: 'Início', href: '/', current: false },
    { name: 'Entrar', href: '/login', current: false },
    { name: 'Registrar', href: 'register', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const FollowUp = () => {
    const [sites, setSites] = useState(null);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    function getData(id){
        setSites(null);
        setLoading(true);
        setCategory(id);
        api.get(`followup/${id}`)
            .then((response) => {
                if (response.data.success) {
                    setSites(response.data.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                logout(history);
            });
    }

    useEffect(async () => {
        api.get('category/list')
            .then((response) => {
                if (response.data.success) {
                    setCategories(response.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
                logout(history);
            });
       getData(1);
    }, []);

    const seriesAverage = [];
    const series = [];
    const datesAverage = [];
    let state;
    let stateAverage;
    if (sites !== null && sites.comparative !== null && sites.average !== null) {
        sites.comparative.map((site) => {
            const data = [];
            site.data.map((scores) => {
                data.push({x:scores.date, y:scores.average});
            });

            series.push({
                name: site.name,
                data,
            });
        });

        const dataAverage = [];
        sites.average.map((site) => {

            dataAverage.push(site.average);

            datesAverage.push(site.created_at);

        });

        seriesAverage.push({
            name: 'Média',
            data: dataAverage,
        });

        state = {
            series,
            options: {
                chart: {
                    type: 'area',
                },
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                },
            },
        };

        stateAverage = {
            series: seriesAverage,
            options: {
                chart: {
                    type: 'area',
                },
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'datetime',
                    categories: datesAverage,
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                },
            },
        };
    }

    return (
        <>
            {sites !== null && sites.comparative !== null && sites.average !== null ? (
                <div className="min-h-full">
                    <Disclosure as="nav" className="bg-gray-800">
                        {({ open }) => (
                            <>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center justify-between h-16">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-8 w-8"
                                                    src={logo}
                                                    alt="Logo do accessibility-stamp"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium',
                                                            )}
                                                            aria-current={
                                                                item.current ? 'page' : undefined
                                                            }
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open main menu</span>
                                                {open ? (
                                                    <XIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <MenuIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium',
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    <header className="bg-white shadow">
                        <div className="flex max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-1xl font-normal text-gray-900">
                                Acompanhamento da avaliação dos ultimos 30 dias
                            </h1>
                            <select
                                id="type"
                                name="type"
                                autoComplete="type-name"
                                value={category}
                                onChange={(e) => getData(e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                            >
                                {
                                    categories.map((categorySite) => (
                                        <option value={categorySite.id}>{categorySite.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </header>
                    <main>
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="">
                                    <h1 className="text-2xl font-light text-gray-900">
                                        Media de acessibilidade
                                    </h1>
                                    <Chart
                                        options={stateAverage.options}
                                        series={stateAverage.series}
                                        type="area"
                                        width="100%"
                                        height="400"
                                    />
                                </div>
                                <div className="">
                                    <h1 className="text-2xl font-light text-gray-900">
                                        Acessibilidade por site
                                    </h1>
                                    <Chart
                                        options={state.options}
                                        series={state.series}
                                        type="area"
                                        width="100%"
                                        height="400"
                                    />
                                </div>
                                <div>
                                    <div className="flex flex-col">
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
                                                                    Última nota
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
                                                                    Quantidade de sub-páginas
                                                                    avaliadas
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
                                                            {sites.comparative.map((site) => (
                                                                <tr key={site.name}>
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
                                                                        <div className="text-sm text-gray-500">
                                                                            {site.average}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-500">
                                                                            {site.pages}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-500">
                                                                            <div
                                                                                className="flex-shrink-0"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: site.stamp,
                                                                                }}
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
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl w-full space-y-8">
                        {loading ? (
                            <div className="flex justify-center h-full">
                                <img
                                    className="mx-auto animate-spin w-full h-20"
                                    src={spinner}
                                    alt="Icone de carregamento"
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center h-full">
                                <div className="block">
                                    <img
                                        className="mx-auto h-12 w-auto text-indigo-500"
                                        src={logo}
                                        alt="Logotipo do Acessibility Stamp, contendo o icone de uma pessoa entre dois parenteses angulares (Exemplificação de TAG HTML)"
                                    />
                                    <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
                                        Dados para essa categoria não foram encontrados.
                                    </h2>
                                    <a
                                        className="flex justify-center align-middle text-indigo-500 group-hover:text-indigo-600"
                                        target="_self"
                                        href="/"
                                    >
                                        <ArrowLeftIcon className="text-indigo-500 group-hover:text-indigo-600 h-5 w-5 pl-1" />
                                        Voltar para página inicial
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
export default FollowUp;
