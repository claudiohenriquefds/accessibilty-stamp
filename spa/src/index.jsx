import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import { PanelProvider } from './context/PanelContext';
import { HistoryProvider } from './context/HistoryContext';

ReactDOM.render(
    <PanelProvider>
        <HistoryProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </HistoryProvider>
    </PanelProvider>,
  document.getElementById('root')
);
