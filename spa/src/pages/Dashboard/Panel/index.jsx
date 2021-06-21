/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';

import Navbar from '../../../components/Navbar';

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
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

export default function Panel() {
    return (
        <>
            <Navbar current="panel" filter />
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className=" border border-gray-300 rounded-sm p-5 m-3 shadow">
                    <span className="block text-sm text-indigo-500">Quantidade de avaliações:</span>
                    <span className="block text-lg text-indigo-800">50</span>
                </div>
                <div className=" border border-gray-300 rounded-sm p-5 m-3 shadow">
                    <span className="block text-sm text-indigo-500">Média de acessibilidade:</span>
                    <span className="block text-lg text-indigo-700">7.5</span>
                </div>
                <div className=" border border-gray-300 rounded-sm p-5 m-3 shadow">
                    <span className="block text-sm text-indigo-500">
                        Última nota da pagina principal:
                    </span>
                    <span className="block text-lg text-indigo-700">6.8</span>
                </div>
                <div className=" border border-gray-300 rounded-sm p-5 m-3 shadow">
                    <span className="block text-sm text-indigo-500">
                        Quantidade de páginas internas:
                    </span>
                    <span className="block text-lg text-indigo-700">10</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border border-gray-300 rounded-sm p-5 m-3 shadow">
                    <Line data={data} options={options}/>
                </div>
                <div className="border border-gray-300 rounded-sm p-5 m-3 shadow">
                    <Line data={data} options={options}/>
                </div>
            </div>
        </>
    );
}
