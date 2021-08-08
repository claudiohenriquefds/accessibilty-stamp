/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
    ClipboardCheckIcon,
    GlobeAltIcon,
    DocumentSearchIcon,
    ClockIcon,
    MenuIcon,
    XIcon,
    MailIcon,
    LinkIcon
} from '@heroicons/react/outline';

import { isAuthenticated } from '../../services/auth';
import logo from '../../assets/Logo_indigo.svg';
import talkback from '../../assets/talkback.jpg';
import './style.css';

const navigation = [{ name: 'Selo', href: '#stamp' }];

const urlCheck = window.location.host === 'accessibilty-stamp.vercel.app' ? 1 : 0;

const features = [
    {
        name: 'Cadastro do site',
        description: 'Ao cadastrar um site, agendamos a avaliação dele para o pŕoximo minuto.',
        icon: GlobeAltIcon,
    },
    {
        name: 'Agendamento de avaliações',
        description:
            'As agendamentos ocorrem a cada minuto, garantindo o máximo de fidedignade a atualização do site cadastrado.',
        icon: ClockIcon,
    },
    {
        name: 'Avaliações',
        description:
            'As avaliações ocorrem por meio da plataforma ACCESS MONITOR PLUS pois está mais atual com o WCAG.',
        icon: DocumentSearchIcon,
    },
    {
        name: 'Resultados das avaliações',
        description:
            'O resultado de cada avaliação ocorrida é armazenado e no final é calculado com base nas notas um selo de acessibilidade coerente com o site substituindo sempre o selo antigo.',
        icon: ClipboardCheckIcon,
    },
];

const Home = () => (
    <>
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <Popover>
                        {({ open }) => (
                            <>
                                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                                    <nav
                                        className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                                        aria-label="Global"
                                    >
                                        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                            <div className="flex items-center justify-between w-full md:w-auto">
                                                <a href="/">
                                                    <span className="sr-only">
                                                        Logotipo do Acessibility Stamp, contendo o
                                                        icone de uma pessoa entre dois parenteses
                                                        angulares (Exemplificação de TAG HTML)
                                                    </span>
                                                    <img
                                                        className="mx-auto h-12 w-auto text-indigo-500"
                                                        src={logo}
                                                        alt="Logotipo do Acessibility Stamp, contendo o icone de uma pessoa entre dois parenteses angulares (Exemplificação de TAG HTML)"
                                                    />
                                                </a>
                                                <div className="-mr-2 flex items-center md:hidden">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">
                                                            Abrir menu principal
                                                        </span>
                                                        <MenuIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="font-medium text-gray-500 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            {isAuthenticated() ? (
                                                <a
                                                    href="/dashboard/panel"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Dashboard
                                                </a>
                                            ) : (
                                                <>
                                                    <a
                                                        href="/login"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Entrar
                                                    </a>
                                                    <a
                                                        href="/register"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Registrar
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </nav>
                                </div>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="duration-150 ease-out"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="duration-100 ease-in"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Popover.Panel
                                        focus
                                        static
                                        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                                    >
                                        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                            <div className="px-5 pt-4 flex items-center justify-between">
                                                <div>
                                                    <img
                                                        className="h-8 w-auto"
                                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="-mr-2">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">
                                                            Fechar menu principal
                                                        </span>
                                                        <XIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="px-2 pt-2 pb-3 space-y-1">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                            <a
                                                href="/"
                                                className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                                            >
                                                Log in
                                            </a>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Selo de acessibilidade</span>{' '}
                                <span className="block text-indigo-600 xl:inline">Automático</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                O selo é gerado por um processo automatizado de avaliações
                                consecutivas e periódicas ocorridas no site previamente cadastrado.
                                Através do resultado das avaliações um selo adequado é fornecido ao
                                site por meio de requisição.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src={talkback}
                    alt="Imagem de uma garota negra com oculos escuros, utilizando um fone branco plugado no celular."
                />
            </div>
        </div>
        <hr className="divider-solid m-5" />
        <div className="grid grid-cols-1 md:grid-cols-1" id="stamp">
            <div className="flex flex-col m-3">
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                                O selo de acessibilidade
                            </h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Fluxo
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto" />
                        </div>

                        <div className="mt-10">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                                <feature.icon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                                {feature.name}
                                            </p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <hr className="divider-solid m-5" />
                        <div>
                            <h2 className="text-center text-indigo-600 font-semibold tracking-wide uppercase">
                                Como adiciona-lo no site ?
                            </h2>
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                <div>
                                    <p className="mt-4 text-gray-500 lg:mx-auto text-justify">
                                        Para adicionar o selo ao site, basta acrescentar o script no
                                        final do documento e a TAG HTML contendo o identificador
                                        id="stampAcessibility" na posição que melhor se adequar. O
                                        script ira realizar consulta a aplicação, retornando o selo
                                        adequado com base nas avaliações e preencher a TAG. O
                                        procedimento só será realizado se o site estiver previamente
                                        cadastrado na plataforma.
                                    </p>
                                </div>
                                <div>
                                    <div className="m-5">
                                        <span className="text-base text-gray-600 font-medium tracking-wide uppercase">
                                            Exemplo da TAG HTML
                                        </span>
                                        <pre className="scrollbar-none overflow-x-auto p-6 text-sm leading-snug language-html text-white bg-black bg-opacity-75">
                                            <code className="language-html">
                                                <span className="token tag">
                                                    <span className="token tag">
                                                        <span className="token punctuation">
                                                            &lt;
                                                        </span>
                                                        i
                                                    </span>{' '}
                                                    <span className="token attr-name">id</span>
                                                    <span className="token attr-value">
                                                        <span className="token punctuation attr-equals">
                                                            =
                                                        </span>
                                                        <span className="token punctuation">"</span>
                                                        <span className="code-highlight bg-code-highlight">
                                                            stampAcessibility
                                                        </span>
                                                        <span className="token punctuation">"</span>
                                                    </span>
                                                    <span className="token punctuation">&gt;</span>
                                                </span>
                                                <span className="token tag">
                                                    <span className="token tag">
                                                        <span className="token punctuation">
                                                            &lt;/
                                                        </span>
                                                        i
                                                    </span>
                                                    <span className="token punctuation">&gt;</span>
                                                </span>
                                            </code>
                                        </pre>
                                    </div>
                                    <div className="m-5">
                                        <span className="text-base text-gray-600 font-medium tracking-wide uppercase">
                                            Exemplo da TAG script
                                        </span>
                                        <pre className="scrollbar-none overflow-x-auto p-6 text-sm leading-snug language-html text-white bg-black bg-opacity-75">
                                            <code className="language-html">
                                                <span className="token tag">
                                                    <span className="token tag">
                                                        <span className="token punctuation">
                                                            &lt;
                                                        </span>
                                                        script
                                                    </span>{' '}
                                                    <span className="token attr-name">src</span>
                                                    <span className="token attr-value">
                                                        <span className="token punctuation attr-equals">
                                                            =
                                                        </span>
                                                        <span className="token punctuation">"</span>
                                                        <span className="code-highlight bg-code-highlight">
                                                            http://34.69.36.49:8080/script.min.js
                                                        </span>
                                                        <span className="token punctuation">"</span>
                                                    </span>
                                                    <span className="token punctuation">&gt;</span>
                                                </span>
                                                <span className="token tag">
                                                    <span className="token tag">
                                                        <span className="token punctuation">
                                                            &lt;/
                                                        </span>
                                                        script
                                                    </span>
                                                    <span className="token punctuation">&gt;</span>
                                                </span>
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 className="text-center text-indigo-600 font-semibold tracking-wide uppercase m-2">
            Exemplo de como ficará no site.
        </h2>
        {urlCheck ?
            (
                <div className="flex justify-center m-10">
                    <div className="w-48">
                        <i id="stampAcessibility" />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center m-10">
                    <span className="hidden sm:block ml-3">
                        <a
                            href="https://accessibilty-stamp.vercel.app/"
                            target="_blank"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                            Acessar url de exemplo
                        </a>
                    </span>
                </div>
            )
        }
        <div className="bg-indigo-600">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <p className="ml-3 font-medium text-white">
                    Trabalho de Conclusão de Curso apresentado ao Instituto Federal de Educação,
                    Ciência e Tecnologia Baiano - Campus Guanambi, ligado ao Ministério da Educação
                    como parte dos requisitos para obtenção do título de Tecnólogo em Análise e
                    Desenvolvimento de Sistemas.
                </p>
                <hr className="divider-solid m-5" />
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center justify-center">
                        <MailIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        <p className="ml-3 font-medium text-white truncate">
                            <span className="hidden md:inline">
                                <a href="mailto:claudio.henrique.fdasilva@gmail.com">
                                    claudio.henrique.fdasilva@gmail.com
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {urlCheck ? ( <script src="http://34.69.36.49:8080/stamp/script.min.js" /> ) : null}

    </>
);

export default Home;
