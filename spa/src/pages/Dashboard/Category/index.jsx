import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Category from './List';
import NewCategory from './New';
import EditCategory from './Edit';

function Sites(props) {
    const { match } = props;

    return (
        <Switch>
            <Route path={`${match.path}`} exact component={Category} />
            <Route path={`${match.path}/new`} component={NewCategory} />
            <Route path={`${match.path}/edit/:id`} component={EditCategory} />
        </Switch>
    );
}

export default Sites;
