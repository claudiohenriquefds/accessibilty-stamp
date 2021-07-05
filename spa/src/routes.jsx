/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
 BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
                isAuthenticated() ?
                (<Component {...props} />) :
                (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
            )}
    />
);

const Routes = () => (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route path="*" component={() => <h1>Pagina não encontrada</h1>} />
            </Switch>
        </BrowserRouter>
    );

export default Routes;
