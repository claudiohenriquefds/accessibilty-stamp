import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import { PanelProvider } from './context/PanelContext';
import { HistoryProvider } from './context/HistoryContext';
import { ModalProvider } from './context/ModalContext';

ReactDOM.render(
    <PanelProvider>
        <HistoryProvider>
            <ModalProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </ModalProvider>
        </HistoryProvider>
    </PanelProvider>,
  document.getElementById('root')
);
