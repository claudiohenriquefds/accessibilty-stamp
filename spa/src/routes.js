import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import NewSite from './pages/NewSite';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)}
    />
);

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/site/add" exact component={NewSite} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route path="*" component={() => <h1>Pagina não encontrada</h1>} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
