import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Site from './List';
import NewSite from './New';

function Sites(props) {
    const { match } = props;

    return (
        <Switch>
            <Route path={`${match.path}`} exact component={Site} />
            <Route path={`${match.path}/new`} component={NewSite} />
        </Switch>
    );
}

export default Sites;
