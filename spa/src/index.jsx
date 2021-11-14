import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import { PanelProvider } from './context/PanelContext';
import { HistoryProvider } from './context/HistoryContext';
import { ModalProvider } from './context/ModalContext';
import { PageCurrentProvider } from './context/PageCurrentContext';

ReactDOM.render(
    <PanelProvider>
        <HistoryProvider>
            <ModalProvider>
                <PageCurrentProvider>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </PageCurrentProvider>
            </ModalProvider>
        </HistoryProvider>
    </PanelProvider>,
    document.getElementById('root'),
);
