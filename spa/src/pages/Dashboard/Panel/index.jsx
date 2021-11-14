/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';

import Navbar from '../../../components/Navbar';
import PanelContext from '../../../context/PanelContext';

import logo from '../../../assets/Logo_indigo.svg';

const Panel = () => {
    const { dataPanel } = useContext(PanelContext);

    if (dataPanel != null) {
        const labelsMonth = [];
        const averageSiteMonth = [];
        const lastScoreMonth = [];
        const labelsYear = [];
        const averageSiteYear = [];

        dataPanel.data.history_month.map((element) => {
            const date = new Date(element.date);
            labelsMonth.push(date.getDate());
            averageSiteMonth.push(element.average);
            lastScoreMonth.push(element.last_score);
        });

        dataPanel.data.history_year.map((element) => {
            const date = new Date(element.date);
            labelsYear.push(date.getMonth()+1);
            averageSiteYear.push(element.average);
        });

        const datasetMonth = {
            labels: labelsMonth,
            datasets: [
                {
                    label: 'Média de nota (Todas as páginas encontradas)',
                    data: averageSiteMonth,
                    fill: false,
                    backgroundColor: 'rgba(17, 24, 39)',
                    borderColor: 'rgba(17, 24, 39)',
                },
                {
                    label: 'Ultima nota (Página principal)',
                    data: lastScoreMonth,
                    fill: false,
                    backgroundColor: 'rgba(99, 102, 241)',
                    borderColor: 'rgba(99, 102, 241)',
                },
            ],
        };

        const datasetYear = {
            labels: labelsYear,
            datasets: [
                {
                    label: 'Média de nota (Todas as páginas encontradas)',
                    data: averageSiteYear,
                    fill: false,
                    backgroundColor: 'rgba(17, 24, 39)',
                    borderColor: 'rgba(17, 24, 39)',
                },
            ],
        };

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        return (
            <>
                <Navbar current="panel" filter endpoint="data" />
                <div className="p-2 m-3">
                    <h5>1. Informações da avaliação</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow">
                        <span className="block text-sm text-gray-900">
                            Quantidade de avaliações:
                        </span>
                        <span className="block text-lg text-gray-900">{dataPanel.data.validations}</span>
                    </div>
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow">
                        <span className="block text-sm text-gray-900">
                            Média de nota (Todas as páginas encontradas):
                        </span>
                        <span className="block text-lg text-gray-900">
                            {dataPanel.data.average}
                        </span>
                    </div>
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow">
                        <span className="block text-sm text-gray-900">
                            Última nota (Página principal):
                        </span>
                        <span className="block text-lg text-gray-900">{dataPanel.data.last_score}</span>
                    </div>
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow">
                        <span className="block text-sm text-gray-900">
                            Quantidade de páginas internas:
                        </span>
                        <span className="block text-lg text-gray-900">
                            {dataPanel.data.subpages_quantity}
                        </span>
                    </div>
                </div>
                <div className="p-2 m-3">
                    <h5>2. Idicadores</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow bg-yellow-300">
                        <span className="block text-sm text-gray-900">
                            Warning (Elementos que requerem atenção)
                        </span>
                        <span className="block text-lg text-gray-900">{dataPanel.data.warning}</span>
                    </div>
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow bg-green-300">
                        <span className="block text-sm text-gray-900">
                            Passed (Elementos que passaram na avaliação)
                        </span>
                        <span className="block text-lg text-gray-900">
                            {dataPanel.data.passed}
                        </span>
                    </div>
                    <div className=" border border-gray-900 rounded-sm p-5 m-3 shadow bg-red-300">
                        <span className="block text-sm text-gray-900">
                            Failed (Elementos que falharam na avaliação)
                        </span>
                        <span className="block text-lg text-gray-900">
                            {dataPanel.data.failed}
                        </span>
                    </div>
                </div>
                <div className="p-2 m-3">
                    <h5>3. Gráfico das avaliações (Mensal e Anual) respectivamente.</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="border border-gray-900 rounded-sm p-5 m-3 shadow">
                        <Line data={datasetMonth} options={options} />
                    </div>
                    <div className="border border-gray-900 rounded-sm p-5 m-3 shadow">
                        <Line data={datasetYear} options={options} />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar current="panel" filter endpoint="data" />
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

export default Panel;
