/* eslint-disable no-shadow */
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Disclosure, Menu, Transition, Listbox } from '@headlessui/react';
import { MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline';
import { CheckIcon, SelectorIcon, UserCircleIcon } from '@heroicons/react/solid';

import { logout } from '../../services/auth';
import api from '../../services/api';

import stampLogo from '../../assets/Logo.svg';
import PanelContext from '../../context/PanelContext';

const Navbar = ({ current, filter, search, endpoint }) => {
    const { setData } = useContext(PanelContext);
    const history = useHistory();

    const [sites, setSites] = useState([{ id: 0, name: 'Selecione uma opção.' }]);
    const [selected, setSelected] = useState(sites[0]);

    const navigation = [
        { name: 'Painel', href: `/dashboard/panel`, current: current === 'panel' },
        { name: 'Histórico', href: `/dashboard/history`, current: current === 'history' },
        { name: 'Sites', href: '/dashboard/sites', current: current === 'sites' },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    let mountedSites = [{ id: 0, name: 'Selecione uma opção.', unavailable: true }];

    async function mountSites() {
        mountedSites = [{ id: 0, name: 'Selecione uma opção.', unavailable: true }];
        setSites([{ id: 0, name: 'Selecione uma opção.', unavailable: true }]);

        const response = await api.get('site/show');
        const sitesResponse = JSON.parse(response.data.data);
        // eslint-disable-next-line array-callback-return
        sitesResponse.map((e) => {
            mountedSites.push({ id: e.id, name: e.name });
        });

        setSites(mountedSites);
    }

    async function handleSelect(e) {
        setSelected(e);
        console.log(endpoint);
        const response = await api.post(endpoint, { id: e.id });
        if (response.data.success) {
            setData(response.data);
        }
    }

    useEffect(() => {
        if (filter) {
            mountSites();
        }
    }, []);

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Abrir menu principal</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to="/">
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className="block lg:hidden h-8 w-auto"
                                            src={stampLogo}
                                            alt="Logo do sistema"
                                        />
                                        <img
                                            className="hidden lg:block h-8 w-auto"
                                            src={stampLogo}
                                            alt="Logo do sistema"
                                        />
                                    </div>
                                </Link>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium',
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {filter ? (
                                    <div className="w-72">
                                        <Listbox value={selected} onChange={handleSelect}>
                                            <div className="relative">
                                                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                    <span className="block truncate">
                                                        {selected.name}
                                                    </span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        <SelectorIcon
                                                            className="w-5 h-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {sites.map((sites) => (
                                                            <Listbox.Option
                                                                key={sites.id}
                                                                value={sites}
                                                                disabled={sites.unavailable}
                                                                className={({ active }) =>
                                                                    `${
                                                                        active
                                                                            ? 'text-amber-900 bg-amber-100'
                                                                            : 'text-gray-900'
                                                                    }
                                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                                }
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <span
                                                                            className={`${
                                                                                selected
                                                                                    ? 'font-medium'
                                                                                    : 'font-normal'
                                                                            } block truncate`}
                                                                        >
                                                                            {sites.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={`${
                                                                                    active
                                                                                        ? 'text-amber-600'
                                                                                        : 'text-amber-600'
                                                                                } absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                            >
                                                                                <CheckIcon
                                                                                    className="w-5 h-5"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                ) : null}
                                {search ? (
                                    <div className="flex">
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            autoComplete="given-name"
                                            placeholder={`Pesquisar ${search}`}
                                            className="p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                        <button
                                            type="submit"
                                            className="flex justify-center align-middle text-white bg-indigo-500 group-hover:bg-indigo-600 rounded-md ml-1"
                                        >
                                            <SearchIcon className="text-white group-hover:text-indigo-600 h-5 w-10 pl-1 self-center" />
                                        </button>
                                    </div>
                                ) : null}
                                <Menu as="div" className="ml-3 relative">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">
                                                        Abrir menu do usuário
                                                    </span>
                                                    <UserCircleIcon
                                                        className="h-8 w-8 rounded-full text-white"
                                                        alt="Imagem que representa usuário"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/"
                                                                onClick={() => logout(history)}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700',
                                                                )}
                                                            >
                                                                Sair
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {filter ? (
                                <div className="w-full px-3 py-2">
                                    <Listbox value={selected} onChange={setSelected}>
                                        <div className="relative">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">
                                                    {selected.name}
                                                </span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <SelectorIcon
                                                        className="w-5 h-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {sites.map((sites) => (
                                                        <Listbox.Option
                                                            key={sites.id}
                                                            value={sites}
                                                            disabled={sites.unavailable}
                                                            className={({ active }) =>
                                                                `${
                                                                    active
                                                                        ? 'text-amber-900 bg-amber-100'
                                                                        : 'text-gray-900'
                                                                }
                                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                            }
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <span
                                                                        className={`${
                                                                            selected
                                                                                ? 'font-medium'
                                                                                : 'font-normal'
                                                                        } block truncate`}
                                                                    >
                                                                        {sites.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span
                                                                            className={`${
                                                                                active
                                                                                    ? 'text-amber-600'
                                                                                    : 'text-amber-600'
                                                                            } absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                        >
                                                                            <CheckIcon
                                                                                className="w-5 h-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </div>
                            ) : null}
                            {search ? (
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        autoComplete="given-name"
                                        placeholder={`Pesquisar ${search}`}
                                        className="p-2 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <button
                                        type="submit"
                                        className="flex px-3 py-2 justify-center align-middle text-white bg-indigo-500 group-hover:bg-indigo-600 rounded-md ml-1"
                                    >
                                        <SearchIcon className="text-white group-hover:text-indigo-600 h-5 w-10 pl-1 self-center" />
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
