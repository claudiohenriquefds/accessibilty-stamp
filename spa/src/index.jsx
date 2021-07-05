import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import { PanelProvider } from './context/PanelContext';

ReactDOM.render(
    <PanelProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </PanelProvider>,
  document.getElementById('root')
);
