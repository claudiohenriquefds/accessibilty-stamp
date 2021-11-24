/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
 BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import Login from './pages/Login';
import Info from './pages/Info';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';
import FollowUp from './pages/FollowUp';

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
                <Route path="/followup" exact component={FollowUp} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/info/:id" exact component={Info} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route path="*" component={() => <h1>Pagina não encontrada</h1>} />
            </Switch>
        </BrowserRouter>
    );

export default Routes;
